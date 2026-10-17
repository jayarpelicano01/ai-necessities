# /init

Run this once per project. It crawls the project and generates or updates the root `AGENTS.md` — the only source of discovery for stack, architecture, conventions, and commands.

This command is stack-agnostic. It assumes nothing about language, framework, or architecture. All stack-specific detail comes from what it observes in the codebase.

## Steps

1. **Crawl the project** — list top-level folders, config files, dependency files, scripts, and entry points.
2. **Detect the stack** — from dependency files and imports (e.g. package.json, pubspec.yaml, requirements.txt, go.mod, Cargo.toml).
3. **Detect the architecture/layer pattern** — from folder layout (e.g. client/server split, feature modules, src/pages + src/components, app/api).
4. **Extract conventions** — naming style, comment style, test file placement, lint/format config.
5. **Extract build/test/lint commands** — from package.json scripts, Makefile, or similar.
6. **Write or update root `AGENTS.md`** — populate only the observed facts. Do not hand-write architecture facts before this runs.

## Output

The resulting `AGENTS.md` becomes the project profile that `/setup` Phase 1 reads from. Every later phase reasons from this profile, never re-derives it from scratch.
