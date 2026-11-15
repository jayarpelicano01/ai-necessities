# ai-necessities

> Work in progress. This template is continuously improved.

A plug-and-play AI agent setup for coding projects. Copy `.agents/` into a project and get a safe workflow for project discovery, task specs, delegated implementation, testing, review, verification, and commits.

## What's inside

```text
.ai-necessities/
├── AGENTS.md-template.md
├── CLAUDE.md
├── template.agents/
│   ├── commands/                # setup, init, plan-to-spec, execute-spec, verify, and workflow commands
│   ├── agents/                  # backend-engineer, designer, tester, reviewer, security-auditor, researcher
│   ├── hooks/                   # edit, command, and post-commit safety rules
│   ├── skills/                  # find-skills and the shared spec-workflow
│   ├── settings/                # writing, context, and safety settings
│   └── overlays/                # optional stack notes
├── template.claude/              # thin Claude Code adapters and guard
├── bin/init.js
├── package.json
└── .gitignore
```

## Quick start

### Manual copy

1. Copy `template.agents/` into the project as `.agents/`.
2. Run `/setup` once.
3. Review the detected project profile and the proposed skills.
4. Approve only the skills you want installed locally.

### npm install

```bash
npm install ai-necessities
npx ai-necessities
# Then run /setup
```

To add Claude Code support without overwriting existing project files:

```bash
npx ai-necessities --claude
```

The Claude adapter creates `CLAUDE.md`, `.claude/commands/`, `.claude/skills/`, and `.claude/settings.json` only when those files do not already exist. The `.agents/` files remain the source of truth. Claude-specific files are thin adapters, so workflow rules do not fork between runtimes.

## Workflow

1. `/setup` runs `/init`, builds the project profile, and uses the local `find-skills` skill to search for matching skills.
2. `/plan-to-spec <task>` creates a complete draft with ownership, permissions, skills, dependencies, handoffs, acceptance criteria, and verification.
3. After approval, `/plan-to-spec` writes `docs/specs/YYYY-MM-DD-NNN-<kebab-slug>.md` and stops.
4. A fresh context runs `/execute-spec <path>` to validate the spec and summon only the listed subagents.
5. `tester` runs after implementation. `reviewer` runs last. `security-auditor` runs when the spec requires it.
6. `/verify` runs only documented project checks.
7. `/commit` prepares focused commits and waits for approval before committing. It never pushes.

## Primary agents

- `backend-engineer` owns backend services, APIs, databases, integrations, and backend tests.
- `designer` owns frontend screens, components, styles, design tokens, and frontend tests.
- Cross-layer work is divided by ownership. Neither primary agent silently edits the other layer.

## Supporting agents

- `tester` creates and runs tests after implementation.
- `reviewer` performs the final read-only review.
- `security-auditor` checks secrets, permissions, input handling, dependencies, and data exposure.
- `researcher` performs read-only investigation when a factual question remains unresolved.

## Skill discovery

The local `find-skills` skill is the single skill-search workflow. It derives specific searches from `AGENTS.md`, proposes matching skills, and installs only approved skills into the project-local `.agents/skills/` directory. It never installs silently and never removes existing skills automatically.

## Safety hooks

Hooks define `allow`, `ask`, and `deny` actions for edits and commands. They protect secrets, require approval for risky operations, prevent pushes, and enforce the ownership boundaries in the approved spec. When the runtime cannot enforce a text hook, the agent must stop and report the violation instead of claiming it was blocked.

## Claude Code compatibility

Claude Code users can run `npx ai-necessities --claude`. The adapter points Claude to the same `AGENTS.md`, `.agents/commands/`, and `.agents/skills/` files used by other runtimes. It also installs project-level permission rules and a small executable guard for pushes, destructive commands, secret files, Git metadata, and dependency folders. Existing `CLAUDE.md` and `.claude/` files are preserved.

## Stack overlays

The overlays are optional reference notes for common stacks. They do not replace repository-specific discovery. Project facts come from the generated `AGENTS.md` and installed skills.

## Status

Work in progress. Commands, agents, hooks, and skills will continue to be refined.

## License

MIT
