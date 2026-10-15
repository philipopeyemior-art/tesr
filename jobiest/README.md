# Jobiest redesign

Phase 2 of the Jobiest design refresh, built with Next.js 15.5, React 19, and strict TypeScript. The marketing pages are `/`, `/how-it-works`, `/pricing`, `/tools`, and `/support`. The `/styleguide` route documents the design tokens, reusable accessible components, and Jobiest product patterns.

The repository is flat: `app/`, `components/`, `mocks/`, `public/`, and `styles/` sit at the project root. The site uses the supplied Jobiest logos and locally hosted DM Sans and Space Grotesk fonts.

## Run locally

```bash
pnpm install
pnpm dev
```

Open `http://localhost:3000`.

## Build

```bash
pnpm typecheck
pnpm build
```

This is a frontend review build. Account and free-tool links open the existing public Jobiest site in a new tab. The support form is preview-only and does not send or store messages. No authentication, APIs, payment processing, or application business logic are implemented here.

The pricing preview shows the verified monthly prices and approved free-plan facts. Paid-tier allowances are omitted because current public descriptions conflict. No payments are collected in this preview.
