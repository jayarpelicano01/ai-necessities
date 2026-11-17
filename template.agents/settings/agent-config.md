# Agent Settings

## Writing style

- No em dashes in any writing.
- Concise, short, direct answers unless detail is requested.
- Plain language by default. Avoid jargon unless technical depth is needed.

## Workflow

- Read `AGENTS.md` before project work.
- Read the approved spec before execution.
- Load only installed skills named by the spec.
- Use `spec-workflow` for planning and execution handoffs.
- Use `find-skills` only during setup or an approved rescan, not during task execution.

## Code quality

- Write the minimum code that meets the spec. No extra features, options, layers, or abstractions "for later".
- Do not overengineer. Prefer the simplest working solution and the existing patterns in the repo.
- Add a dependency only when the spec requires it.
- Keep code clean: clear names, small focused functions, no dead code, no duplication.
- Document properly: a short doc comment on each exported function, module, and API endpoint, plus README or `AGENTS.md` updates when behavior, commands, or setup change.

## Markdown

- Use the project's existing naming convention.
- Comments are one sentence when comments are needed.
- Keep instructions in their most specific owner. Link to shared skills instead of copying them.

## Model and context

- Match model depth to project complexity.
- Summarize before approaching context limits.
- Keep each agent focused on its assigned ownership boundary.

## Safety

- Follow `AGENTS.md` and the active spec.
- Apply `pre-edit` and `pre-command` hooks.
- Never expose secrets, push, publish, or run destructive remote commands without explicit approval. Push only through `/pr` after its approval gate.
