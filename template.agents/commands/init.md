# /init

Run this once per project. It crawls the project and generates or updates the root `AGENTS.md`, which is the only source of discovery for stack, architecture, conventions, and commands.

This command is stack-agnostic. It assumes nothing about language, framework, or architecture. All stack-specific detail comes from what it observes in the codebase.

## Steps

1. **Crawl the project** - list top-level folders, config files, dependency files, scripts, and entry points.
2. **Detect the stack** - use dependency files and imports such as `package.json`, `pubspec.yaml`, `requirements.txt`, `go.mod`, and `Cargo.toml`.
3. **Detect the architecture and layer pattern** - inspect folder layout such as client/server splits, feature modules, `src/pages` plus `src/components`, and `app/api`.
4. **Extract conventions** - record naming style, comment style, test file placement, lint configuration, and format configuration.
5. **Extract build, test, lint, and deployment commands** - use `package.json` scripts, Makefiles, CI, and equivalent project files.
6. **Write or update root `AGENTS.md`** - populate only observed facts. Do not hand-write architecture facts before this runs.

## Output

The resulting `AGENTS.md` becomes the project profile that `/setup`, `/sync-agents`, and `/plan-to-spec` read. Later workflows use this profile instead of re-deriving facts from scratch.
