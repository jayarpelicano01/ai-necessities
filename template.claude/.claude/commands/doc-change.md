---
description: Create a project change-log entry when the project requires one
argument-hint: '<what changed>'
---

<!-- Generated from .agents/commands/doc-change.md. Edit the source, then run: node .claude/scripts/build-from-agents.mjs -->

# /doc-change <what changed>

Read `AGENTS.md` and the active spec first.

## Contract

1. Check whether the project documents a change-log convention, such as `docs/changes/` and a required entry format.
2. If no convention exists, report that no change-log convention is defined and stop. Do not invent a new folder or format.
3. If a convention exists, find the correct category, date, sequence number, file name, and required fields from the project files.
4. Read nearby entries before writing so the new entry matches the established format.
5. Create only the requested change-log entry. Do not edit code or rewrite old entries.
6. Report the created path and its contents briefly.
