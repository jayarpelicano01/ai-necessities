#!/usr/bin/env node
// Builds real Claude Code commands, agents, and skills from the canonical `.agents/` files.
// Usage: node .claude/scripts/build-from-agents.mjs [--check]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const src = path.join(root, '.agents');
const out = path.join(root, '.claude');
const check = process.argv.includes('--check');

// Commands that also need the shared spec workflow.
const SPEC_WORKFLOW_COMMANDS = new Set(['plan-to-spec', 'execute-spec']);
const AGENT_CONTEXT_LINE =
  'Read the root `AGENTS.md` (and the repo\'s own `AGENTS.md` in a multi-repo workspace) and the approved spec in your brief before working.';

const rel = (p) => path.relative(root, p).replaceAll('\\', '/');
const read = (p) => (fs.existsSync(p) ? fs.readFileSync(p, 'utf8').replace(/\r\n/g, '\n') : null);
const banner = (sourcePath) =>
  `<!-- Generated from ${rel(sourcePath)}. Edit the source, then run: node .claude/scripts/build-from-agents.mjs -->`;

// Splits a markdown file into an ordered frontmatter map (raw values) and its body.
function parse(text) {
  const fm = new Map();
  if (!text?.startsWith('---\n')) return { fm, body: text ?? '' };
  const end = text.indexOf('\n---', 4);
  if (end === -1) return { fm, body: text };
  let key = null;
  for (const line of text.slice(4, end).split('\n')) {
    const match = /^([A-Za-z][\w-]*):(.*)$/.exec(line);
    if (match) {
      key = match[1];
      fm.set(key, match[2]);
    } else if (key) {
      fm.set(key, `${fm.get(key)}\n${line}`);
    }
  }
  const body = text.slice(end + 4).replace(/^\n+/, '');
  return { fm, body };
}

function render(fm, sourcePath, body) {
  const head = [...fm].map(([k, v]) => `${k}:${v}`).join('\n');
  return `---\n${head}\n---\n\n${banner(sourcePath)}\n\n${body.trimEnd()}\n`;
}

// Strips a previously inserted banner so regeneration stays stable.
const stripBanner = (body) => body.replace(/^<!-- Generated from [^\n]*-->\n+/, '');

const planned = new Map(); // absolute output path -> content (string or Buffer)

function mdFiles(dir) {
  return fs.existsSync(dir) ? fs.readdirSync(dir).filter((f) => f.endsWith('.md')).sort() : [];
}

// Commands: canonical frontmatter overrides the existing Claude frontmatter.
for (const file of mdFiles(path.join(src, 'commands'))) {
  const name = file.slice(0, -3);
  const sourcePath = path.join(src, 'commands', file);
  const target = path.join(out, 'commands', file);
  const canonical = parse(read(sourcePath));
  const existing = parse(read(target));
  const fm = new Map([...existing.fm, ...canonical.fm]);
  if (!fm.has('description')) fm.set('description', ` Run the ${name} workflow.`);
  let body = stripBanner(canonical.body);
  if (SPEC_WORKFLOW_COMMANDS.has(name)) body = `${body.trimEnd()}\n\nUse the \`spec-workflow\` skill.`;
  planned.set(target, render(fm, sourcePath, body));
}

// Agents: Claude frontmatter (name, description, tools) is owned by the Claude file.
for (const file of mdFiles(path.join(src, 'agents'))) {
  const name = file.slice(0, -3);
  const sourcePath = path.join(src, 'agents', file);
  const target = path.join(out, 'agents', file);
  const canonical = parse(read(sourcePath));
  const existing = parse(read(target));
  const fm = new Map([...existing.fm, ...canonical.fm]);
  if (!fm.has('name')) fm.set('name', ` ${name}`);
  if (!fm.has('description')) {
    console.error(`Missing description for agent ${name}. Add it to ${rel(target)} frontmatter.`);
    process.exit(2);
  }
  const body = `${stripBanner(canonical.body).trimEnd()}\n\n${AGENT_CONTEXT_LINE}`;
  planned.set(target, render(fm, sourcePath, body));
}

// Skills: copy each folder; SKILL.md gets the banner, other files are copied as-is.
const skillsDir = path.join(src, 'skills');
const walk = (dir) =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? walk(path.join(dir, e.name)) : [path.join(dir, e.name)],
  );
const skillNames = fs.existsSync(skillsDir)
  ? fs.readdirSync(skillsDir, { withFileTypes: true }).filter((e) => e.isDirectory()).map((e) => e.name).sort()
  : [];
for (const skill of skillNames) {
  for (const sourcePath of walk(path.join(skillsDir, skill))) {
    const target = path.join(out, 'skills', skill, path.relative(path.join(skillsDir, skill), sourcePath));
    if (path.basename(sourcePath) === 'SKILL.md') {
      const { fm, body } = parse(read(sourcePath));
      planned.set(target, render(fm, sourcePath, stripBanner(body)));
    } else {
      planned.set(target, fs.readFileSync(sourcePath));
    }
  }
}

// Files inside generated skill folders that the source no longer has.
const extras = skillNames.flatMap((skill) => {
  const dir = path.join(out, 'skills', skill);
  return fs.existsSync(dir) ? walk(dir).filter((p) => !planned.has(p)) : [];
});

const same = (target, content) => {
  if (!fs.existsSync(target)) return false;
  const current = fs.readFileSync(target);
  return Buffer.isBuffer(content) ? current.equals(content) : current.toString('utf8') === content;
};
const stale = [...planned].filter(([target, content]) => !same(target, content)).map(([t]) => t);

if (check) {
  if (stale.length || extras.length) {
    stale.forEach((t) => console.error(`stale: ${rel(t)}`));
    extras.forEach((t) => console.error(`not in source: ${rel(t)}`));
    console.error('Claude wiring is out of date. Run: node .claude/scripts/build-from-agents.mjs');
    process.exit(1);
  }
  console.log(`Claude wiring is up to date (${planned.size} files).`);
  process.exit(0);
}

for (const target of stale) {
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, planned.get(target));
  console.log(`wrote ${rel(target)}`);
}
extras.forEach((t) => console.warn(`not in source, left in place: ${rel(t)}`));
console.log(`${stale.length} written, ${planned.size - stale.length} unchanged.`);
