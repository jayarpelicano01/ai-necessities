---
description: Prepare and execute approved focused commits without pushing
---

# /commit

Read `AGENTS.md` and the active spec before touching Git.

## Scope

If `AGENTS.md` describes a multi-repo workspace, check every repo it lists, not only the current folder. Run every git command from inside the repo it applies to (`git -C <repo> ...`). Never mix files from different repos in one commit. In a single-repo project, treat the project root as the only repo.

## Contract

1. For each repo, run `git -C <repo> branch --show-current` and `git -C <repo> status --porcelain`. Skip repos with no changes.
2. Read every changed file needed to understand the work.
3. Exclude secrets, generated files, unrelated changes, and files forbidden by the spec.
4. Group changes by feature or context within each repo, not only by commit type.
5. Resolve the Jira ticket for each group when the project uses Jira (see "Jira ticket tag").
6. Show a table with repo, branch, context, files, Jira key, and the proposed conventional commit message.
7. Show the exact `git add` and `git commit` commands, each run inside its repo.
8. Stop and wait for explicit approval.
9. After approval, execute each focused commit sequentially and report each resulting commit SHA per repo.
10. Never run `git push`, force-push, publish, or remote destructive commands. Pushing belongs to `/pr`.
11. If the spec requires a change-log entry, check that it exists before committing.

If no repo has eligible changes, report `Nothing to commit.`

## Jira ticket tag

Skip this section when the project does not use Jira. Every commit that belongs to a Jira ticket must include its key. Look the ticket up in Jira, do not rely on guesses.

1. Get a candidate key from the active spec (file name or header, for example `proj-12`), the branch name, or the user. Write keys in uppercase (`PROJ-12`).
2. Check Jira with the Atlassian tools (`getJiraIssue`, or `searchJiraIssuesUsingJql` when there is no key yet). Load them with ToolSearch first if needed. Use `getAccessibleAtlassianResources` once for the `cloudId`.
3. Match each commit group to the ticket or subtask it belongs to by comparing the changed files and summary with the issue titles and descriptions. Prefer the subtask when one fits. Otherwise use the parent ticket.
4. If no ticket or subtask matches, or Jira is unavailable, ask the user. Do not invent a key. If the user says there is no ticket, omit the tag.
5. Show the matched key and its Jira title in the approval table so the user can confirm or correct it.

Message rules:

- Format: `<type>(<scope>): <KEY> <description>`, for example `feat(auth): PROJ-12 add register endpoint`.
- If the work is a subtask, use the subtask key in the subject and add `Parent: <PARENT-KEY>` in the commit body.
- If one commit covers several subtasks, list each key in the subject (`PROJ-14 PROJ-15`).
- In a cross-repo task, each repo's commit uses the key of the subtask that repo's work belongs to, and the same parent key when they share one.
- Only read from Jira. Do not transition, comment on, or edit issues.
