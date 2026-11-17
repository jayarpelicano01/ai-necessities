# AGENTS.md

## How to plug into a new project

1. Copy `AI-Necessities/template.agents/` into the target project as `.agents/`, or run `npx ai-necessities`.
2. If using Claude Code, run `npx ai-necessities --claude` to add `CLAUDE.md` and `.claude/`. The `.claude/` commands, agents, and skills are generated from `.agents/` by `node .claude/scripts/build-from-agents.mjs`. Re-run it after any edit under `.agents/`.
3. Run `/setup` once. It runs `/init`, builds the project profile, and searches for matching skills.
4. Approve only the skills you want installed locally.
5. Use `/plan-to-spec <task>` for non-trivial work.
6. After the spec is approved, use a fresh context with `/execute-spec <path>`.

---

## Commands

- `/setup` - initialize the project profile and discover matching skills.
- `/init` - scan the project and write observed facts to the root `AGENTS.md`.
- `/plan-to-spec <task or Jira keys>` - create an execution-ready spec, wait for approval, write it under `docs/specs/`, then stop. Jira keys are read through the Jira MCP.
- `/execute-spec <path>` - execute an approved spec from a fresh context.
- `/sync-agents` - rescan the project, refresh the profile, and deduplicate `.agents/`.
- `/verify` - run only documented project checks.
- `/review` - perform a targeted code review.
- `/test` - create and run tests for changed code.
- `/security-audit` - scan changed code for security issues.
- `/doc-change` - create a change-log entry when the project has that convention.
- `/commit` - prepare focused commits and commit only after explicit approval. Never push. Tags each commit with its Jira key when the project uses Jira.
- `/pr` - push a branch, open a pull request, check for conflicts, and squash merge after two approval gates (push, then merge).
- `/jira-next` - compare your work with Jira, suggest the next feature, and after approval assign it to you and set it In Progress. Jira projects only.
- `/jira-done` - move merged tickets to Done after approval. Jira projects only.

## Agent routing

- `backend-engineer` is the primary agent for backend services, APIs, databases, integrations, and backend tests.
- `designer` is the primary agent for frontend screens, components, styles, design tokens, and frontend tests.
- `tester` follows implementation work.
- `reviewer` runs last.
- `security-auditor` is added when the task touches secrets, auth, permissions, untrusted input, dependencies, or sensitive data.
- `researcher` is read-only and handles unresolved factual investigation.

Cross-layer tasks are divided by `/plan-to-spec`. Each primary agent edits only its assigned boundary. A primary agent reads the other boundary's contracts when needed but does not silently cross into it.

## Skills

- `/setup` loads the local `find-skills` skill after `/init`.
- `find-skills` searches for repository-matching skills, proposes them, and installs only approved skills locally.
- `spec-workflow` is the single source of truth for `/plan-to-spec` and `/execute-spec`.
- Every spec includes an exact invocation brief for each subagent, not only an agent name.
- Agents load only the installed skills named by the active spec. Missing required skills block execution.

## Hooks

- `pre-edit` checks the active spec, agent ownership, protected paths, and existing file contents.
- `pre-command` applies `allow`, `ask`, and `deny` rules to shell, package, database, deployment, and Git commands.
- `post-commit` runs the documented verification checks and never pushes.
- If the runtime cannot enforce a Markdown hook, the agent must stop and report the violation rather than claiming it was blocked.
- Claude Code uses `CLAUDE.md` and `.claude/`, which are generated from `.agents/`. `.agents/` remains the canonical source.

## Writing and code style

- Use concise, direct language.
- Follow the project's existing code style and dependency versions.
- Read existing files before editing them.
- Do not invent commands, paths, architecture facts, or test results.
- Do not add external libraries without approval and a safety check.
- Keep comments to one sentence when comments are needed.
- Do not use em dashes in writing.
- Write the minimum code that meets the spec. No extra features, options, layers, or abstractions "for later".
- Add a short doc comment on each exported function, module, and API endpoint.

## Version control and safety

- Keep commits focused and atomic.
- `/commit` must wait for explicit approval before staging and committing.
- Push only through `/pr` after its approval gate. Never force-push.
- Protect `.env*`, credentials, private keys, tokens, and generated files.
- Ask before destructive commands, migrations, dependency changes, deployment, or publishing.
- Run major changes through an approved spec first.
