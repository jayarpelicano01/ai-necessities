---
description: Run only the verification checks documented for the project
---

# /verify

Read `AGENTS.md` and the active task spec before running commands.

## Contract

1. Find the verification commands explicitly documented by the project. Use the package scripts, Makefile, CI configuration, and `AGENTS.md` as evidence.
2. Run only checks that exist and apply to the current change. Never invent `npm test`, lint, build, or database commands.
3. Run independent checks in parallel when safe. Keep destructive or state-changing checks separate and approval-gated.
4. Do not auto-fix failures.
5. Report every check as `PASS`, `FAIL`, or `SKIPPED`, with the command and useful output.
6. If a required check cannot run because a prerequisite is missing, report it as `BLOCKED`, not as a pass.

End with an overall result and the exact remaining blocker, if any.
