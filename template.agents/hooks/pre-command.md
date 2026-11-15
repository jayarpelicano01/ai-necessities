# Hook: pre-command

Runs before a shell, package-manager, database, deployment, or version-control command.

## Allow

- Read-only inspection.
- Tests, type checks, lint, formatting checks, and builds documented by `AGENTS.md` or the active spec.
- Focused local commands required by the approved spec.

## Ask first

- Installing or updating a dependency.
- Creating or applying a migration.
- Resetting or deleting local data.
- Starting a service that changes local state.
- Publishing, deploying, or changing hosted resources.
- Any command not documented by the repository or spec.

## Deny

- `git push` and force-push.
- Printing or exporting secret values.
- Reading or editing `.env*` except `.env.example`, credentials, private keys, or tokens.
- Destructive remote database or hosting commands.
- Auto-commit or auto-publish without the command's explicit approval gate.

If the runtime cannot enforce this hook, the agent must stop and report the violation instead of claiming the command was blocked.
