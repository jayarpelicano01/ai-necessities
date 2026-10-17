# /review

Targeted code-review entry point. Reviews existing files before refactor or change, and checks agent-generated code like a junior's PR.

## Contract

On every `/review` invocation:

1. **Identify** the files under review (changed, new, or agent-generated files).
2. **Read** each file in full — never review blindly.
3. **Check against AGENTS.md** — Code Style, General Principles, Version Control, AI Restrictions.
   - Concise, short solutions; no over-engineering or oversized files needing refactor.
   - No syntax/style mismatching the rest of the codebase.
   - No obvious bugs; check blast radius of errors.
   - No emojis or special characters in comments; comments are one-liner, one sentence.
   - Markdown files use kebab naming.
4. **Check security** — no hardcoded secrets, no unsanitized input, no missing auth on routes, least-privilege data exposure.
5. **Run automated checks** — ESLint, TypeScript type check, tests — so the review focuses on logic, not style.
6. **Report findings** — file, line, issue, severity, recommended fix. Approve when good; request changes when not.
7. **No auto-push any branch.**

## Output

A short list of review findings, or "Approved" with no comments if everything passes.
