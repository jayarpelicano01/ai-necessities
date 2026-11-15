# Claude Code instructions

This repository is the source package for AI-Necessities.

Read these files before editing:

- `README.md`
- `AGENTS.md-template.md`
- `template.agents/`
- `template.claude/`

The canonical workflow lives in `template.agents/`. The Claude adapter in `template.claude/` must stay thin and point back to that source. Do not copy full instructions into Claude-specific files.

When changing the template:

1. Preserve the `.agents` workflow for non-Claude runtimes.
2. Keep `CLAUDE.md` and `.claude/` adapters compatible with the canonical files.
3. Do not add duplicate command or skill instructions.
4. Test `node bin/init.js` in a clean temporary project.
5. Run `git diff --check`, parse `package.json`, and check that retired workflow names no longer appear.
6. Never commit secrets or push without explicit user approval.
