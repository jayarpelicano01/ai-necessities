---
description: Push a branch, open a pull request tagged with its Jira key, check for merge conflicts, and squash merge into main and delete the branch after approval
---

# /pr

Read `AGENTS.md` and the active spec before touching Git or GitHub. Uses the `gh` CLI for GitHub and, when the project uses Jira, the Atlassian tools.

## Scope

If `AGENTS.md` describes a multi-repo workspace, handle each repo that has a branch to ship. Run every command from inside its repo (`git -C <repo> ...`, `gh -R <owner>/<repo> ...`). One pull request per repo. For a cross-repo task, ship in the order `AGENTS.md` gives (normally backend first, then frontends). In a single-repo project, treat the project root as the only repo.

## Contract

1. For each repo, run `git -C <repo> branch --show-current` and `git -C <repo> status --porcelain`.
   - Skip repos on `main` or with no commits ahead of `origin/main`.
   - Stop and report if the working tree is dirty. Point the user to `/commit`.
2. Resolve the Jira key for each repo when the project uses Jira (see "Jira ticket tag"). Every commit on the branch should carry it.
3. Show a table: repo, branch, commits ahead, Jira key and title, proposed PR title.
4. **Approval gate 1.** Stop and wait for explicit approval to push and open the PRs.
5. Push the branch with `git -C <repo> push -u origin <branch>`. Never force-push.
6. Open the PR with `gh pr create --base main --head <branch>` (see "Pull request"). Report the PR URL.
7. Check for merge conflicts and checks (see "Conflict and readiness check").
8. If the PR is clean, show the PR URL, status, and the exact squash merge command, then **Approval gate 2.** Stop and wait for explicit approval to merge.
9. After approval, squash merge and delete the branch (see "Squash merge"), then report the merge commit SHA per repo.
10. Never merge a PR that has conflicts, failing checks, or a blocked state. Never use `--admin`, `--force`, or any flag that bypasses branch protection.

## Jira ticket tag

Skip this section when the project does not use Jira.

1. Get a candidate key from the branch name, the commit messages, the active spec (file name or header, for example `proj-12`), or the user. Use uppercase (`PROJ-12`).
2. Verify it in Jira with `getJiraIssue`, or find it with `searchJiraIssuesUsingJql` when there is no key. Load the tools with ToolSearch first if needed. Use `getAccessibleAtlassianResources` once for the `cloudId`.
3. Prefer the subtask the repo's work belongs to. Otherwise use the parent ticket.
4. If nothing matches or Jira is unavailable, ask the user. Do not invent a key. If the user says there is no ticket, omit the tag.
5. Only read from Jira. Do not transition, comment on, or edit issues unless the user asks.

## Pull request

- Title: `<type>(<scope>): <KEY> <description>`, for example `feat(auth): PROJ-12 add register endpoint`. For a subtask use the subtask key. For several subtasks list each key.
- Body, in this order:
  - `Jira: <KEY> <Jira issue title>` with the issue link. For a subtask add `Parent: <PARENT-KEY>`.
  - `Spec: <spec file path>` when a spec exists.
  - A short summary of what changed and why.
  - How it was checked, using only the checks documented in the repo's `AGENTS.md`.
  - For cross-repo work, links to the sibling PRs.
- End the body with the attribution line required by the session instructions.

## Conflict and readiness check

1. Run `gh pr view <number> --json mergeable,mergeStateStatus,statusCheckRollup,reviewDecision`.
2. If `mergeable` is `UNKNOWN`, wait a few seconds and check again. GitHub computes it in the background.
3. Decide:
   - `MERGEABLE` and `CLEAN` (or `HAS_HOOKS`): ready. Continue to approval gate 2.
   - `CONFLICTING` or `DIRTY`: stop. List the conflicting files from `git -C <repo> merge-tree` or `git -C <repo> diff --name-only --diff-filter=U` after a local `git merge origin/main` check that is aborted afterwards. Do not resolve conflicts or rebase on your own. Ask the user how to proceed.
   - Failing or pending checks, `BLOCKED`, or review required: stop and report the reason. Do not merge.
4. Report the result per repo before asking for approval.

## Squash merge

Run only after approval gate 2:

```
gh pr merge <number> --squash --delete-branch --subject "<PR title> (#<number>)" --body "<Jira line, Parent line, short summary>"
```

- The squash subject keeps the Jira key so one clean commit lands on `main`.
- `--delete-branch` removes the merged branch locally and on GitHub. Approval gate 2 covers this, so state it when asking.
- After merging, update local `main` with `git -C <repo> switch main` and `git -C <repo> pull --ff-only`.
- For cross-repo work, wait for each merge to finish before the next repo.

If there are no eligible branches, report `Nothing to ship.`

## After the merge

When the project uses Jira, suggest running `/jira-done` so the merged tickets can be marked Done. Do not run it automatically.
