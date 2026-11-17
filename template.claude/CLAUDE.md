@AGENTS.md
@.agents/settings/agent-config.md

# Claude Code wiring

- `.agents/` is the source of truth. `.claude/commands/`, `.claude/agents/`, and `.claude/skills/` are generated from it: edit `.agents/`, then run `node .claude/scripts/build-from-agents.mjs`. Never edit the generated files directly.
- `.claude/settings.json` and `.claude/hooks/guard.js` are hand-maintained and enforce the `.agents/hooks/` policy.
- Workflow: `/setup` once, `/plan-to-spec <task>` for non-trivial work, `/execute-spec <path>` from a fresh context, `/verify` before reporting completion, `/commit` after its approval gate, `/pr` to ship branches (approval gates), `/jira-next` to pick Jira work and `/jira-done` to close merged tickets (Jira projects only). Never push without `/pr` approval.
