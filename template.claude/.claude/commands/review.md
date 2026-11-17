---
description: Review the current implementation against the approved specification.
---

<!-- Generated from .agents/commands/review.md. Edit the source, then run: node .claude/scripts/build-from-agents.mjs -->

# /review

Targeted read-only code review for changed or agent-generated files.

## Contract

On every `/review` invocation:

1. Read `AGENTS.md`, the active spec, and relevant installed skills.
2. Identify the changed, new, or assigned files.
3. Read every file under review in full.
4. Check scope, ownership, project style, existing patterns, blast radius, security, and missing tests.
5. Use `/verify` or the documented checks from `AGENTS.md`. Do not invent a lint, typecheck, build, or test command.
6. Report file, line, issue, severity, impact, and recommended fix.
7. Do not edit, auto-fix, commit, or push.

## Output

Return a short findings list. If there are no findings, report `Approved` and include the verification result.
