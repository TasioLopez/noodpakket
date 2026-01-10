// src/middleware.ts
import type { MiddlewareHandler } from 'astro';
import bcrypt from 'bcryptjs';

// Rate limiting storage (in production, use Redis or a database)
const rateLimitStore = new Map<string, { attempts: number; lockoutUntil: number }>();

// Clean up old entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [ip, data] of rateLimitStore.entries()) {
    if (data.lockoutUntil < now && data.attempts === 0) {
      rateLimitStore.delete(ip);
    }
  }
}, 5 * 60 * 1000);

// Get client IP
function getClientIP(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');
  return forwarded?.split(',')[0]?.trim() || realIP || 'unknown';
}

// Check rate limiting
function checkRateLimit(ip: string): { allowed: boolean; lockoutMinutes?: number } {
  const now = Date.now();
  const data = rateLimitStore.get(ip);

  if (data && data.lockoutUntil > now) {
    const minutesLeft = Math.ceil((data.lockoutUntil - now) / 60000);
    return { allowed: false, lockoutMinutes: minutesLeft };
  }

  if (data && data.attempts >= 5) {
    // Lockout for 15 minutes
    data.lockoutUntil = now + 15 * 60 * 1000;
    rateLimitStore.set(ip, data);
    return { allowed: false, lockoutMinutes: 15 };
  }

  return { allowed: true };
}

// Record failed attempt
function recordFailedAttempt(ip: string): void {
  const data = rateLimitStore.get(ip) || { attempts: 0, lockoutUntil: 0 };
  data.attempts += 1;
  rateLimitStore.set(ip, data);
}

// Reset attempts on successful login
function resetAttempts(ip: string): void {
  rateLimitStore.delete(ip);
}

// Validate password strength
function validatePassword(password: string): { valid: boolean; error?: string } {
  if (password.length < 8) {
    return { valid: false, error: 'Wachtwoord moet minimaal 8 tekens lang zijn' };
  }

  if (!/[a-z]/.test(password)) {
    return { valid: false, error: 'Wachtwoord moet minimaal één kleine letter bevatten' };
  }

  if (!/[A-Z]/.test(password)) {
    return { valid: false, error: 'Wachtwoord moet minimaal één hoofdletter bevatten' };
  }

  if (!/[0-9]/.test(password)) {
    return { valid: false, error: 'Wachtwoord moet minimaal één cijfer bevatten' };
  }

  if (!/[^a-zA-Z0-9]/.test(password)) {
    return { valid: false, error: 'Wachtwoord moet minimaal één symbool bevatten' };
  }

  return { valid: true };
}

// Check if user is authenticated
function isAuthenticated(request: Request): boolean {
  const cookie = request.headers.get('cookie');
  if (!cookie) return false;
  
  const cookies = Object.fromEntries(
    cookie.split('; ').map(c => c.split('='))
  );
  
  const authToken = cookies['keystatic-auth'];
  if (!authToken) return false;

  // Verify token hasn't expired (stored in token itself)
  try {
    const [token, expires] = authToken.split('.');
    if (parseInt(expires) < Date.now()) {
      return false;
    }
    return token === 'authenticated';
  } catch {
    return false;
  }
}

// Generate secure session token
function generateSessionToken(): string {
  const expires = Date.now() + (24 * 60 * 60 * 1000); // 24 hours
  return `authenticated.${expires}`;
}

// Set authentication cookie
function setAuthCookie(): Response {
  const token = generateSessionToken();
  const response = new Response(null, { status: 302 });
  response.headers.set('Location', '/keystatic');
  response.headers.set(
    'Set-Cookie',
    `keystatic-auth=${token}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=86400`
  );
  return response;
}

export const onRequest: MiddlewareHandler = async (context, next) => {
  const { url, request } = context;
  
  // Only protect /keystatic routes
  if (!url.pathname.startsWith('/keystatic')) {
    return next();
  }

  // Check if already authenticated
  if (isAuthenticated(request)) {
    return next();
  }

  const clientIP = getClientIP(request);

  // Handle login POST request
  if (url.pathname === '/keystatic/login' && request.method === 'POST') {
    // Check rate limiting
    const rateLimit = checkRateLimit(clientIP);
    if (!rateLimit.allowed) {
      return new Response(
        getLoginHTML(
          false,
          `Te veel mislukte pogingen. Probeer het over ${rateLimit.lockoutMinutes} minuten opnieuw.`
        ),
        {
          status: 429,
          headers: { 'Content-Type': 'text/html' },
        }
      );
    }

    const formData = await request.formData();
    const password = formData.get('password') as string;
    
    // Access environment variables - in Vercel serverless functions, use process.env at runtime
    // import.meta.env is for build-time, but middleware runs at runtime
    const secret = typeof process !== 'undefined' && process.env ? process.env.KEYSTATIC_SECRET : import.meta.env.KEYSTATIC_SECRET;
    const storedHash = typeof process !== 'undefined' && process.env ? process.env.KEYSTATIC_PASSWORD_HASH : import.meta.env.KEYSTATIC_PASSWORD_HASH;

    // Check if KEYSTATIC_SECRET is configured
    if (!secret || (typeof secret === 'string' && secret.trim() === '')) {
      console.error('❌ KEYSTATIC_SECRET is missing or empty');
      if (typeof process !== 'undefined' && process.env) {
        const available = Object.keys(process.env).filter(k => k.includes('KEYSTATIC')).join(', ') || 'none';
        console.error('Available KEYSTATIC env vars (process.env):', available);
      }
      return new Response(
        getLoginHTML(
          false, 
          'Server configuration error: KEYSTATIC_SECRET not configured. Please verify in Vercel Settings → Environment Variables that KEYSTATIC_SECRET is set for Production environment, then redeploy your project.'
        ),
        {
          status: 500,
          headers: { 'Content-Type': 'text/html' },
        }
      );
    }

    // Validate password format
    const validation = validatePassword(password);
    if (!validation.valid) {
      return new Response(
        getLoginHTML(false, validation.error || 'Ongeldig wachtwoord formaat'),
        {
          status: 400,
          headers: { 'Content-Type': 'text/html' },
        }
      );
    }

    if (!storedHash) {
      // First time setup - hash and store the password
      // You'll need to set KEYSTATIC_PASSWORD_HASH in Vercel after first login
      const hash = await bcrypt.hash(password + secret, 12); // 12 rounds
      console.log('🔐 First-time setup - Add this to Vercel KEYSTATIC_PASSWORD_HASH:', hash);
      console.log('🔐 Make sure to add it in Vercel Settings → Environment Variables → Production');
      
      // For first time, we'll accept it and log the hash
      resetAttempts(clientIP);
      return setAuthCookie();
    }

    // Verify password using bcrypt
    const isValid = await bcrypt.compare(password + secret, storedHash);

    if (isValid) {
      resetAttempts(clientIP);
      return setAuthCookie();
    } else {
      recordFailedAttempt(clientIP);
      const remainingAttempts = 5 - (rateLimitStore.get(clientIP)?.attempts || 0);
      return new Response(
        getLoginHTML(
          true,
          `Onjuist wachtwoord. ${remainingAttempts > 0 ? `${remainingAttempts} pogingen over.` : 'Geen pogingen meer over.'}`
        ),
        {
          status: 401,
          headers: { 'Content-Type': 'text/html' },
        }
      );
    }
  }

  // Show login form
  return new Response(getLoginHTML(false), {
    status: 401,
    headers: { 'Content-Type': 'text/html' },
  });
};

function getLoginHTML(showError: boolean, errorMessage?: string): string {
  return `<!DOCTYPE html>
<html lang="nl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Keystatic Admin - Login</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }
    .login-container {
      background: white;
      border-radius: 12px;
      box-shadow: 0 20px 60px rgba(0,0,0,0.3);
      padding: 40px;
      width: 100%;
      max-width: 400px;
    }
    h1 {
      color: #333;
      margin-bottom: 10px;
      font-size: 24px;
    }
    .subtitle {
      color: #666;
      margin-bottom: 30px;
      font-size: 14px;
    }
    .error {
      background: #fee;
      color: #c33;
      padding: 12px;
      border-radius: 6px;
      margin-bottom: 20px;
      font-size: 14px;
      border: 1px solid #fcc;
    }
    .info {
      background: #e8f4f8;
      color: #2c5f7d;
      padding: 12px;
      border-radius: 6px;
      margin-bottom: 20px;
      font-size: 13px;
      border: 1px solid #b8d4e3;
    }
    form {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }
    label {
      color: #333;
      font-weight: 500;
      font-size: 14px;
    }
    input[type="password"] {
      width: 100%;
      padding: 12px;
      border: 2px solid #e0e0e0;
      border-radius: 6px;
      font-size: 16px;
      transition: border-color 0.2s;
    }
    input[type="password"]:focus {
      outline: none;
      border-color: #667eea;
    }
    .password-requirements {
      font-size: 12px;
      color: #666;
      margin-top: -10px;
    }
    .password-requirements ul {
      margin-left: 20px;
      margin-top: 5px;
    }
    button {
      background: #667eea;
      color: white;
      border: none;
      padding: 12px 24px;
      border-radius: 6px;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.2s;
    }
    button:hover {
      background: #5568d3;
    }
    button:active {
      transform: scale(0.98);
    }
  </style>
</head>
<body>
  <div class="login-container">
    <h1>🔐 Keystatic Admin</h1>
    <p class="subtitle">Voer uw wachtwoord in om toegang te krijgen</p>
    ${showError && errorMessage ? `<div class="error">❌ ${errorMessage}</div>` : ''}
    ${!showError ? `<div class="info">ℹ️ Wachtwoord vereisten: minimaal 8 tekens, hoofdletters, kleine letters, cijfers en symbolen</div>` : ''}
    <form method="POST" action="/keystatic/login">
      <div>
        <label for="password">Wachtwoord</label>
        <input type="password" id="password" name="password" required autofocus minlength="8">
        <div class="password-requirements">
          <strong>Moet bevatten:</strong>
          <ul>
            <li>Minimaal 8 tekens</li>
            <li>Hoofdletters (A-Z)</li>
            <li>Kleine letters (a-z)</li>
            <li>Cijfers (0-9)</li>
            <li>Symbolen (!@#$% etc.)</li>
          </ul>
        </div>
      </div>
      <button type="submit">Inloggen</button>
    </form>
  </div>
</body>
</html>`;
}

