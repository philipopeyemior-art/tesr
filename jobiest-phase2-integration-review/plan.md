# Jobiest redesign implementation plan

## Approved delivery status

Phase 1 is complete and approved. Phase 2 is implemented and awaiting user review. Do not start Phase 3 until explicitly approved. At this phase boundary, show what was built, where to click, decisions made, and what is needed. Do not publish, add APIs/authentication/business logic, or add dependencies.

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

The repository is already flat at its root. Keep `app/`, `components/`, `mocks/`, `public/`, and `styles/` directly at the repository root; do not introduce an additional enclosing directory.

```text
app/
  layout.tsx                   Root HTML, metadata base, brand fonts and favicon
  page.tsx                     Phase 2 home
  how-it-works/page.tsx        Three-step agent flow
  pricing/page.tsx             Honest Naira/USD pricing
  tools/page.tsx                Ten public tools index
  support/page.tsx              Topics and direct support contact
  styleguide/page.tsx           Foundation reference, not a production route
  globals.css                   Global reset, font variables and helpers
  marketing.module.css          Shared public-page layout and responsive styles
components/
  icons/                        Shared inline SVG icon set
  ui/                           Shared primitives; Dialog and Toast use the shared primitive stylesheet
  product/                      Jobiest product patterns, including activity and output examples
  marketing/                    Marketing shell, metadata helper, pricing switcher and support form/topics
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

## Phase scope and approval gates

1. **Foundation:** Complete and approved. Tokens, typography, all primitives and required states, product-specific components, and `/styleguide`.
2. **Marketing (currently approved):** `/`, `/how-it-works`, `/pricing`, `/tools`, and `/support`, with shared navigation/footer. Use product UI fragments, grounded free-tool output patterns, honest FAQs, exact production metadata, and approved copy/pricing constraints. Stop for review.
3. **Free tools:** All ten public tool routes; fully crafted scanner and job-description-analyzer input, analysis, and results patterns; the other eight follow the accessible pattern with tool-specific copy. Stop for review.
4. **App:** Signup, login, dashboard, approval review, generate flow, applications tracking, and public portfolio. The approval screen shows the employer/job, tailored CV and letter previews, evidence-based changes, and separate “Approve and send” / “Request changes” actions. Stop for review.
5. **Polish:** Blog/templates and empty/error states; responsive review at 360 px and 390 px; contrast, keyboard, accessibility, and performance pass. Stop with the complete handoff.

## Phase 1 delivered

- The exact brand tokens, contrast-safe pairings, typography, 4/8-based spacing, 10 px standard radius, 16 px card radius, 999 px pills, two shadow levels, and 150/250 ms motion tokens are in place.
- DM Sans and Space Grotesk load from local user-provided WOFF2 files through `next/font/local`; logos are the user-provided assets.
- The shared primitive library and product specimens are available on `/styleguide`.
- `/` previously served as a Phase 1 hero mock and is now replaced by the Phase 2 marketing home.
- Dialog and Toast are reusable components in `components/ui`; their CSS belongs in the shared `components/ui/primitives.module.css`, and the styleguide imports those shared components. The Dialog trigger exposes `aria-haspopup="dialog"` and `aria-controls`; the native modal supplies focus trapping and Escape handling.

## Phase 2 implementation decisions

- Home, how-it-works, pricing, tools, and support are server-rendered. Only the Naira/USD switcher remembers its choice in local storage, and the local contact form mock responds without transmitting or storing its values.
- Account and tool CTAs may open the existing production `jobiest.com` routes in a new tab until those redesign routes are delivered in later phases. Paid plan cards have no external link or checkout because the current public pricing page conflicts with the approved facts.
- The real support address is `support@jobiest.com`; support topics are Account & Login, Jobs, CV & Resume, Applications, AI Agent, Payments & Subscription, Technical Issue, and Other.
- Use these exact metadata values and route URLs:
  - `/`: title `Jobiest - Your AI Agent for the Job Search`; description `The AI agent for your job search: tell it your criteria once, add the jobs you want, and it tailors your CV and cover letter and submits after your approval. Start free.`
  - `/how-it-works`: title `How the Jobiest Agent Works in 3 Steps`; description `Three steps between you and a working job agent: build your profile, bring the jobs you want, then approve and track every send.`
  - `/pricing`: title `Pricing - Free Plan and Paid Plans in Naira - Jobiest`; description `Free plan: 3 CV or cover letter generations and 10 tool uses a day. Paid plans start at ₦5,000 a month in Nigeria or $3.99 a month globally.`
  - `/tools`: title `Free Career Tools - Jobiest`; description `Ten free career tools: ATS resume scanner, cover letter writer, job description analyzer, skills matcher, interview prep, salary insights and more.`
  - `/support`: title `Contact Support - Jobiest`; description `How can we help? Account and login, jobs, CV and resume, applications, AI agent, payments and subscriptions.`
- The approved Free limits are 3 CV or cover-letter generations and 10 tool uses per day. Verified published monthly prices are Free ₦0, Basic ₦5,000 / $3.99, Premium ₦10,000 / $7.99, and Max ₦20,000 / $14.99. The public pages conflict on paid-tier quotas and include automatic-send claims. Do not show conflicting paid limits, discounts, or any automatic-send promise. Show verified monthly prices and approved Free facts only, and disclose the omitted paid allowances in this review preview.
- The home proof area uses actual public-tool output from explicitly fictional test inputs. The ATS scanner returned 54/100 for an intentionally incomplete 47-word sample CV: no email, phone found, 3/3 standard sections, year references, weak action verbs, and 7/12 role terms matched. Label this as one fictional sample, not a typical result, benchmark, or measure of candidate worth. The Salary Insights sample used one fictional listing that omitted compensation; its exact output was “1 listing source(s) scanned. 0 stated pay. No estimates or averages are included.” Label it as a no-pay sample, not market data. Never invent or extrapolate any other ATS score, salary range, sample statistic, testimonial, or user count. Explain the scanner's deterministic checks and optional role-keyword overlap, and link directly to both real tools.
- All external preview links are safe to open in a new tab with `noopener noreferrer` and a hidden new-tab explanation. No purchase or form submission is made from the preview.
- `/styleguide` is not a production route; keep its `TODO-SEO` code comment and non-indexable metadata until final SEO copy exists.

## Remaining phases

- **Phase 3:** Implement all ten public tool routes. Each has an individually crafted input, honest working/analyzing state without fake delay, one headline result before details, a next action, related-tool links, plain-language SEO copy, and an accessible FAQ of 8–12 real questions below the interaction flow. Fully design scanner and job-description analyzer inputs, analysis, and results. Use the exact supplied titles in `TODO.md`; use current production descriptions or a `TODO-SEO` comment for genuinely new pages.
- **Phase 4:** Implement the requested app/auth/dashboard/approval/generation/application/portfolio surfaces as front-end mock examples only, with the approved review details and no real submission or authentication.
- **Phase 5:** Implement blog/templates, remaining public surfaces, and empty/error states, then complete the 360/390 px, contrast, keyboard-only, accessibility, and performance passes.

At each phase boundary, show what was built, where to click, decisions made, and what is needed. Wait for user approval before the next phase. If any ambiguity is low-risk, choose the honest option and record it; only stop to ask when blocked.
