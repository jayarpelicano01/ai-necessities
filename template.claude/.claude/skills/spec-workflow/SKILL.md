---
name: spec-workflow
description: Use when planning or executing a task through an approved handoff spec. Keep planning, ownership, and execution rules in one place.
---

<!-- Generated from .agents/skills/spec-workflow/SKILL.md. Edit the source, then run: node .claude/scripts/build-from-agents.mjs -->

# Spec workflow

This is the single source of truth for `/plan-to-spec` and `/execute-spec`.

## Lifecycle

1. `/plan-to-spec` reads the repository profile and creates a complete draft in the response.
2. The user approves or changes the draft.
3. After approval, `/plan-to-spec` writes one file under `docs/specs/YYYY-MM-DD-NNN-<kebab-slug>.md` with status `approved`.
4. A fresh context runs `/execute-spec <path>`.
5. The executor validates the repository, changes the status to `in-progress`, runs the listed subagents, and appends execution results to the same file.
6. The executor marks the spec `completed` or `blocked`.

Neither command creates a second plan. The executor never silently changes the approved scope.

## Required spec sections

- Status and date
- Goal
- Non-goals
- Current project context and source files
- Assumptions and risks
- Ownership table
- Allowed files and actions per agent
- Forbidden files and actions per agent
- Required installed skills and design sources
- Dependencies and parallel work
- Exact subagent invocation brief for every assignment
- Mermaid task flow and matching ASCII flow
- Ordered implementation steps with confidence and reasons
- Handoff inputs and expected outputs
- Acceptance criteria
- Verification commands and expected results
- Fresh executor instructions
- Open questions
- Execution record, appended only by `/execute-spec`

## Ownership

- `backend-engineer`: backend, APIs, databases, integrations, and their tests.
- `designer`: frontend screens, components, styles, design tokens, and frontend tests.
- `tester`: test creation and execution after implementation.
- `reviewer`: final read-only review after tests.
- `security-auditor`: security work when required by risk or scope.
- `researcher`: read-only investigation for unresolved facts.

Cross-layer work is divided by ownership. A primary agent reads the other layer's contracts when needed but does not edit the other layer without an explicit spec assignment.

## Skills

The spec names the exact installed skills each agent must read. Missing skills block execution. Agents do not install skills during task execution.

## Hooks

Before every edit, check the spec scope, agent ownership, protected paths, and existing file contents. Before every command, apply the allow, deny, or ask rules in the command hook. After commits, run the documented verification checks. Markdown hooks are policy when the runtime has no executable hook support. Never claim a text instruction technically blocked an action.

## Verification

Use only commands documented by the repository profile or the spec. A missing prerequisite is `BLOCKED`, not `PASS`. Do not auto-fix failures or weaken tests to make them pass.
