# MobilCharge Monorepo

MobilCharge is organized as a TypeScript monorepo for the web app, mobile app, backend API, and shared packages.

## Project Structure

```txt
apps/
  api/       NestJS API, Prisma, PostgreSQL
  mobile/    Expo React Native app
  web/       Next.js web app migrated from the existing React implementation
packages/
  config/    Shared TypeScript and ESLint config
  types/     Shared domain types
  ui/        Shared brand tokens and cross-platform constants
```

## Requirements

- Node.js 20 LTS recommended
- npm 10+
- PostgreSQL 14+

## Setup

```bash
npm install
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env.local
cp apps/mobile/.env.example apps/mobile/.env
npm run db:generate
npm run db:migrate
npm run db:seed
```

## Development

Run every app through Turborepo:

```bash
npm run dev
```

Run individual apps:

```bash
npm run dev:web
npm run dev:api
npm run dev:mobile
```

Default local URLs:

- Web: http://localhost:3000
- API: http://localhost:4000/api
- API health: http://localhost:4000/api/health

## Build and Quality

```bash
npm run build
npm run lint
npm run test
```

## Database

Prisma is code-first. The schema lives in `apps/api/prisma/schema.prisma`, with the initial migration in `apps/api/prisma/migrations`.

```bash
npm run db:generate
npm run db:migrate
npm run db:seed
```

Seed credentials:

- `admin@mobilcharge.ca` / `MobilCharge123!`
- `driver@mobilcharge.ca` / `MobilCharge123!`

## Migration Notes

- The web UI is preserved by moving the existing React implementation into `apps/web/src` and mounting it through a Next.js client shell.
- Existing public routes, dashboard routes, text, assets, Tailwind classes, and component markup are intentionally kept intact.
- API endpoints are configured through environment variables:
  - Web: `NEXT_PUBLIC_API_URL`
  - Mobile: `EXPO_PUBLIC_API_URL`
  - API: `DATABASE_URL`, `JWT_SECRET`, `CORS_ORIGIN`
