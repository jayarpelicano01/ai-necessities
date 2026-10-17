# /pm <task>

Plan, diagram, and get approval before implementing any task.

## Contract

On every `/pm <task>` invocation:

1. **Analyze** the task against the Phase 1 project profile from root `AGENTS.md` (stack, architecture, conventions, build/test/lint commands).
2. **Plan** — ordered implementation steps.
3. **Diagram** — a Mermaid diagram scoped to what this task touches, plus the same flow re-rendered as plain-text ASCII box/arrow diagram directly in the response.
4. **Flow diagram** — adapt node content to the layer the task touches (UI taps/screens for client code, requests/handlers/DB calls for backend code, or both if it spans the boundary).
   - Use `╔══╗` / `╚══╝` double-border boxes for user-initiated or external-caller-initiated actions (entry/exit points).
   - Use `┌──┐` / `└──┘` single-border boxes for system steps (UI state changes, middleware, handlers, DB calls, service logic).
   - Use `┌───┐` / `└───┘` with a question inside for decision nodes (e.g. `Auth valid?`, `Cache hit?`, `Form valid?`).
   - Branch with `Yes` / `No` labels on fork lines.
   - Cover the happy path plus key edge branches visible to the caller (error states, validation failures, empty states).
   - Keep it concise: 4–12 nodes maximum.
5. **Confidence level** — a percentage (0-100%) per plan step, with a one-line reason. Any step below 90% must come with the specific clarifying question that resolves the unclear area.
6. **Approval gate** — stop here. Do not implement, edit files, or delegate to any other command until the person explicitly approves the plan.

## Agent routing

When a task spans multiple areas, delegate to each respective agent so they co-work, then hand off to tester for follow-up:
- **designer** — front-end UI/UX, screen redesigns, component layout, styling.
- **backend-architect** — database tables, schemas, API structure, server logic.
- **reviewer** — code review: style, quality, blast radius, security, conventions.
- **tester** — test generation and execution.
- **security-auditor** — security scan and audit.

## Output

Present the plan, diagrams, and confidence levels. End with: "Approve this plan before I implement anything."
