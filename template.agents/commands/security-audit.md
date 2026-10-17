# /security-audit

Scan new or changed code for security issues.

## Steps

1. Identify changed or new files from the task scope.
2. Check for hardcoded secrets, credentials, or API keys.
3. Check for injection points (SQL, command, script) in user-facing input.
4. Check data exposure — least privilege: is more data returned than needed?
5. Check dependency safety — run the download safety check from AGENTS.md AI Restrictions.
6. Report findings with severity and recommended fix.
7. Do not auto-fix or auto-push; stop for user approval before any changes.

## Output

A short list of findings: file, line, issue, severity, fix. If none, report "No security issues found."
