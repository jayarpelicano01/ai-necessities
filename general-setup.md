---
description: One-time project bootstrap — scan, analyze, generate /pm, propose project-fit skills/commands/agents, dedupe
argument-hint: [force]
---

# /setup

Run this once per project. If `.agents/commands/pm.md` already exists and `$ARGUMENTS` is not `force`, stop and report that setup has already run rather than redoing it.

This command is stack-agnostic. It must work the same way whether the project is Flutter, React, Node.js/Express, or any other stack — nothing below should assume a specific language, framework, or architecture. All stack-specific detail comes from what Phase 1 actually observes in the codebase, never from an assumed template.

Follow these phases strictly in order. Each phase depends on the previous phase's output existing on disk — do not skip ahead or parallelize them.

---

## Phase 1 — Scan & Analyze

1. Run `/init`. This crawls the project and generates or updates the root `AGENTS.md` — treat this as the only source of discovery. Do not hand-write architecture facts before this has run; you'd be guessing at things `/init` can observe directly from the code.
2. Read the resulting `AGENTS.md` in full and extract a **project profile**: tech stack, architecture/layer pattern, state-management approach, existing conventions, build/test/lint commands, and any recurring workflow implied by the codebase (e.g. a repeated UI-fidelity task, a data-migration pattern, a deploy step).
3. Identify what "user-facing" means for this stack, since Phase 2's flow diagrams depend on it:
   - Client apps (Flutter, React, mobile/web UI) → flows are end-user interactions (taps, screens, navigation).
   - Backend services (Node.js/Express, APIs) → flows are request/response or event-driven sequences (client calls endpoint, middleware runs, DB hit, response returned).
   - Mixed-stack monorepos → identify each layer separately; a task may need one flow per affected layer, or a single flow that crosses layers at the network boundary.
4. This profile is what every later phase reasons from — do not re-derive it from scratch in Phase 2 or 3.

---

## Phase 2 — Create `/pm`

Create `.agents/commands/pm.md` (update in place if it already exists — do not create a duplicate). It must implement exactly this contract:

**On every `/pm <task>` invocation:**

1. **Analyze** the task against the Phase 1 project profile.
2. **Plan** — ordered implementation steps.
3. **Diagram** — a Mermaid diagram scoped to what this task touches (not the whole system every time).
4. **Flow diagram** — the same flow re-rendered as a plain-text ASCII box/arrow diagram directly in the response. Mermaid doesn't render in a terminal; the ASCII version is what's actually readable in a CLI session, so both are required, not one or the other. Adapt the node content to the layer the task touches (UI taps/screens for client code, requests/handlers/DB calls for backend code, or both if the task spans the boundary) — the box-drawing format below stays the same regardless of stack.

   Use this exact format:

   ```
   ### User Flow

     ╔══════════════════════════════════╗
     ║  User opens NearbyServices map   ║
     ╚══════════════════════════════════╝
                      │
                      ▼
     ┌──────────────────────────────────┐
     │  Taps a map marker               │
     └──────────────────────────────────┘
                      │
                      ▼
     ┌──────────────────────────────────┐
     │  Provider card appears at bottom │
     └──────────────────────────────────┘
                      │
                      ▼
     ╔══════════════════════════════════╗
     ║  Taps "View Details" button      ║
     ╚══════════════════════════════════╝
                      │
                      ▼
     ┌──────────────────────────────────┐
     │  Navigates to ServiceDetailsRoute│
     └──────────────────────────────────┘
   ```

   Rules:
   - Use `╔══╗` / `╚══╝` double-border boxes for user-initiated (or external-caller-initiated) actions — entry/exit points. For a backend flow this is the incoming request or triggering event, not literally a UI tap.
   - Use `┌──┐` / `└──┘` single-border boxes for system steps (UI state changes, middleware, handlers, DB calls, service logic — whatever the layer actually does).
   - Use `┌───┐` / `└───┘` with a question inside for decision nodes (e.g. `Auth valid?`, `Cache hit?`, `Form valid?`).
   - Branch with `Yes` / `No` labels on the fork lines.
   - Cover the happy path plus key edge branches visible to the caller (error states, validation failures, empty states — whatever applies to the layer in question).
   - Keep it concise: 4–12 nodes maximum.

5. **Confidence level** — a percentage (0-100%) per plan step, with a one-line reason for the score. Any step below 90% must come with the specific clarifying question that would resolve the unclear area, not a hedge — name exactly what's ambiguous (e.g. which existing service owns this logic, which state field drives the UI, what the expected error-handling behavior is) rather than a generic "needs more info."
6. **Approval gate** — stop here. Do not implement, edit files, or delegate to any other command until the person explicitly approves the plan. Presenting the plan is the end of the turn.

---

## Phase 3 — Propose project-fit skills, commands, and agents

Using the Phase 1 project profile — not a fixed or assumed template — reason about what this specific project would actually benefit from. Do not assume a Flutter, React, or Node/Express shape by default; derive it from what `/init` actually found.

- **Skills** (`.agents/skills/<name>/SKILL.md`) — for a workflow that recurs across sessions in this codebase (e.g. a UI-fidelity replication checklist for a client app, an API-contract/migration checklist for a backend service, a release checklist).
- **Commands** (`.agents/commands/<name>.md`) — for a single-purpose task entry point distinct from `/pm`'s planning role (e.g. a layer-specific implementation command, if the profile shows a clear layer split worth routing to — such as client vs. server in a monorepo, or feature-module boundaries in a single-stack app).
- **Agents** (`.agents/agents/<name>.md`) — for work worth isolating into its own context window (e.g. a reviewer subagent, a test-writer subagent, a subagent scoped to one layer of a mixed-stack repo).

Do not default to any particular set — the profile determines what's proposed, and a project with no clear layer split shouldn't get a front-end/back-end command pair just because that pattern exists elsewhere.

Present the proposed list with a one-line rationale per item and **stop for approval**. Do not create speculative infrastructure the person didn't confirm they want.

---

## Phase 4 — Duplication check

Once everything approved in Phases 2–3 has been created:

1. Read every file under `.agents/` (commands, skills, agents) plus `AGENTS.md`.
2. Identify any fact, convention, or instruction restated in more than one file.
3. Consolidate each duplicate to its single most specific owner (shared facts → `AGENTS.md` or a shared context file; layer-specific facts → that layer's file only) and replace the other occurrence with a reference rather than a restatement.
4. Report exactly what was deduplicated and where each fact now lives.
