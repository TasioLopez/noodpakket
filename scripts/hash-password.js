// scripts/hash-password.js
import bcrypt from 'bcryptjs';

const args = process.argv.slice(2);

if (args.length < 2) {
  console.error('❌ Usage: npm run hash-password <YOUR_PASSWORD> <KEYSTATIC_SECRET>');
  console.error('');
  console.error('Example:');
  console.error('  npm run hash-password "MyP@ss123" "sX9ryOHHqSSvyuJGxbbwDzjXBqx1/SHcOsvk3Zv3I0c="');
  console.error('');
  console.error('Note: Use quotes around password and secret if they contain special characters');
  process.exit(1);
}

const password = args[0];
const secret = args[1];

try {
  // Validate password requirements
  if (password.length < 8) {
    console.error('❌ Error: Password must be at least 8 characters');
    process.exit(1);
  }

  if (!/[a-z]/.test(password)) {
    console.error('❌ Error: Password must contain at least one lowercase letter');
    process.exit(1);
  }

  if (!/[A-Z]/.test(password)) {
    console.error('❌ Error: Password must contain at least one uppercase letter');
    process.exit(1);
  }

  if (!/[0-9]/.test(password)) {
    console.error('❌ Error: Password must contain at least one number');
    process.exit(1);
  }

  if (!/[^a-zA-Z0-9]/.test(password)) {
    console.error('❌ Error: Password must contain at least one symbol');
    process.exit(1);
  }

  // Hash password with secret
  const hash = await bcrypt.hash(password + secret, 12);
  
  console.log('\n✅ Success! Generated password hash:\n');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(hash);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('\n📋 Copy this hash and add it to Vercel as:');
  console.log('   Variable name: KEYSTATIC_PASSWORD_HASH');
  console.log('   Value: (paste the hash above)');
  console.log('   Environment: Production, Preview, Development');
  console.log('\n💡 Make sure KEYSTATIC_SECRET is also set in Vercel!');
  
} catch (error) {
  console.error('❌ Error generating hash:', error.message);
  process.exit(1);
}

