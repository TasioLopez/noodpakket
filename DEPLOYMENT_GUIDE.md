# Deployment Guide: GitHub + Vercel

This guide will walk you through connecting your project to GitHub and deploying it to Vercel with a custom domain.

## Step 1: Create a GitHub Repository

1. Go to [GitHub.com](https://github.com) and sign in
2. Click the **+** icon in the top right corner
3. Select **New repository**
4. Fill in the details:
   - **Repository name**: `noodpakket-center` (or your preferred name)
   - **Description**: "Noodpakket Center - Crisis Voorbereiding Platform"
   - **Visibility**: Choose Public or Private
   - **DO NOT** initialize with README, .gitignore, or license (we already have these)
5. Click **Create repository**

## Step 2: Push Your Code to GitHub

After creating the repository, GitHub will show you commands. Use these commands in your terminal:

```powershell
# Navigate to your project directory (if not already there)
cd "C:\Users\Tasio\OneDrive\Bureau\noodpakket"

# Add the GitHub repository as remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/noodpakket-center.git

# Rename branch to main (if needed)
git branch -M main

# Push your code to GitHub
git push -u origin main
```

**Note**: You'll be prompted for your GitHub username and password. If you have 2FA enabled, use a Personal Access Token instead of your password.

### Creating a Personal Access Token (if needed)

1. Go to GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Click **Generate new token (classic)**
3. Give it a name like "Vercel Deployment"
4. Select scopes: `repo` (full control of private repositories)
5. Click **Generate token**
6. Copy the token and use it as your password when pushing

## Step 3: Deploy to Vercel

### Option A: Deploy via Vercel Dashboard (Recommended)

1. Go to [vercel.com](https://vercel.com) and sign in (or create an account)
2. Click **Add New Project**
3. Import your GitHub repository:
   - Click **Import Git Repository**
   - Select your `noodpakket-center` repository
   - Click **Import**
4. Configure the project:
   - **Framework Preset**: Vercel should auto-detect "Astro"
   - **Root Directory**: `./` (leave as default)
   - **Build Command**: `npm run build` (should be auto-filled)
   - **Output Directory**: `dist` (should be auto-filled)
   - **Install Command**: `npm install` (should be auto-filled)
5. Click **Deploy**
6. Wait for the deployment to complete (usually 1-2 minutes)

### Option B: Deploy via Vercel CLI

```powershell
# Install Vercel CLI globally
npm install -g vercel

# Navigate to your project
cd "C:\Users\Tasio\OneDrive\Bureau\noodpakket"

# Deploy
vercel

# Follow the prompts:
# - Set up and deploy? Yes
# - Which scope? (select your account)
# - Link to existing project? No
# - Project name? (press Enter for default)
# - Directory? (press Enter for current directory)
# - Override settings? No
```

## Step 4: Set Up Custom Domain in Vercel

1. In your Vercel dashboard, go to your project
2. Click on the **Settings** tab
3. Click **Domains** in the left sidebar
4. Enter your domain name (e.g., `noodpakket.nl` or `www.noodpakket.nl`)
5. Click **Add**
6. Vercel will show you DNS configuration instructions

### DNS Configuration

You'll need to add DNS records to your domain registrar. Vercel will provide specific instructions, but typically:

**For apex domain (noodpakket.nl):**
- Type: `A`
- Name: `@` or leave blank
- Value: Vercel's IP address (Vercel will provide this)

**For www subdomain (www.noodpakket.nl):**
- Type: `CNAME`
- Name: `www`
- Value: `cname.vercel-dns.com` (or the value Vercel provides)

### Steps at Your Domain Registrar:

1. Log in to your domain registrar (e.g., Namecheap, GoDaddy, etc.)
2. Go to DNS Management
3. Add the DNS records as provided by Vercel
4. Save the changes
5. Wait for DNS propagation (can take a few minutes to 48 hours)

### Verify Domain in Vercel

1. After adding DNS records, go back to Vercel
2. Vercel will automatically verify your domain
3. Once verified, your site will be accessible at your custom domain
4. Vercel will also automatically provision an SSL certificate (HTTPS)

## Step 5: Automatic Deployments

Once connected, Vercel will automatically:
- Deploy new commits pushed to the `main` branch
- Create preview deployments for pull requests
- Update your production site automatically

## Troubleshooting

### Build Errors
- Check that all dependencies are in `package.json`
- Ensure `vercel.json` is correctly configured (already done)
- Check Vercel build logs for specific errors

### Domain Not Working
- Verify DNS records are correct
- Wait for DNS propagation (can take up to 48 hours)
- Check domain status in Vercel dashboard

### Environment Variables
If you need environment variables:
1. Go to Vercel project → Settings → Environment Variables
2. Add your variables
3. Redeploy the project

## Next Steps

- Your site is now live! 🎉
- Every push to `main` will automatically deploy
- You can view deployment history in the Vercel dashboard
- Set up custom domains for preview deployments if needed

## Useful Commands

```powershell
# Check git status
git status

# Add and commit changes
git add .
git commit -m "Your commit message"

# Push to GitHub (triggers Vercel deployment)
git push origin main

# View Vercel deployments
vercel ls

# View Vercel logs
vercel logs
```

