# Jobiest redesign implementation plan

## Approved delivery status

Phases 1 and 2 are complete and approved. Phase 3 is implemented and build-validated; flattening the separately reported public GitHub repository remains pending its connector authorization. The exact repository is `https://github.com/philipopeyemior-art/tesr`. The user explicitly instructed on 2026-10-15 to finish Phase 3, proceed through Phases 4 and 5, and conclude without intermediate approval stops. Complete each phase in order and validate it before proceeding. Do not publish, add APIs/authentication/business logic, or add dependencies.

The core product rule governs every page: Jobiest prepares truthful job applications from verified experience. Unsupported claims are rejected or flagged. Nothing is sent to an employer without the user's explicit approval.

## Design direction

- **Design movement:** Calm editorial product UI with mission-control clarity, using the supplied brand palette and typography rather than decorative gradients or stock photography.
- **Core principles:** Show the work; make approval explicit; stay calm and readable; make mobile actions thumb-friendly.
- **Color philosophy:** Navy carries trust and structure. Yellow-lime is the signature accent on navy or a fill behind navy text on light surfaces, never lime text on white. Success, warning, danger, and informational colors keep their stated meanings.
- **Layout paradigm:** Left-anchored reading columns, layered product panels, and deliberate horizontal grouping. Avoid generic centered marketing grids where a clear editorial or product-led composition is more useful.
- **Signature elements:** Lime approval/action marker; evidence and activity timeline rows; restrained document-preview frames with clear page controls.
- **Interaction philosophy:** Immediate, honest feedback. Controls expose keyboard focus, disabled, loading, error, and selected states. No decorative action that pretends to submit or purchase.
- **Animation:** 150 ms micro-interactions and 250 ms transitions using ease-out; no ornamental motion. Respect `prefers-reduced-motion`.
- **Typography:** DM Sans for body/UI and Space Grotesk for display/numbers, self-hosted from the supplied WOFF2 files. Type scale 13, 14, 15, 17, 20, 24, 32, 44, 60; body line-height 1.6; display line-height 1.15; maximum body measure 68 characters. No system-font fallback.
- **Brand essence:** A calm, trustworthy job-search agent for people who want help without losing control. Personality: clear, careful, capable.
- **Brand voice:** Short, plain, warm, and honest. Examples: “Review every change before it goes to an employer.” “Your next step is ready when you are.” No em dashes, hype, fake urgency, or invented proof.
- **Wordmark and mark:** Use the supplied Jobiest assets. `wordmark-dark-transparent.png` is for navy; `wordmark-light-transparent.png` is for white/light surfaces; `mark-dark-transparent.png` is for tight spaces and favicons. No placeholder wordmark.
- **Signature brand color:** `#D7F94B`, used according to the contrast rules below.

## Technical approach

- Use the existing Next.js 15.5 App Router, React 19, strict TypeScript, custom CSS variables, and CSS modules. Do not add a component library, Tailwind, runtime CSS-in-JS, or optional dependencies.
- Use the existing single token source, `styles/tokens.css`. Keep server-rendered content as Server Components; use client components only for the remembered currency switcher and the preview-only support form in Phase 2.
- Use the single inline-SVG icon module, on a 24 px grid with 1.8 px strokes.
- Keep all requested URLs unchanged. Update `public/manus-routes.json` with implemented page routes before starting Preview.
- Preserve strict TypeScript diagnostics and build the project with no environment variables.
- Use `https://jobiest.com` as the actual public `metadataBase`; canonical and social URLs must point to that origin, never to the temporary Preview host.
- Do not publish. Save a managed review checkpoint only while automatic publication remains off.

## Project structure

The bound Manus repository is already flat at its root. Keep `app/`, `components/`, `mocks/`, `public/`, and `styles/` directly at the repository root; do not introduce an additional enclosing directory. The user-provided separate public GitHub repository is `https://github.com/philipopeyemior-art/tesr`, whose public `main` was read-only inspected at HEAD `fd76d4e`; its root contains `jobiest-phase2-integration-review/` and `jobiest-phase1/jobiest-phase1/`. Flatten only that identified external repository to one root-level copy of this completed app and remove those nested copies before treating Phase 3 as complete. Preserve public visibility and intended current files. Do not change the bound Manus remote or treat its already-flat tree as proof that the separate GitHub copy is fixed. The GitHub connector was disabled during inspection; do not mutate the external repository until connector authorization is available.

```text
app/
  layout.tsx                   Root HTML, metadata base, brand fonts and favicon
  page.tsx                     Marketing home
  how-it-works/page.tsx        Three-step agent flow
  pricing/page.tsx             Honest Naira/USD pricing
  tools/page.tsx                Ten public tools index
  support/page.tsx              Topics and direct support contact
  styleguide/page.tsx           Foundation reference, not a production route
  free-*/page.tsx               Ten public tool routes, with per-route metadata
  globals.css                   Global reset, font variables and helpers
  marketing.module.css          Shared public-page layout and responsive styles
components/
  icons/                        Shared inline SVG icon set
  ui/                           Shared primitives; Dialog and Toast use the shared primitive stylesheet
  product/                      Jobiest product patterns, including activity and output examples
  marketing/                    Marketing shell, metadata helper, pricing switcher and support form/topics
  tools/                        Shared tool form/result shell, FAQ and per-tool interaction components
  styleguide/                   Interactive design-system specimens only
styles/
  tokens.css                    Color, type, spacing, radius, shadow and motion tokens
mocks/
  support-form.ts               Preview-only response; never sends or stores a message
public/
  fonts/                        Supplied DM Sans and Space Grotesk WOFF2 files
  logos/                        Supplied light/dark wordmarks and mark
  manus-routes.json             Complete implemented-page route manifest
```

Phase 5 adds `app/blog/page.tsx`, `app/blog/[slug]/page.tsx`, `app/templates/page.tsx`, and exact public pages for about, contact, supported systems, and the source legal routes. `components/marketing/` gains a source-backed editorial reader, content-page renderer, and a small client-only template filter. `app/content/` holds the sanitized static blog, template, and public-page records. `public/sitemap.xml`, `public/robots.txt`, and `public/manus-routes.json` describe the final indexable and implemented route sets. No external runtime calls or new dependencies are introduced.

## Phase scope and approval gates

1. **Foundation:** Complete and approved. Tokens, typography, all primitives and required states, product-specific components, and `/styleguide`.
2. **Marketing:** `/`, `/how-it-works`, `/pricing`, `/tools`, and `/support`, with shared navigation/footer. Implemented and approved.
3. **Free tools (implemented and build-validated; external GitHub cleanup pending repository access):** Build `/free-ats-resume-scanner`, `/free-job-description-analyzer`, `/free-skills-matcher`, `/free-salary-insights`, `/free-interview-question-generator`, `/free-linkedin-headline-builder`, `/free-cover-letter-writer`, `/free-resume-summary-generator`, `/free-follow-up-email-writer`, and `/free-career-path-explorer`. Give each a purpose-built input, honest immediate working state without artificial delay, a result with the headline finding first, details second, and next action third, context-specific related-tool links, plain-language SEO explanation, and an accessible FAQ of 8 to 12 real questions below the interactive flow. Add FAQPage structured data and use exact production page titles; use available production descriptions, otherwise retain a `TODO-SEO` comment. Fully design ATS upload/paste input and result screen, and job-description analyzer paste input and results. Other eight tools use the same accessible pattern with their own fields, outputs, and next steps. Do not add APIs, authentication, persistence, or production business logic. Results in this frontend-only review must be honest about what the preview did or did not analyze; distinguish verified official sample output from a real calculation on user input, do not create fake delays, invented benchmarks, or unverified results.
4. **App (user authorized continuation after Phase 3):** Build `/signup`, `/login`, `/dashboard`, `/generate`, `/jobs`, `/applications`, `/approvals/[id]`, and `/portfolio/[slug]`. Auth, dashboard, generation, jobs, applications, and approval pages are front-end mock examples only and `noindex`; do not create sessions, store credentials, persist app data, or send anything. Signup title is exactly `Create Your Free Account`; signup description is `Create your Jobiest account in one step and start your AI job agent free. Google and LinkedIn signup supported.` Login and auth-gated pages reuse verified production metadata where available. Auth pages are short, one column, with the supplied wordmark, Google and LinkedIn options, email fallback, clear error states, and no upsell noise. The dashboard has approvals first, pipeline board/list, jobs feed with explicitly illustrative match scores, document shortcuts, free-plan usage limits of 3 generations and 10 tool uses without anxiety styling, and a three-step setup checklist. Approval review shows employer/job, scrollable tailored CV and cover-letter previews, what changed and why with diff-style highlights, and distinct “Approve and send” / “Request changes” actions, both preview-only. The generate flow has a CV/cover-letter builder with live local preview. Unknown approval IDs and portfolio slugs return a real 404; portfolio content is clearly sample-only and its temporary metadata is `TODO-SEO`.
5. **Polish (user authorized continuation after Phase 4):** Build `/blog` and `/blog/[slug]` from the 45 canonical live articles. Preserve exact live metadata, canonical paths, publication dates, useful content, and production taxonomy; remove or rewrite unsupported outcome figures, fabricated candidate anecdotes, stale 50-template claims, and body claims inconsistent with approval-first. Keep one H1 per page, an approximately 68-character reading measure, desktop sticky mini-TOC, related links, accessible article FAQ, Article metadata, and a real `noindex` 404 for unknown slugs. Build `/templates` from all 70 live template records with source-backed names, descriptions, IDs, layouts, suitable-for text, badges, photo/no-photo and style filters, plus source ATS/column filters. Use CSS-only, clearly labeled fictional sample previews that link to the local mock generator. Restyle `/about`, `/supported-systems`, `/contact`, `/terms`, `/privacy`, `/refund`, `/dpa`, and `/msa` with live metadata and source content; keep legal meaning unchanged, but do not repeat supported-system claims that contradict the approved policy or imply that this preview connects to employers. Add honest empty, loading, error, and not-found states; maintain one H1, canonical metadata, responsive layout at 360 px and 390 px, navy contrast, keyboard access, 44 px targets, and route manifests/sitemap/robots consistency. Run the strict TypeScript check and a production build with no environment variables. Do not publish the website. Deliver the preview and documentation without an intermediate approval stop.

## Phase 1 delivered

- The exact brand tokens, contrast-safe pairings, typography, 4/8-based spacing, 10 px standard radius, 16 px card radius, 999 px pills, two shadow levels, and 150/250 ms motion tokens are in place.
- DM Sans and Space Grotesk load from local user-provided WOFF2 files through `next/font/local`; logos are the user-provided assets.
- The shared primitive library and product specimens are available on `/styleguide`.
- `/` previously served as a Phase 1 hero mock and is now replaced by the Phase 2 marketing home.
- Dialog and Toast are reusable components in `components/ui`; their CSS belongs in the shared `components/ui/primitives.module.css`, and the styleguide imports those shared components. The Dialog trigger exposes `aria-haspopup="dialog"` and `aria-controls`; the native modal supplies focus trapping and Escape handling.

## Phase 2 implementation decisions

- Home, how-it-works, pricing, tools, and support are server-rendered. Only the Naira/USD switcher remembers its choice in local storage, and the local contact form mock responds without transmitting or storing its values.
- Account and tool CTAs may open the existing production `jobiest.com` routes in a new tab until those redesign routes are delivered in later phases. Pricing links open the live signup page in a new tab; this preview does not collect payment or create subscriptions.
- The real support address is `support@jobiest.com`; support topics are Account & Login, Jobs, CV & Resume, Applications, AI Agent, Payments & Subscription, Technical Issue, and Other.
- Use these exact metadata values and route URLs:
  - `/`: title `Jobiest - Your AI Agent for the Job Search`; description `The AI agent for your job search: tell it your criteria once, add the jobs you want, and it tailors your CV and cover letter and submits after your approval. Start free.`
  - `/how-it-works`: title `How the Jobiest Agent Works in 3 Steps`; description `Three steps between you and a working job agent: build your profile, bring the jobs you want, then approve and track every send.`
  - `/pricing`: title `Pricing - Free Plan and Paid Plans in Naira - Jobiest`; description `Free plan: 3 CV or cover letter generations and 10 tool uses a day. Paid plans start at ₦5,000 a month in Nigeria or $3.99 a month globally.`
  - `/tools`: title `Free Career Tools - Jobiest`; description `Ten free career tools: ATS resume scanner, cover letter writer, job description analyzer, skills matcher, interview prep, salary insights and more.`
  - `/support`: title `Contact Support - Jobiest`; description `How can we help? Account and login, jobs, CV and resume, applications, AI agent, payments and subscriptions.`
- Keep the Naira/USD toggle, monthly-only note, and Free facts unchanged: Free ₦0/$0, 3 CV or cover-letter generations, 10 tool uses per day. Show the user-approved monthly prices: Basic ₦5,000/$3.99; Premium ₦10,000/$7.99; Max ₦20,000/$14.99. Basic includes everything in Free, 3 AI generations/day, 2 agent-mode trial runs, 50 career-tool uses/day, Follow-up Email Writer, and priority email support. Premium includes everything in Basic, 10 AI generations/day, daily matching-job discovery, 10 agent-mode applications/day each approved by the user, unlimited career-tool uses, priority AI processing, and unlimited Salary Insights and interview prep. Max includes everything in Premium, 20 AI generations/day, 20 agent-mode applications/day, the highest daily volume for heavy runs, concierge support, and early access. Each paid card has “Choose Basic”, “Choose Premium”, or “Choose Max” linking to `https://jobiest.com/signup`. Do not invent further plan differences or claim that checkout completes in the preview.
- The home proof area uses actual public-tool output from explicitly fictional test inputs. The ATS scanner returned 54/100 for an intentionally incomplete 47-word sample CV: no email, phone found, 3/3 standard sections, year references, weak action verbs, and 7/12 role terms matched. Label this as one fictional sample, not a typical result, benchmark, or measure of candidate worth. The Salary Insights sample used one fictional listing that omitted compensation; its exact output was “1 listing source(s) scanned. 0 stated pay. No estimates or averages are included.” Label it as a no-pay sample, not market data. Never invent or extrapolate any other ATS score, salary range, sample statistic, testimonial, or user count. Explain the scanner's deterministic checks and optional role-keyword overlap, and link directly to both real tools.
- All external preview links are safe to open in a new tab with `noopener noreferrer` and a hidden new-tab explanation. No purchase or form submission is made from the preview.
- `/styleguide` is not a production route; keep its `TODO-SEO` code comment and non-indexable metadata until final SEO copy exists.

## Remaining phases

- **Carry-over fixes at Phase 3:** Delete the unused `app/home.module.css`. Complete the user's requested flattening of the separate public GitHub repository described above before claiming Phase 3 complete. The currently bound Manus workspace contains no nested copies and has no GitHub remote attached; identify and use only the user's intended authorized repository, keep it public, and do not overwrite unrelated files.
- **Phase 3:** Implement all ten public tool routes. Each has an individually crafted input, honest working/analyzing state without fake delay, one headline result before details, a next action, related-tool links, plain-language SEO copy, and an accessible FAQ of 8–12 real questions below the interaction flow. Fully design scanner and job-description analyzer inputs, analysis, and results. Use the exact supplied titles in `TODO.md`; use current production descriptions or a `TODO-SEO` comment for genuinely new pages. Do not proceed to Phase 4 before explicit Phase 3 approval.
- **Phase 4:** Implement the requested app/auth/dashboard/approval/generation/application/portfolio surfaces as front-end mock examples only, with the approved review details and no real submission or authentication.
- **Phase 5:** Implement blog/templates, remaining public surfaces, and empty/error states, then complete the 360/390 px, contrast, keyboard-only, accessibility, and performance passes.

At each phase boundary, keep the handoff notes in the work log and proceed as expressly authorized through Phases 3, 4, and 5; do not pause for intermediate approval. If any ambiguity is low-risk, choose the honest option and record it; stop only if blocked or after the final Phase 5 handoff.

## Phase 5 source-verified implementation approach

- Import the 45 canonical blog article routes from the live sitemap and use the live article records for exact titles, descriptions, dates, categories, reading times, and substantive body copy. Preserve useful general guidance, but remove or rewrite unsupported outcome statistics, fabricated candidate stories, and product claims that contradict the approved truth and approval-first policy. Render the blog index and article pages as server components, with route metadata, a 68-character reading measure, desktop sticky mini-TOC, related links, an accessible FAQ accordion, and a real 404 for unknown slugs.
- Import the 70 live template records from `/templates`; keep names, descriptions, suitable-for text, IDs, layouts, and photo/column badges grounded in the source. Render CSS-only document thumbnails with the existing fictional sample name labeled as sample. Use client-side filtering only, with style and photo support filters, and retain the source ATS/column filters. The CTA points to the local mock generator and does not imply a real document was created.
- Restyle `/about`, `/supported-systems`, `/contact`, `/terms`, `/privacy`, `/refund`, `/dpa`, and `/msa` from the current production copy and metadata. Keep legal text materially unchanged; use the existing `/support` topics and support address. Add canonical metadata based on the confirmed public origin and keep static page content in the initial HTML.
- Reuse the existing marketing shell, tokens, components, and route patterns. Do not add dependencies, API calls, authentication, persistence, or publication. Update the route manifest and navigation/footer links with every delivered route.
