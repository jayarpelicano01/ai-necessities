#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const TEMPLATE_DIR = path.join(__dirname, '..', 'template.agents');
const TARGET_DIR = path.join(process.cwd(), '.agents');

function copyDir(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

function main() {
  if (!fs.existsSync(TEMPLATE_DIR)) {
    console.error('Error: template.agents/ not found in package.');
    process.exit(1);
  }

  if (fs.existsSync(TARGET_DIR)) {
    console.log('.agents/ already exists in this project. Skipping copy.');
    console.log('Run /setup to initialize agents, or delete .agents/ and re-run to overwrite.');
    process.exit(0);
  }

  copyDir(TEMPLATE_DIR, TARGET_DIR);
  console.log('.agents/ installed into this project.');
  console.log('');
  console.log('Next steps:');
  console.log('  1. Review the files under .agents/');
  console.log('  2. Run /setup to initialize agents for this project.');
}

main();
