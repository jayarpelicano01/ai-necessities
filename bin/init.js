#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const TEMPLATE_DIR = path.join(__dirname, '..', 'template.agents');
const CLAUDE_TEMPLATE_DIR = path.join(__dirname, '..', 'template.claude');
const TARGET_DIR = path.join(process.cwd(), '.agents');

function copyDir(src, dest, { skipExisting = false } = {}) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDir(srcPath, destPath, { skipExisting });
      continue;
    }

    if (skipExisting && fs.existsSync(destPath)) {
      continue;
    }

    fs.copyFileSync(srcPath, destPath);
  }
}

function main() {
  const installClaude = process.argv.includes('--claude');

  if (!fs.existsSync(TEMPLATE_DIR)) {
    console.error('Error: template.agents/ not found in package.');
    process.exit(1);
  }

  const agentsAlreadyExists = fs.existsSync(TARGET_DIR);
  if (agentsAlreadyExists) {
    console.log('.agents/ already exists in this project. Skipping agent template copy.');
  } else {
    copyDir(TEMPLATE_DIR, TARGET_DIR);
    console.log('.agents/ installed into this project.');
  }

  if (installClaude) {
    if (!fs.existsSync(CLAUDE_TEMPLATE_DIR)) {
      console.error('Error: template.claude/ not found in package.');
      process.exit(1);
    }

    copyDir(CLAUDE_TEMPLATE_DIR, process.cwd(), { skipExisting: true });
    console.log('Claude Code adapter installed without overwriting existing files.');
  }

  console.log('');
  console.log('Next steps:');
  console.log('  1. Review the files under .agents/');
  console.log('  2. Run /setup to initialize agents for this project.');
  if (!installClaude) {
    console.log('  3. Add Claude Code support later with: npx ai-necessities --claude');
  } else {
    console.log('  3. Open Claude Code and review CLAUDE.md and .claude/.');
  }
}

main();
