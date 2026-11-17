---
description: Check what you are working on against Jira, suggest the next ticket, and after approval assign it to you and set it In Progress
---

<!-- Generated from .agents/commands/jira-next.md. Edit the source, then run: node .claude/scripts/build-from-agents.mjs -->

# /jira-next

Read `AGENTS.md` before touching Jira. Uses the Atlassian tools for Jira and `git` for local work. Load the Atlassian tools with ToolSearch first if needed, and call `getAccessibleAtlassianResources` once for the `cloudId`. Get your own `accountId` with `atlassianUserInfo`.

Usage: `/jira-next`

## Contract

1. Detect current work.
   - Jira: `searchJiraIssuesUsingJql` for issues assigned to you with status In Progress (`assignee = currentUser() AND statusCategory = "In Progress"`).
   - Git: in each repo `AGENTS.md` lists, read `git -C <repo> branch --show-current`, `git -C <repo> status --porcelain`, and `git -C <repo> log -n 5 --format=%s`. Match `[A-Z]+-\d+` in uppercase.
   - Read each matched issue with `getJiraIssue` and note its status, parent, and subtasks.
2. Pick a mode.
   - **Continue** when you have an In Progress ticket or a branch or commits tied to a ticket. Compare the local changes with the ticket and its siblings. Say what looks done, what is left, and the next step. Suggest finishing it (`/verify`, `/commit`, `/pr`) or the next open ticket of the same epic.
   - **Pick new** when nothing is in progress. Go to step 3.
   - If the git state and Jira disagree (for example uncommitted work on a ticket that is not In Progress), report the mismatch and ask which one is true. Do not guess.
3. Find candidates for Pick new. Candidates are features (parents), not single tickets.
   - A feature is an epic in the project's Jira project (`AGENTS.md` names the project key). Search epics that are not Done. Use the roadmap document `AGENTS.md` points to, if there is one, for epic order and dependencies, but treat Jira as the source of truth.
   - For each epic, list its child tickets (`parent = <EPIC>`) with status and assignee. Keep epics that still have open, unassigned tickets. Prefer an epic you already work on, then the next epic in roadmap order.
   - Exclude an epic if every open ticket is assigned to someone else.
   - Check overlap. List other people's In Progress tickets. Flag an epic that has one, or whose open tickets touch the same repo area or files. Flag an epic whose dependencies are not Done.
4. Show a short table of up to 3 features: epic key, title, repo(s), open vs total tickets, why it fits, and any overlap or dependency warning. Mark one as the recommendation. Also show a one-line summary of what you detected in step 1.
   - Under the table, add a short brief for each feature, read from the epic description (`getJiraIssue`) and its child tickets:
     - **Purpose:** one sentence on what the feature gives users.
     - **Requirements:** 2 to 4 bullets (dependencies, shared pieces, acceptance points).
     - **Steps:** the child tickets in build order (backend first), one line each with key and title.
   - Keep each brief short. Do not invent details missing from Jira; say `Not in ticket` instead.
5. **Approval gate.** Stop and wait for the user to choose a feature or say no. Change nothing before approval.
6. After approval, for the chosen epic only:
   - Read its available transitions and pick the In Progress one. Never hardcode a transition ID.
   - Move the epic to In Progress with `transitionJiraIssue`. Do not assign the epic unless it is unassigned and the user approved that in the table.
   - Start its first ticket in build order that is unassigned and has no open dependency: assign it to you with the `accountId` from `atlassianUserInfo` (`editJiraIssue`), then move it to In Progress the same way.
   - Leave the other child tickets untouched. They are started one at a time with later `/jira-next` runs (Continue mode).
7. Re-read the epic and the started ticket and report their keys, assignee, and status. Suggest `/plan-to-spec <TICKET KEY>` as the next step.

## Rules

- Read-only until the approval gate. Never assign or transition anything before the user approves.
- Never touch a ticket or epic assigned to someone else, and never reassign one.
- Never move an issue backwards (for example from Done or In Progress to To Do).
- If an issue has no In Progress transition, or the transition needs required fields, stop and ask. Do not invent values.
- Do not edit titles, descriptions, or other fields.
- If no ticket qualifies, report `Nothing available to pick up.` and list what blocked the closest candidates.
- Keep the answer short. Plain language, no em dashes.
