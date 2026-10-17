# Stack overlay: react-next

## Detected stack
Next.js (React) full-stack or front-end only.

## Conventions
- App router: `app/` folder with route handlers and page components.
- Components: `components/` folder; kebab-case file names.
- Styling: Tailwind CSS; check `tailwind.config.ts` for existing conventions.
- Build: `npm run build`; dev: `npm run dev`.
- Test: `npm test`; Jest or Vitest.
- Lint: `npm run lint`; ESLint config at root.

## Overlay rules
- No external libraries unless absolutely necessary.
- Check download safety before installing.
- Run major changes by the user first.
- No auto-push any branch.
