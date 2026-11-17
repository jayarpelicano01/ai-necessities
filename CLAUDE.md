# Claude Code instructions

This repository is the source package for AI-Necessities.

Read these files before editing:

- `README.md`
- `AGENTS.md-template.md`
- `template.agents/`
- `template.claude/`

The canonical workflow lives in `template.agents/`. The files under `template.claude/.claude/commands/`, `agents/`, and `skills/` are generated from it, so never edit them by hand. `template.claude/.claude/settings.json`, `hooks/guard.js`, and `scripts/build-from-agents.mjs` are hand-maintained.

When changing the template:

1. Edit `template.agents/` first. Preserve the `.agents` workflow for non-Claude runtimes.
2. Regenerate the Claude files. The generator expects `.agents/` and `.claude/` side by side, so stage a copy: copy `template.agents/` to `<tmp>/.agents/`, copy `template.claude/` contents to `<tmp>/`, run `node .claude/scripts/build-from-agents.mjs` there, then copy `<tmp>/.claude/commands`, `agents`, and `skills` back into `template.claude/.claude/`.
3. Keep the template generic. Project-specific skills, setup state, and repo names stay in the project, not here.
4. Test `node bin/init.js --claude` in a clean temporary project, then run `node .claude/scripts/build-from-agents.mjs --check` there.
5. Run `git diff --check`, parse `package.json`, and check that retired workflow names no longer appear.
6. Never commit secrets or push without explicit user approval.
