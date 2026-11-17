---
description: One-time project bootstrap with profile discovery and local skill matching
argument-hint: [force]
---

<!-- Generated from .agents/commands/setup.md. Edit the source, then run: node .claude/scripts/build-from-agents.mjs -->

# /setup

Run once per project after installing `.agents/`. If `.agents/setup-state.md` already exists and `$ARGUMENTS` is not `force`, report that setup already ran instead of replacing its profile or skills.

## Phase 1: Build the project profile

1. Read any existing root `AGENTS.md`.
2. Run `/init`.
3. Read the resulting `AGENTS.md` in full.
4. Extract the observed stack, architecture, conventions, entry points, dependencies, build commands, test commands, lint or format commands, deployment targets, and recurring workflows.
5. Treat this profile as the only source for project-specific facts. Do not guess missing commands, paths, or frameworks.

## Phase 2: Find matching skills

1. Load the local `find-skills` skill.
2. Build specific search queries from the project profile. Search for real needs such as Firebase, Supabase, React Native, testing, deployment, or API design. Do not search for every possible category.
3. Run the skill search and inspect the matches.
4. Present each proposed skill with its source, purpose, evidence of quality, and why it matches this repository.
5. Wait for approval before installing anything.
6. Install only approved skills into the project-local `.agents/skills/` directory.
7. If the CLI or network is unavailable, finish core setup and report skill discovery as `incomplete`. Do not invent matches.

## Phase 3: Validate the workflow

Confirm that the project can use these installed commands and agents:

- `/plan-to-spec`
- `/execute-spec <path>`
- `/sync-agents`
- `/verify`
- `/review`
- `/test`
- `/security-audit`
- `/doc-change`
- `/commit`
- `backend-engineer`
- `designer`
- `tester`
- `reviewer`
- `security-auditor`
- `researcher`

Do not create speculative commands or agents. Use the project profile and approved skills for any project-specific additions.

## Phase 4: Report

Report:

- Profile facts discovered.
- Commands and agents available.
- Skills searched, approved, installed, or skipped.
- Any missing tools or incomplete discovery.
- The next action: write a task spec with `/plan-to-spec`.

After the core setup and the skill approval step finish, write `.agents/setup-state.md` with the setup date, profile status, skill discovery status, and installed skill names. If skill discovery failed, record `incomplete` so `/sync-agents` can retry it.

Do not implement project work during setup.
