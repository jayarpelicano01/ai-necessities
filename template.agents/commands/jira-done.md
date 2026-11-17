---
description: Move merged Jira tickets to Done after approval
---

# /jira-done

Read `AGENTS.md` before touching Jira. Uses the `gh` CLI for GitHub and the Atlassian tools for Jira. Run it after `/pr` has merged.

Usage: `/jira-done [KEY ...] [--comment]`

## Contract

1. Collect candidate keys.
   - Keys given by the user, or
   - Keys found in the latest merge commits on `main` of each repo `AGENTS.md` lists (`git -C <repo> log -n 10 --format=%s main`). Match `[A-Z]+-\d+` in uppercase.
2. Confirm each key is really merged: `gh pr view <number> -R <owner>/<repo> --json state,mergeCommit`. Skip any key whose PR is not `MERGED` and report why.
3. Read each issue with `getJiraIssue` (load tools with ToolSearch first if needed, and use `getAccessibleAtlassianResources` once for the `cloudId`). Note its status and its parent.
4. Apply the parent rule: a parent is eligible only when every one of its subtasks is Done or is in this run. Otherwise leave it and list the open subtasks.
5. Show a table: key, title, current status, target `Done`, and the merged PR that proves it.
6. **Approval gate.** Stop and wait for explicit approval. Change only the keys in the approved table.
7. For each approved key, find the Done transition with the issue's available transitions, then call `transitionJiraIssue`. Never hardcode a transition ID. Do subtasks first, then the parent.
8. Only with `--comment`, add one comment per issue with `addOrEditJiraIssueComment`: the PR link and merge commit SHA.
9. Report the final status of each key.

## Rules

- Never transition an issue whose PR is not merged.
- Never move an issue backwards (for example from Done to In Progress).
- If an issue has no Done transition, or the transition needs required fields, stop and ask. Do not invent values.
- If an issue is already Done, skip it and say so.
- Do not edit issue fields, assignees, or descriptions.
- If no key qualifies, report `Nothing to close.`
