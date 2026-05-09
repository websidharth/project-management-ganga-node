#!/usr/bin/env node
// Reads .env from repo root and runs `vercel env add <KEY> <env>` for production, preview, development.
// Usage: node scripts/add-vercel-env.js [path-to-env]
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

function parseEnv(content) {
  const lines = content.split(/\r?\n/);
  const result = {};
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let val = trimmed.slice(eq + 1);
    // Strip surrounding quotes
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    result[key] = val;
  }
  return result;
}

async function runCmdWithInput(cmd, args, input) {
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, args, { stdio: ['pipe', 'inherit', 'inherit'] });
    child.on('error', reject);
    child.on('close', (code) => {
      if (code === 0) resolve();
      else reject(new Error(`${cmd} ${args.join(' ')} exited with ${code}`));
    });
    if (input != null) {
      child.stdin.write(input + '\n');
    }
    child.stdin.end();
  });
}

async function addKeyToAllEnvs(key, value) {
  const envs = ['production', 'preview', 'development'];
  for (const e of envs) {
    console.log(`\nAdding ${key} to ${e}...`);
    // vercel env add <name> <env>
    try {
      await runCmdWithInput('vercel', ['env', 'add', key, e], value);
      console.log(`✅ ${key} added to ${e}`);
    } catch (err) {
      console.error(`✖ Failed to add ${key} to ${e}:`, err.message);
      // continue to next
    }
  }
}

async function main() {
  const envPath = process.argv[2] || path.resolve(process.cwd(), '.env');
  if (!fs.existsSync(envPath)) {
    console.error('No .env file found at', envPath);
    process.exit(1);
  }
  const content = fs.readFileSync(envPath, 'utf8');
  const vars = parseEnv(content);
  const keys = Object.keys(vars);
  if (keys.length === 0) {
    console.error('No variables found in', envPath);
    process.exit(1);
  }

  console.log('This script will add the following keys to Vercel (production/preview/development):');
  console.log(keys.join(', '));
  console.log('\nMake sure you are logged in to Vercel CLI (run `vercel login`) and the project is linked.');
  // prompt for confirmation
  const readline = require('readline');
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  const answer = await new Promise((res) => rl.question('Proceed? (y/N) ', res));
  rl.close();
  if (!/^y(es)?$/i.test(answer.trim())) {
    console.log('Aborted.');
    process.exit(0);
  }

  for (const k of keys) {
    const v = vars[k];
    await addKeyToAllEnvs(k, v);
  }
  console.log('\nDone.');
}

main().catch((err) => {
  console.error('Error:', err);
  process.exit(1);
});
