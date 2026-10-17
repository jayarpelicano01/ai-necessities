# Hook: pre-edit

Runs before any file edit.

1. Read the existing file(s) first — never edit blindly.
2. Confirm with the user if the change is major (new module, API surface change, database change, or >50 lines).
3. Check AGENTS.md for code style and conventions before writing.
4. No auto-commit activity logs and docs.
