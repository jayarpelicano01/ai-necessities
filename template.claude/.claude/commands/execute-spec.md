---
description: Execute an approved task spec from a fresh context
argument-hint: '<path>'
---

<!-- Generated from .agents/commands/execute-spec.md. Edit the source, then run: node .claude/scripts/build-from-agents.mjs -->

# /execute-spec <path>

Load `skills/spec-workflow/SKILL.md` before doing anything else.

This command executes an approved spec. It does not create a replacement plan.

## Contract

1. Read the root `AGENTS.md` and the exact spec path.
2. Confirm the spec exists, is approved, and is inside `docs/specs/`.
3. Confirm the repository still matches the spec assumptions, paths, dependencies, and required skills.
4. If a material mismatch exists, mark the spec `blocked`, record the reason, and stop.
5. Mark the spec `in-progress` in the same file.
6. Summon only the subagents listed in the spec. Give each one its exact scope, allowed actions, forbidden actions, required skills, inputs, dependencies, and expected output.
7. Enforce the shared hooks. A subagent must stop instead of crossing its ownership boundary.
8. Run independent assignments in parallel only when the spec says they have no dependency. Respect the written order for dependent work.
9. Run the listed tester handoff after implementation work. Run the reviewer last. Run the security auditor when the spec requires it.
10. Update the same spec with changed files, handoff results, verification results, and remaining work.
11. Mark the spec `completed` only when the required implementation, tests, and review are finished. Mark it `blocked` when work cannot continue.

Do not create a second spec, silently expand the scope, install unapproved skills, push, publish, or apply destructive remote changes.

Use the `spec-workflow` skill.
