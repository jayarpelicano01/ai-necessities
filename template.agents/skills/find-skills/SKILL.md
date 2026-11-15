---
name: find-skills
description: Use after project initialization or a forced rescan to find, evaluate, and locally install skills that match the repository.
---

# Find skills

This is the single skill-search workflow for AI-Necessities. Do not keep a second skill-search workflow.

## When to run

Run after `/init` during `/setup`, or during `/sync-agents` when the detected stack or recurring workflow changed, or when the command is forced.

Do not run this during `/plan-to-spec`. Planning uses only skills already installed in the project.

## Workflow

1. Read the project `AGENTS.md` in full.
2. Extract concrete search topics from the observed stack, architecture, tools, and recurring workflows.
3. Build a small set of specific queries. Examples include `firebase`, `react native testing`, `supabase RLS`, `playwright`, or `docker deployment`. Do not search every category by default.
4. Run `npx skills find <query>` for each relevant query.
5. Inspect each match. Record its source, purpose, evidence of quality, and fit with the repository. Do not recommend a result based only on its name.
6. Present the proposed skills and wait for explicit approval.
7. Install only approved skills with the project-local default of the skills CLI. Verify that each installed skill is present under the project's `.agents/skills/` directory.
8. Do not remove or replace existing skills automatically.

## Safety

- Never install a skill silently.
- Never treat a search snippet as proof that a skill works.
- If `npx skills` or the network is unavailable, report `incomplete` and let setup continue.
- If a skill source cannot be verified, mark it uncertain instead of presenting it as trusted.
- Keep global skills and project-local skills separate. This workflow installs project-local skills only.
