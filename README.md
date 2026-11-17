# ai-necessities

> Work in progress. This template is continuously improved.

A plug-and-play AI agent setup for coding projects. Copy `.agents/` into a project and get a safe workflow for project discovery, task specs, delegated implementation, testing, review, verification, and commits.

## What's inside

```text
.ai-necessities/
├── AGENTS.md-template.md
├── CLAUDE.md
├── template.agents/
│   ├── commands/                # setup, init, plan-to-spec, execute-spec, verify, commit, pr, jira-next, jira-done, and more
│   ├── agents/                  # backend-engineer, designer, tester, reviewer, security-auditor, researcher
│   ├── hooks/                   # edit, command, and post-commit safety rules
│   ├── skills/                  # find-skills and the shared spec-workflow
│   ├── settings/                # writing, context, and safety settings
│   └── overlays/                # optional stack notes
├── template.claude/              # Claude Code wiring: generated commands/agents/skills, build script, guard
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

The Claude wiring creates `CLAUDE.md`, `.claude/commands/`, `.claude/skills/`, `.claude/agents/`, `.claude/scripts/`, `.claude/hooks/`, and `.claude/settings.json` only when those files do not already exist. The `.agents/` files remain the source of truth. The commands, agents, and skills under `.claude/` are generated copies, so workflow rules do not fork between runtimes. After editing anything under `.agents/`, regenerate them:

```bash
node .claude/scripts/build-from-agents.mjs          # write
node .claude/scripts/build-from-agents.mjs --check  # fail if stale (use in /verify)
```

The generator keeps each Claude file's own frontmatter (agent `name`, `description`, `tools`), takes command frontmatter from `.agents/`, adds a "generated" banner, and never edits `.agents/`. `CLAUDE.md` imports `AGENTS.md` and `.agents/settings/agent-config.md` so project facts and agent settings load every session.

## Workflow

1. `/setup` runs `/init`, builds the project profile, and uses the local `find-skills` skill to search for matching skills.
2. `/plan-to-spec <task or Jira keys>` creates a complete draft with ownership, permissions, skills, dependencies, handoffs, acceptance criteria, and verification. Jira keys are read through the Atlassian MCP (read only).
3. After approval, `/plan-to-spec` writes `docs/specs/YYYY-MM-DD-NNN-<kebab-slug>.md` and stops.
4. A fresh context runs `/execute-spec <path>` to validate the spec and summon only the listed subagents.
5. `tester` runs after implementation. `reviewer` runs last. `security-auditor` runs when the spec requires it.
6. `/verify` runs only documented project checks.
7. `/commit` prepares focused commits and waits for approval before committing. It never pushes. In Jira projects it tags each commit with its ticket key and works across every repo `AGENTS.md` lists.
8. `/pr` pushes the branch, opens a pull request, checks for conflicts, and squash merges. It has two approval gates: push, then merge. It is the only path that pushes.
9. `/jira-next` compares your local work with Jira and suggests the next feature. After approval it assigns the ticket to you and sets it In Progress. `/jira-done` moves merged tickets to Done after approval. Both are for Jira projects and need the Atlassian MCP.

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

Hooks define `allow`, `ask`, and `deny` actions for edits and commands. They protect secrets, require approval for risky operations, block force-pushes (a plain `git push` asks first and belongs to `/pr`), and enforce the ownership boundaries in the approved spec. When the runtime cannot enforce a text hook, the agent must stop and report the violation instead of claiming it was blocked.

## Claude Code compatibility

Claude Code users can run `npx ai-necessities --claude`. The wiring is generated from the same `.agents/` files used by other runtimes. It also installs project-level permission rules (`ask` for `git push`, `git commit`, installs, and deploys; `deny` for publish, hard reset, and recursive deletes) and a small executable guard for both the Bash and PowerShell tools. The guard blocks force-pushes, destructive commands, secret files, Git metadata, and dependency folders. Existing `CLAUDE.md` and `.claude/` files are preserved.

## Stack overlays

The overlays are optional reference notes for common stacks. They do not replace repository-specific discovery. Project facts come from the generated `AGENTS.md` and installed skills.

## Status

Work in progress. Commands, agents, hooks, and skills will continue to be refined.

## License

MIT
