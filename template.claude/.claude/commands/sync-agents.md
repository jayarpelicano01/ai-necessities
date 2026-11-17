---
description: Re-scan the project, refresh the profile, and deduplicate agent guidance
argument-hint: [force]
---

<!-- Generated from .agents/commands/sync-agents.md. Edit the source, then run: node .claude/scripts/build-from-agents.mjs -->

# /sync-agents

Use when the stack, project structure, commands, or recurring workflow has changed.

## Contract

1. Read the current `AGENTS.md` and the installed `.agents/` files.
2. Re-scan top-level folders, dependency files, configuration, entry points, scripts, and CI.
3. Update `AGENTS.md` with observed facts only. Do not guess or preserve a stale command because it appeared in an old note.
4. Read every file under `.agents/` and remove duplicated facts by keeping each fact in its most specific owner.
5. Detect whether the stack or recurring workflow changed.
6. If it changed, or `$ARGUMENTS` is `force`, load `find-skills`, search for newly relevant skills, and propose additions. Never remove or replace installed skills automatically.
7. Do not install proposed skills without approval.
8. Report updated, created, removed, deduplicated, and proposed items.

Do not implement feature work during synchronization.
