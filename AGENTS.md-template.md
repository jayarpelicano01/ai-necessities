
# AGENTS.md

## How to plug into a new project

1. Copy this `AI-Necessities/template.agents/` folder into the target project as `.agents/`.
2. Run `/setup` once. It crawls the project, generates/updates this root `AGENTS.md`, and proposes project-fit skills, commands, and agents.
3. Approve the proposal before anything is created.
4. Optional: drop in a stack overlay from `template.agents/overlays/` (react-express, react-next, react-native-expo-supabase) before running `/setup`.

---

## Set up Commands

- `/setup` — one-time project bootstrap: scan, analyze, generate `/pm`, propose project-fit skills/commands/agents, dedupe. Run once per project.
- `/init` — crawls the project and generates/updates the root `AGENTS.md` with discovered facts only (stack, architecture, conventions, build/test/lint commands). Stack-agnostic; assumes nothing.
- `/pm <task>` — analyze task against the project profile, plan ordered steps, diagram with Mermaid + ASCII flow, confidence levels per step, then stop for approval before implementing.
- `/review` — targeted code-review entry point.
- `/test` — generate/run tests for changed files.
- `/security-audit` — scan for security issues in changed or new code.

---

## Code Style

- Generate concise, short solutions for new modules or code.
- Watch for over-engineering and oversized files needing refactor.
- Watch for weird syntax/style mismatching the rest of the codebase.
- Watch for obvious bugs and blast radius of errors.
- No emojis or special characters in comments.
- Write activity-log.md in /docs to refer back if confused.
- Markdown files use kebab naming (e.g. `some-description-changes.md`).
- Comments: one-liner, one sentence.

---

## General Principles

- Right data structures and algorithms for the problem.
- Don't expose data needlessly (least privilege).
- No external libraries unless absolutely necessary.
- Use project dependency file for correct versions.
- Avoid redundancy unless it improves usability.
- Run major changes by the user first; do not execute blindly.
- Review existing files before refactor or change.

---

## Version Control

- Commit after significant changes, clear messages.
- Keep commits focused and atomic.
- No auto-push any branch.
- Don't auto-commit activity logs and docs.

---

## AI Restrictions

- Always check npm/yarn/pub/download safety before installing external libraries.
- No auto-push any branch.
- Run major changes by the user first; do not execute blindly.
- Review existing files before any edit.
- No em dashes in any writing. Zero tolerance.
- Keep responses concise and direct unless detail is requested.

---

## Agent Routing (workflow)

When a task arrives:

1. **Analyze** what areas it touches (UI, database, API, security, tests).
2. **Route** to the respective agent per area:
   - **designer** — front-end UI/UX, screen redesigns, component layout, styling.
   - **backend-architect** — database tables, schemas, API structure, server logic.
   - **reviewer** — code review: style, quality, blast radius, security, conventions.
   - **tester** — test generation and execution.
   - **security-auditor** — security scan and audit.
3. **If multiple areas** (e.g. creating tables AND redesigning the main screen), delegate to each respective agent so they co-work in parallel on their slice.
4. **Tester follows up** — after all agents finish their slice, the tester generates and runs tests for everything that changed.
5. **Reviewer checks** — the reviewer reviews the combined output against AGENTS.md.
6. **Approval gate** — stop before implementing. Present the plan and wait for explicit approval. No auto-execute, no auto-push.

## Agent handoffs

- designer ↔ backend-architect: co-work when a task spans UI + backend/database; hand off to tester after.
- security-auditor → tester: if audit findings require code changes, tester re-runs tests after fixes.
- reviewer → approval: reviewer signs off before anything is committed or pushed.
