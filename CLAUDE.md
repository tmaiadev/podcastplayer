# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Development Commands

```bash
pnpm install       # Install dependencies
pnpm dev           # Start development server
pnpm build         # Create production build
pnpm start         # Start production server
pnpm lint          # Run ESLint
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
