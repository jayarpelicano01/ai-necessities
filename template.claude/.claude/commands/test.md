---
description: Run the project-documented tests.
---

<!-- Generated from .agents/commands/test.md. Edit the source, then run: node .claude/scripts/build-from-agents.mjs -->

# /test

Generate and run tests for new or changed code.

## Contract

On every `/test` invocation:

1. Read `AGENTS.md`, the active spec, and relevant installed skills.
2. Identify changed or new files from the task scope.
3. Generate tests only when the project's patterns and acceptance criteria support them.
4. Run the documented test commands for the affected files. Do not invent a test command.
5. Report each test file and command as `PASS`, `FAIL`, or `BLOCKED`, with useful failure details.
6. Hand failures back to the owning agent. Do not weaken assertions, delete tests, auto-fix unrelated code, commit, or push.

## Output

Return test results and remaining failures. If no applicable test exists, report `No applicable test found` and explain why.
