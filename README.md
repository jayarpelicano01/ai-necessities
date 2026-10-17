# ai-necessities

> **Work in progress.** This template is continuously getting improved. Expect changes, additions, and refinements as it evolves.

A plug-and-play AI agent template for coding projects. Copy `.agents/` into any project and you get a full agent setup: `/setup`, `/pm`, `/review`, `/test`, and `/security-audit`. Stack-agnostic — works with React, Next.js, Node/Express, Flutter, or anything else.

## What's inside

```
.ai-necessities/
├── AGENTS.md-template.md        # Root agent instructions (copy into your project)
├── template.agents/             # The actual .agents/ folder to drop into projects
│   ├── commands/                # /setup, /init, /pm, /review, /test, /security-audit
│   ├── agents/                  # designer, backend-architect, reviewer, tester, security-auditor, researcher
│   ├── hooks/                   # pre-edit, post-commit safety hooks
│   ├── skills/                  # skill-discovery (finds and installs relevant skills)
│   ├── settings/                # agent-config (writing style, safety, model rules)
│   └── overlays/                # react-express, react-next, react-native-expo-supabase
├── bin/init.js                  # npm installable: copies .agents/ into your project
├── package.json
└── .gitignore
```

## Quick start

### Option 1: Manual copy (no install)

1. Copy `template.agents/` into your project as `.agents/`.
2. Run `/setup` once. It scans your project, generates `AGENTS.md`, and proposes project-fit agents/commands/skills.
3. Approve the proposal before anything is created.

### Option 2: npm install

```bash
npm install ai-necessities
npx ai-necessities   # installs .agents/ into your project
# Then run /setup
```

## Workflow

When a task arrives:

1. **Analyze** what areas it touches (UI, database, API, security, tests).
2. **Route** to the right agent — designer, backend-architect, tester, security-auditor, or reviewer.
3. **If multiple areas** (e.g. creating tables AND redesigning the main screen), agents co-work in parallel on their slice.
4. **Tester follows up** — generates and runs tests for everything that changed.
5. **Reviewer checks** — reviews the combined output against AGENTS.md.
6. **Approval gate** — stop before implementing. Present the plan and wait for explicit approval. No auto-execute, no auto-push.

## Stack overlays

Drop these into `template.agents/overlays/` before running `/setup`:
- `react-express`
- `react-next`
- `react-native-expo-supabase`

## Status

**Work in progress.** Continuously getting improved. Commands, agents, and overlays will be added and refined over time.

## License

MIT
