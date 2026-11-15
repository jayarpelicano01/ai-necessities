---
description: Prepare and execute approved focused commits without pushing
---

# /commit

Read `AGENTS.md` and the active spec before touching Git.

## Contract

1. Run `git branch --show-current` and `git status --porcelain`.
2. Read every changed file needed to understand the work.
3. Exclude secrets, generated files, unrelated changes, and files forbidden by the spec.
4. Group changes by feature or context, not only by commit type.
5. Show a table with branch, context, files, and the proposed conventional commit message.
6. Show the exact `git add` and `git commit` commands.
7. Stop and wait for explicit approval.
8. After approval, execute each focused commit sequentially and report each resulting commit SHA.
9. Never run `git push`, force-push, publish, or remote destructive commands.
10. If the spec requires a change-log entry, check that it exists before committing.

If there are no eligible changes, report `Nothing to commit.`
