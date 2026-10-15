# Jobiest redesign implementation plan (draft for approval)

## Product and delivery approach

Build the requested Jobiest redesign as a runnable Next.js 15.5 App Router application using React 19, strict TypeScript, and custom CSS. Keep the scope separated into the five user-defined phases. Implement **Phase 1 only** after this plan is approved, then pause and show the result for approval before starting each subsequent phase. Do not publish or add business logic, APIs, or authentication. Use clearly named mock handlers where interactive examples need them.

The main product rule is visible throughout the design: Jobiest prepares truthful job applications from verified experience, and nothing is sent until the user approves it. The visual system should make evidence, changes, and next actions legible rather than hiding them behind generic AI language.

## Design direction

- **Design movement:** Calm, editorial product UI with mission-control clarity, using the supplied brand palette and typography rather than decorative gradients or stock photography.
- **Core principles:** Show the work; make approval explicit; stay calm and readable; make mobile actions thumb-friendly.
- **Color philosophy:** Navy carries trust and structure. Yellow-lime is a high-contrast signature accent on navy or a fill behind navy text on light surfaces, never lime text on white. Success, warning, danger, and informational colors are reserved for their stated meanings.
- **Layout paradigm:** A responsive, left-anchored reading column for content, with layered product panels and clear horizontal grouping rather than a centered marketing grid. The styleguide uses a compact navigation rail on wide screens and a stacked, scrollable flow on phones.
- **Signature elements:** Lime approval/action marker; evidence and activity timeline rows; restrained document-preview frames with clear page controls.
- **Interaction philosophy:** Immediate, honest feedback. Controls expose keyboard focus, disabled, loading, error, and selected states. Destructive or submission-like examples remain explicit and separate from draft actions.
- **Animation:** 150 ms micro-interactions and 250 ms transitions using ease-out; no ornamental motion. Disable or reduce motion under `prefers-reduced-motion`.
- **Typography:** DM Sans for body/UI and Space Grotesk for display/numbers. Use the requested type scale (13, 14, 15, 17, 20, 24, 32, 44, 60), body line-height 1.6, display line-height 1.15, and a 68-character maximum reading measure. Prefer bundled/self-hosted font assets; if those are absent, use a clearly documented, build-safe fallback approach.
- **Brand essence:** A calm, trustworthy job-search agent for people who want help without losing control. Personality: clear, careful, capable.
- **Brand voice:** Short, plain, warm, and honest. Examples: “Review every change before it goes to an employer.” “Your next step is ready when you are.” No em dashes, hype, fake urgency, or invented proof.
- **Wordmark and mark:** Use the supplied Jobiest logo files if present in the project. If unavailable, use a clearly named replaceable placeholder with the exact navy and lime colors.
- **Signature brand color:** `#D7F94B`, used according to the contrast rules above.

## Technical approach

- Use only the requested framework/runtime and the minimum dependencies required to run Next.js, React, and TypeScript in the empty project. Do not add a component library, Tailwind, runtime CSS-in-JS, or optional dependencies.
- Use a single CSS-token source plus scoped CSS modules or ordinary scoped classes. Keep client components limited to demos that require interaction; keep static content server-rendered.
- Use inline SVG icons from one shared icon module, on a 24 px grid with 1.8 px strokes.
- Keep route URLs unchanged. Begin with `/` and `/styleguide`; add the remaining requested routes in their assigned phases. Keep a complete `/manus-routes.json` manifest synchronized with implemented page routes before starting Preview.
- Set up TypeScript diagnostics before the first source edit, then inspect diagnostic results after edits. Build and serve on the project's declared runtime port, with no environment variables required.
- Do not publish. Deliver review through the current Preview and wait for approval at each phase boundary.

## Project structure

```text
app/
  layout.tsx                 Root HTML, metadata and global typography
  page.tsx                   Phase 1 landing/index with a link to the styleguide
  styleguide/page.tsx        Token and component reference
  globals.css                Global reset, font faces and layout primitives
components/
  icons/                     Shared inline SVG icon set
  ui/                        Accessible reusable primitive controls
  product/                   Jobiest-specific component examples
  styleguide/                Interactive component specimens and state demos
styles/
  tokens.css                 Color, type, spacing, radius, shadow and motion tokens
  *.module.css               Component/page styles, where scoped styles help
mocks/                       Explicit, replaceable demo handlers only
public/
  fonts/                     Bundled font files if supplied or approved/available
  logos/                     Supplied marks when available
  manus-routes.json          Complete implemented-page route manifest
```

The actual starter is empty. Adjust this layout only if the initialized Next.js project requires a small structural change; keep the same separation of responsibilities.

## Phase scope and approval gates

1. **Foundation:** Tokens, typography, all primitives and their required states, product-specific components, and `/styleguide`. The styleguide will show contrast pairs, type and spacing scales, radii, shadows, motion, component variants/states, and product-component specimens. Stop for review.
2. **Marketing:** Home, how-it-works, pricing, tools index, and support. Use product UI fragments, real free-tool output examples, honest FAQs, and the supplied copy/pricing constraints. Stop for review.
3. **Free tools:** Shared tool frame and all ten tool routes; fully crafted scanner and job-description-analyzer input, analysis, and results patterns; the other eight use the same accessible pattern with tool-specific copy. Stop for review.
4. **App:** Signup, login, dashboard, approval review, generate flow, applications tracking, and public portfolio. The approval review shows the employer/job, tailored CV and letter previews, evidence-based changes, and distinct “Approve and send” / “Request changes” actions. Stop for review.
5. **Polish:** Blog/templates and empty/error states; responsive review at 360 px and 390 px; contrast, keyboard, accessibility, and performance pass. Stop with the complete handoff.

## Phase 1 deliverables

- Token source with the exact requested brand colors, contrast-safe pairings, type scale, 4/8-based spacing, 10 px standard radius, 16 px card radius, 999 px pills, at most two shadow levels, and 150/250 ms motion tokens.
- DM Sans and Space Grotesk typography configuration, with locally hosted files when available and a documented fallback if missing.
- Reusable accessible primitives: Button (all requested variants and icon/spinner states), Input, Textarea, Select, Checkbox, Radio, Toggle, Tabs, Accordion, Badge, Chip, Tooltip, Dialog, Toast, Progress, Skeleton, Empty state, Banner (info/success/warning/error), Card, Table (with mobile card collapse), Pagination, Avatar, Dropdown menu, Breadcrumbs, and Stepper. The styleguide demonstrates default, hover, active, focus-visible, disabled, loading, and error wherever applicable.
- Product-specific specimens: ApprovalCard, AgentTimeline, JobCard, ApplicationPipelineColumn, MatchScoreRing (0–100 with honest bands), DocumentPreviewFrame with page controls, TemplateThumbnailGrid, and ToolResultHero.
- A navigable `/styleguide` page and a minimal `/` entry point so the preview has a clear route into the Foundation.

## Decisions and open items

- The project directory was empty at initialization, and the logo/font files mentioned in the brief were not present in the uploaded material. The implementation will first check for assets in the project. If the logos are still unavailable, it will use the explicitly permitted, named placeholder. If font files are unavailable, it will preserve the requested font pairing with an explicit, build-safe fallback plan and document the substitution.
- Only the required Next.js/React/TypeScript runtime packages will be added to the empty project. Optional packages require separate approval.
- The approval review will be a product specimen in Phase 1 and receive its full application workflow in Phase 4.


## Approved amendments (supersede earlier open asset notes)

1. **SEO on every page:** Every implemented route has exactly one H1, a clean H2/H3 hierarchy without skipped levels, and an exported Next.js `metadata` object with both `title` and `description`. Use the user-provided production titles exactly. For a route not in production, add a `TODO-SEO` code comment and a temporary metadata title/description to replace later. Home uses title `Jobiest - Your AI Agent for the Job Search` and the exact supplied description: `The AI agent for your job search: tell it your criteria once, add the jobs you want, and it tailors your CV and cover letter and submits after your approval. Start free.` Pricing metadata must state the real free limits (3 CV or cover letter generations and 10 tool uses a day) and paid prices (5,000 Naira or 3.99 USD a month). The other production titles supplied in the follow-up are retained in the phase plan and TODO.
2. **Real brand assets, no placeholders:** The five user-provided files are now available in `manus-assets.zip`. Install the three logos in `public/logos` and the WOFF2 files in `public/fonts`. Use `next/font/local` for DM Sans and Space Grotesk. Use `wordmark-dark-transparent.png` on navy and `wordmark-light-transparent.png` on white; use `mark-dark-transparent.png` in tight spaces. Do not use a placeholder wordmark or system font fallback.
3. **Free-tool SEO blocks:** In Phase 3, each of the ten public free-tool pages ends with a short plain-language SEO explanation and an accessible FAQ block containing 8–12 real questions, rendered as `details` or an accordion. Keep it below the interactive input/analyzing/results flow.
4. **Phase 1 home composition:** `/` is a real hero mock using the supplied wordmark, a headline, primary and secondary buttons, and one AgentTimeline row, not just a link to `/styleguide`.

Phase 1 `/styleguide` is not a production route. Add a `TODO-SEO` comment by its metadata, with a temporary title and description until final SEO copy is written. The home route uses the exact title and description above.
