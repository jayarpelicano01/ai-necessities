# Hook: post-commit

Runs after a commit.

1. Run lint and test commands from AGENTS.md.
2. Skip activity logs and docs (per AGENTS.md Version Control section).
3. Report failures; do not auto-push any branch.
