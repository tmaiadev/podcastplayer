# Podcast Player

Browse trending podcasts, search across millions of shows, and explore episodes.

## Features

- Browse trending podcasts by category
- Full-text podcast search
- Multilingual support (EN, PT, ES, FR, DE)
- Responsive design with dark mode
- Episode browsing and details

## Tech Stack

- [Next.js](https://nextjs.org) 16 with App Router
- [React](https://react.dev) 19
- [TypeScript](https://www.typescriptlang.org)
- [TailwindCSS](https://tailwindcss.com) 4
- [shadcn/ui](https://ui.shadcn.com) components
- [Podcast Index API](https://podcastindex.org)
- [Drizzle ORM](https://orm.drizzle.team) with SQLite for subscriptions and listening history
- [Clerk](https://clerk.com) for authentication
- [SWR](https://swr.vercel.app) for client-side data fetching

## Prerequisites

- Node.js v20+
- pnpm package manager
- Podcast Index API credentials

## Environment Variables

Create a `.env.local` file with your API credentials:

```
PODCAST_INDEX_API_KEY=<your_api_key>
PODCAST_INDEX_API_SECRET=<your_api_secret>

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=<your_clerk_publishable_key>
CLERK_SECRET_KEY=<your_clerk_secret_key>
```

Get your Podcast Index API credentials at https://api.podcastindex.org/

Get your Clerk credentials at https://clerk.com/

## Getting Started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Create production build
- `pnpm start` - Start production server
- `pnpm lint` - Run linting
- `pnpm test` - Run tests
- `pnpm db:generate` - Generate database migrations
- `pnpm db:migrate` - Run database migrations

## License

Source-Available License. See [LICENSE](LICENSE) for details.
