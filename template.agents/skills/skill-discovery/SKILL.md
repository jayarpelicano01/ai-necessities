# Skill: skill-discovery

## Purpose

Find skills relevant to the current project and propose them for user confirmation before installing. Never installs speculative infrastructure the user hasn't confirmed.

## Flow

1. Read the project profile from root `AGENTS.md` (stack, architecture, conventions).
2. Scan `.agents/skills/` for existing skills.
3. Compare project needs against available skill templates:
   - UI-fidelity checklist → for client apps with UI work
   - API-contract checklist → for backend services with API changes
   - Release checklist → for projects with deploy/release steps
   - Any other skill matching the detected stack or workflow
4. Propose the list with a one-line rationale per item.
5. Stop for user confirmation before installing any skill.
6. Install only confirmed skills into `.agents/skills/`.

## Rule

Do not default to any skill set. The project profile determines what's proposed. A project with no clear layer split shouldn't get skills just because that pattern exists elsewhere.
