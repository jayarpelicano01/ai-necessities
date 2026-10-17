# /test

Generate and run tests for new or changed code.

## Contract

On every `/test` invocation:

1. **Identify** changed or new files from the task scope.
2. **Generate** tests for those files if they don't exist, matching the project's test framework and patterns.
3. **Run** the project's test suite for affected files using the commands from root `AGENTS.md` (e.g. `npm test`, per-folder test scripts).
4. **Report** results — pass/fail per test file, failures with details.
5. **No auto-commit activity logs and docs.** Do not auto-push any branch.
6. **Hand off back to reviewer or the originating agent** if failures need fixing.

## Rules

- Follow AGENTS.md Code Style and General Principles.
- Use the project's test runner and dependency file for correct versions.
- Report failures; do not auto-push.

## Output

Test results: which files passed, which failed, and failure details. If no tests exist yet, report "No tests found for <files>."
