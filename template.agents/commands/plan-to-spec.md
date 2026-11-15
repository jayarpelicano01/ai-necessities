---
description: Analyze a task and write an execution-ready spec after approval
argument-hint: '<task>'
---

# /plan-to-spec <task>

Load `skills/spec-workflow/SKILL.md` before doing anything else.

This command creates a task spec only. It does not summon subagents, edit project code, install skills, or execute the task.

## Contract

1. Read the root `AGENTS.md` and relevant project files.
2. Read the spec workflow skill.
3. Use only skills already installed in `.agents/skills/`. Do not search for or install new skills during planning.
4. Identify the task goal, non-goals, affected areas, risks, dependencies, and acceptance criteria.
5. Divide the work by ownership:
   - `backend-engineer` for backend, APIs, databases, and integrations.
   - `designer` for frontend, UI, design tokens, and frontend behavior.
   - `tester` for tests and verification.
   - `reviewer` for the final review.
   - `security-auditor` when the task touches security, secrets, auth, permissions, or untrusted input.
   - `researcher` for read-only investigation when the repository or task has an unresolved factual question.
6. Define allowed files and actions, forbidden files and actions, required skills, dependencies, parallel work, an exact invocation brief for every subagent, handoff outputs, and verification commands for every assignment.
7. Create a task flow diagram scoped to the change in both Mermaid and plain-text ASCII. Show the relevant user, external, system, validation, error, and handoff steps. Keep each flow concise.
8. Give every implementation step a confidence percentage and a reason. Any step below 90% must include the exact question that would resolve the uncertainty.
9. Show the complete draft spec in the response and ask for explicit approval.
10. Before approval, do not write files, create `docs/specs/`, summon agents, or implement anything.
11. After approval, create `docs/specs/` if needed and write the next available file as:

   `docs/specs/YYYY-MM-DD-NNN-<kebab-slug>.md`

12. Mark the written spec `approved` and stop. A fresh context must use `/execute-spec <path>` to carry it out.

The spec must be complete enough that a fresh executor can follow it without creating a second plan.
