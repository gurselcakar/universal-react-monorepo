#!/usr/bin/env node

const readline = require('readline');
const fs = require('fs');
const path = require('path');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log('\n🚀 Web Framework Setup\n');
console.log('Choose your web framework:');
console.log('  1. Next.js (apps/next)');
console.log('  2. Vite + React (apps/vite)\n');

rl.question('Enter your choice (1 or 2): ', (answer) => {
    const choice = answer.trim();

    if (choice !== '1' && choice !== '2') {
        console.error('❌ Invalid choice. Please run the script again and choose 1 or 2.');
        rl.close();
        process.exit(1);
    }

    const keepNextJs = choice === '1';
    const keepDir = keepNextJs ? 'apps/next' : 'apps/vite';
    const removeDir = keepNextJs ? 'apps/vite' : 'apps/next';
    const frameworkName = keepNextJs ? 'Next.js' : 'Vite + React';

    console.log(`\n✅ You selected: ${frameworkName}`);
    console.log(`📁 Keeping: ${keepDir}`);
    console.log(`🗑️  Removing: ${removeDir}\n`);

    rl.question('Continue? (y/n): ', (confirm) => {
        if (confirm.toLowerCase() !== 'y' && confirm.toLowerCase() !== 'yes') {
            console.log('❌ Setup cancelled.');
            rl.close();
            process.exit(0);
        }

        try {
            // Remove the unwanted directory
            console.log(`\n🗑️  Removing ${removeDir}...`);
            if (fs.existsSync(removeDir)) {
                fs.rmSync(removeDir, { recursive: true, force: true });
            } else {
                console.log(`⚠️  Directory ${removeDir} not found (already removed?)`);
            }

            console.log(`\n📝 Renaming ${keepDir} to apps/web...`);

            if (fs.existsSync('apps/web')) {
                fs.rmSync('apps/web', { recursive: true, force: true });
            }

            if (fs.existsSync(keepDir)) {
                fs.renameSync(keepDir, 'apps/web');
                console.log(`✅ Renamed to apps/web`);
            } else {
                console.error(`❌ Error: Source directory ${keepDir} not found!`);
                process.exit(1);
            }

            console.log('\n🎉 Setup complete!');
            console.log(`\nYour web app is now at: apps/web`);
            console.log(`Framework: ${frameworkName}\n`);
            console.log('Next steps:');
            console.log('  1. Run: pnpm install');
            console.log('  2. Run: pnpm dev --filter web\n');

        } catch (error) {
            console.error('❌ Error during setup:', error.message);
            process.exit(1);
        }

        rl.close();
    });
});
