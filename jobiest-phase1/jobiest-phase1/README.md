# Jobiest redesign

Phase 1 of the Jobiest design refresh, built with Next.js 15.5, React 19, and strict TypeScript. The `/` route is a reviewable hero composition. The `/styleguide` route documents the design tokens, accessible primitives, and Jobiest product patterns.

## Run locally

```bash
pnpm install
pnpm dev
```

Open `http://localhost:3000`. The styleguide is at `/styleguide`.

## Build

```bash
pnpm typecheck
pnpm build
```

Only the Phase 1 design foundation is implemented. Auth, APIs, business logic, and later product routes are intentionally not wired in this review build.
