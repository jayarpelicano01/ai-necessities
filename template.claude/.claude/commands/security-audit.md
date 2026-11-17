---
description: Run the security review workflow.
---

<!-- Generated from .agents/commands/security-audit.md. Edit the source, then run: node .claude/scripts/build-from-agents.mjs -->

# /security-audit

Scan new or changed code for security issues.

## Steps

1. Read `AGENTS.md`, the active spec, and relevant installed skills.
2. Identify changed or new files from the task scope.
3. Check hardcoded secrets, credentials, tokens, unsafe input handling, injection points, missing authorization, unsafe dependencies, and excessive data exposure.
4. Use the project's documented dependency and verification commands. Do not invent a download-safety command.
5. Report file, line, severity, impact, and recommended fix.
6. Do not expose secret values, auto-fix, commit, push, or publish. Stop for approval before changes.

## Output

Return a short findings list. If none are found, report `No security issues found.`
