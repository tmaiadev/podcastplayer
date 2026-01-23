# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Development Commands

```bash
pnpm install       # Install dependencies
pnpm dev           # Start development server
pnpm build         # Create production build
pnpm start         # Start production server
pnpm lint          # Run ESLint
pnpm test          # Run Jest tests
pnpm test:watch    # Run tests in watch mode
pnpm test:coverage # Run tests with coverage report
```

Requires Node.js v20+ and pnpm.

## Architecture Overview

### Next.js App Router Structure

This is a Next.js 16 podcast player with React 19, TypeScript, and TailwindCSS 4.

**Routing**: All routes are prefixed with `[lang]` for i18n (EN, PT, ES, FR, DE). The middleware handles language detection from Accept-Language headers.

```
/app/[lang]/page.tsx           - Home (trending by category)
/app/[lang]/cat/[catId]/       - Category browse
/app/[lang]/search/            - Podcast search
/app/[lang]/podcast/[id]/      - Podcast details + episodes
/app/[lang]/subscriptions/     - User subscriptions
```

### Key Architectural Patterns

**Server vs Client Components**: Server components are the default for data fetching. Client components (marked with `"use client"`) are used for the audio player and interactive UI elements.

**Player State**: The audio player uses React Context (`/components/player/player-context.tsx`). Access via `usePlayer()` hook. State includes current episode/podcast, playback rate, sleep timer, and playback position.

**Data Fetching**: All Podcast Index API calls go through `/lib/podcast-index/client.ts` with SHA1-based authentication. Caching is handled by `/lib/fetchWithCache.ts` with configurable strategies.

**Authentication**: Clerk handles auth via middleware. The `ClerkThemeProvider` integrates with next-themes for dark mode.

**i18n**: Translations live in `/lib/i18n/translations.ts`. The `getTranslations(lang)` function returns typed translation objects. Pass translations from layout to child components.

**Important**: When adding new UI text, always add translations for all supported languages (EN, PT, ES, FR, DE):
1. Add the new key to the `TranslationKeys` type
2. Add the translation value to each language object in the `translations` record
3. Access via `t["your.key"]` in components

### Component Organization

- `/components/ui/` - shadcn/ui primitives (Button, Card, Dialog, etc.)
- `/components/player/` - Audio player (context, mobile variant, sidebar variant)
- `/components/podcast/` - Domain components (PodcastCard, EpisodeList, etc.)
- `/components/navigation/` - Sidebar, MobileNavbar, Breadcrumbs

### Environment Variables

Required:
- `PODCAST_INDEX_API_KEY` / `PODCAST_INDEX_API_SECRET` - From podcastindex.org
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` / `CLERK_SECRET_KEY` - From clerk.com

Optional:
- `PODCAST_INDEX_CACHE_DURATION` - Cache TTL in seconds (default: 86400)
- `CUSTOM_CACHE` - Set to "true" for file-based caching instead of Next.js cache

### Testing

**Stack**: Jest 30 + React Testing Library + jest-environment-jsdom

**Configuration**:
- `jest.config.js` - Jest configuration using next/jest
- `jest.setup.tsx` - Test setup with mocks for Next.js navigation, Audio API, sessionStorage

**Test Organization**: Tests are co-located with source files in `__tests__` directories:
```
/lib/__tests__/                    - Utility function tests
/lib/breadcrumb/__tests__/         - Breadcrumb utility tests
/lib/i18n/__tests__/               - Translation tests
/components/player/__tests__/      - Player component tests
/components/podcast/__tests__/     - Podcast component tests
/components/navigation/__tests__/  - Navigation component tests
```

**What to Test**:
- Utility functions in `/lib/` (pure functions, high coverage)
- React hooks (`usePlayer`, `useMobileNavState`)
- Component rendering and user interactions
- Do NOT test `/components/ui/` (shadcn third-party) or `/convex/` (generated)

**Mocking Patterns**:
- Next.js navigation: mocked in `jest.setup.tsx`
- Audio API: MockAudio class in setup
- Child components: use `jest.mock()` for isolated unit tests

**Git Hooks** (via Husky):
- `pre-push`: Runs `pnpm test` before pushing. Push is blocked if tests fail.
