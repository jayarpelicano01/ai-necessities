# Stack overlay: react-express

## Detected stack
React front-end + Express back-end (split or monorepo).

## Conventions
- Client: `client/` or `frontend/` folder; React components in kebab-case files.
- Server: `server/` or `backend/` folder; Express routes and controllers.
- Shared types: `shared/` or `types/` folder if present.
- Build: `npm run build` (client), `npm start` or `node server/index.js` (server).
- Test: `npm test` per folder; Jest or Vitest.
- Lint: `npm run lint`; ESLint config at root or per folder.

## Overlay rules
- No external libraries unless absolutely necessary.
- Check download safety before installing.
- Run major changes by the user first.
- No auto-push any branch.
