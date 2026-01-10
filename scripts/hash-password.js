// scripts/hash-password.js
const bcrypt = require('bcryptjs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('🔐 Keystatic Password Hash Generator\n');

rl.question('Enter your password: ', (password) => {
  rl.question('Enter KEYSTATIC_SECRET value: ', async (secret) => {
    if (!password || !secret) {
      console.error('❌ Error: Both password and secret are required');
      rl.close();
      process.exit(1);
    }

    try {
      // Validate password requirements
      if (password.length < 8) {
        console.error('❌ Error: Password must be at least 8 characters');
        rl.close();
        process.exit(1);
      }

      if (!/[a-z]/.test(password)) {
        console.error('❌ Error: Password must contain at least one lowercase letter');
        rl.close();
        process.exit(1);
      }

      if (!/[A-Z]/.test(password)) {
        console.error('❌ Error: Password must contain at least one uppercase letter');
        rl.close();
        process.exit(1);
      }

      if (!/[0-9]/.test(password)) {
        console.error('❌ Error: Password must contain at least one number');
        rl.close();
        process.exit(1);
      }

      if (!/[^a-zA-Z0-9]/.test(password)) {
        console.error('❌ Error: Password must contain at least one symbol');
        rl.close();
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
      
      rl.close();
    } catch (error) {
      console.error('❌ Error generating hash:', error.message);
      rl.close();
      process.exit(1);
    }
  });
});

