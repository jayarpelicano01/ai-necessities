# Stack overlay: react-native-expo-supabase

## Detected stack
React Native (Expo) + Supabase backend.

## Conventions
- App: Expo router or navigation folder; components in kebab-case.
- Supabase: `supabase/` folder with migrations and client config.
- State: check for existing state management (Zustand, Context, etc.).
- Build: `npx expo build` or `npx expo prebuild`.
- Test: `npm test`; Jest with Expo preset.
- Lint: `npm run lint`; ESLint config at root.

## Overlay rules
- No external libraries unless absolutely necessary.
- Check download safety before installing (Expo SDK + Supabase packages).
- Run major changes by the user first.
- No auto-push any branch.
- Supabase migrations: review before applying; no auto-migrate.
