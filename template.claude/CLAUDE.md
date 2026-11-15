# AI-Necessities Claude Code adapter

Read `@AGENTS.md` before project work when that file exists. The canonical workflow is in `.agents/`. This file is only the Claude Code adapter.

## Source of truth

- Project facts, commands, and conventions: `AGENTS.md`
- Shared workflow rules: `.agents/skills/spec-workflow/SKILL.md`
- Skill discovery: `.agents/skills/find-skills/SKILL.md`
- Agent roles: `.agents/agents/`
- Safety policy: `.agents/hooks/`
- Claude permission rules and executable guard: `.claude/settings.json` and `.claude/hooks/guard.js`

Do not duplicate the full `.agents` instructions here. Read the matching canonical file when a command or agent is used.

## Claude workflow

- Use `/setup` to initialize the project and discover skills.
- Use `/plan-to-spec <task>` for non-trivial work. It writes an approved spec and stops.
- Use `/execute-spec <path>` from a fresh context to execute an approved spec.
- Use `/verify` before reporting completion.
- Use `/commit` only after its approval gate. Never push.

The files under `.claude/commands/` and `.claude/skills/` are thin adapters. If an adapter and a canonical `.agents` file disagree, follow the `.agents` file and update the adapter.
