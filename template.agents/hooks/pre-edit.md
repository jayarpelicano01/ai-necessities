# Hook: pre-edit

Runs before every file edit.

## Check

1. Read the existing file first.
2. Read `AGENTS.md` and the active spec.
3. Confirm the assigned agent owns the file and the path is allowed by the spec. The executor may update the active spec's status and execution record.
4. Check protected files and generated folders.
5. Confirm the change does not silently cross into another agent's boundary.

## Ask first

- New modules or files.
- API, database, migration, auth, permission, or integration changes.
- Dependency or lockfile changes.
- File moves or deletes.
- Large edits, such as more than 50 changed lines.
- Any change outside the approved spec.

## Deny

- Secret values, credentials, private keys, tokens, and `.env*` except `.env.example`.
- Generated files or folders marked protected by `AGENTS.md`.
- Edits outside the assigned ownership boundary.
- Unapproved scope expansion.

If the runtime cannot enforce this hook, the agent must stop and report the violation instead of claiming the edit was blocked.
