# Hook: post-commit

Runs after a commit.

1. Run the verification commands documented by `AGENTS.md` and the active spec.
2. Report each check as `PASS`, `FAIL`, or `BLOCKED`.
3. Confirm the commit contains only approved files and changes.
4. Do not edit files, create an automatic follow-up commit, push, or publish.
