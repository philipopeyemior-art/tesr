# Jobiest redesign outcomes

## Cross-cutting requirements

- Preserve all requested URLs: `/`, `/how-it-works`, `/pricing`, `/about`, `/support`, `/supported-systems`, `/tools`, `/templates`, `/blog`, `/blog/[slug]`; the ten public free-tool routes; `/signup`, `/login`, `/dashboard`, `/generate`; jobs and applications tracking; and `/portfolio/[slug]`. Add `/styleguide` for the design system. Preserve existing metadata exports and do not change route structure.
- Use Next.js 15.5 App Router, React 19, strict TypeScript, custom CSS variables, CSS modules or scoped classes. Server Components by default. No Tailwind, component library, runtime CSS-in-JS, or new optional dependencies without approval. Add only the minimum framework/runtime dependencies required for the empty project.
- Keep APIs, authentication, and business logic out of scope. Put clearly marked mock handlers in `/mocks`.
- Use the supplied Jobiest assets: logos in `public/logos`, font files in `public/fonts`, DM Sans and Space Grotesk loaded through `next/font/local`. No placeholder wordmarks and no system-font fallbacks. Use dark wordmark on navy, light wordmark on white, and icon mark in tight spaces.
- Use the exact brand palette: primary navy `#111D35`, deep navy `#070D1C`, light navy `#1B2540`, accent yellow-lime `#D7F94B`, softer lime `#E9F98B`, ink `#17223B`, muted text `#5D6B85`, borders `#E2E6ED`, white background, success `#16A34A`, warning `#D97706`, danger `#DC2626`, info `#3B72BC`. Lime text/icons are allowed only on navy. On light surfaces use navy text and lime only as a fill behind navy text or as a chart/progress color. All text must meet WCAG 2.1 AA (4.5:1 body, 3:1 large).
- Use DM Sans for body/UI and Space Grotesk for display/numbers. Type scale 13, 14, 15, 17, 20, 24, 32, 44, 60; body line-height 1.6; display line-height 1.15; maximum body width 68 characters. Spacing uses a 4/8-based scale; radius 10px standard, 16px cards, 999px pills; maximum two shadow levels; motion 150ms micro and 250ms transitions, ease-out, with `prefers-reduced-motion` respected.
- Voice is warm, plain, honest, Grade 8. No em dashes in UI copy. No internal jargon, fabricated claims, fake testimonials, invented user counts/features, fake urgency/countdowns, stock photos of people, chatbot widgets, or cookie-banner redesign.
- Every page has exactly one H1 and a clean H2/H3 hierarchy with no skipped levels. Every route exports Next.js metadata with title and description. Use exact production titles and descriptions supplied in the request. For pages not in production, include a `TODO-SEO` comment by the temporary metadata. Preserve server-rendered content and avoid layout shift.
- Mobile-first for a mobile-heavy, Android-dominant, data-conscious audience in Nigeria. All interactive targets are at least 44px. Keep primary actions thumb-reachable. Full keyboard operation, visible focus, screen-reader labels, accessible error states, and reduced-motion support are required.
- Add one inline-SVG icon module using a 24px grid and 1.8px stroke. Use `next/image` with explicit dimensions and lazy-load below-fold images.
- Do not publish. At every phase boundary, show what was built, where to click, decisions made, and what is needed, then wait for approval before the next phase.

## Phase 1: Foundation (implemented, awaiting user review)

- Deliver the token source, typography, full primitive component set, product-specific specimens, and `/styleguide`.
- The styleguide displays the color scale with contrast-tested pairs, type scale, 4/8-based spacing, radii, shadows, motion, and component examples.
- Button has solid navy, solid lime on dark, outline, ghost, and destructive variants, icon slots, spinner/loading state, and default, hover, active, focus-visible, disabled, loading, and error demonstrations. Input, Textarea, Select, Checkbox, Radio, Toggle, Tabs, Accordion, Badge, Chip, Tooltip, Dialog with focus trap, Toast, Progress bar, Skeleton loader, Empty state, Banner (info/success/warning/error), Card, Table (mobile card collapse), Pagination, Avatar, Dropdown menu, Breadcrumbs, and Stepper are included with relevant default, hover, active, focus-visible, disabled, loading, and error states.
- Include product-specific ApprovalCard, AgentTimeline, JobCard, ApplicationPipelineColumn, MatchScoreRing from 0 to 100 with honest bands, DocumentPreviewFrame for CV/letter with page controls, TemplateThumbnailGrid, and ToolResultHero.
- `/` is a Phase 1 hero mock with the supplied real wordmark, a headline, primary and secondary buttons, and one AgentTimeline row. It must make clear that Jobiest is an agent, it works for the user, and nothing is sent without approval.
- `/styleguide` is not a production route. Add a `TODO-SEO` comment by its temporary title and description. Home uses exact metadata title `Jobiest - Your AI Agent for the Job Search` and exact description `The AI agent for your job search: tell it your criteria once, add the jobs you want, and it tailors your CV and cover letter and submits after your approval. Start free.`
- Stop after Phase 1 for user review and approval.

## Phase 2: Marketing (do not start until Phase 1 approval)

- Build `/`, `/how-it-works`, `/pricing`, `/tools`, and `/support` with the marketing Navbar and Footer. Home communicates that this is an agent, it works for the user, and nothing is sent without approval. Use one headline, primary “Create free account” CTA, secondary “Try the free tools” CTA, a three-step how-it-works section with real UI fragments, proof from the ATS scanner and salary insights outputs, all 10 free tools, a pricing teaser, an honest FAQ, and footer. No stock photos.
- Pricing has a Naira/USD toggle that remembers the last choice, three paid tiers plus free, plain-language comparison, no annual-only trickery or fake discounts, and the real free-plan facts: 3 generations and 10 tool uses per day. Paid plans start at 5,000 Naira/month in Nigeria or $3.99/month globally.
- Use exact provided metadata titles: `/how-it-works`: `How the Jobiest Agent Works in 3 Steps`; `/pricing`: `Pricing - Free Plan and Paid Plans in Naira - Jobiest`. Pricing description states 3 CV or cover letter generations and 10 tool uses a day, with paid plans from 5,000 Naira or 3.99 USD a month. Home uses its exact title and description above. For each remaining route, use production copy if it exists; mark non-production routes with `TODO-SEO` comments.
- Stop after Phase 2 for user review and approval.

## Phase 3: Free tools (do not start until Phase 2 approval)

- Build all ten public routes: `/free-ats-resume-scanner`, `/free-job-description-analyzer`, `/free-skills-matcher`, `/free-salary-insights`, `/free-interview-question-generator`, `/free-linkedin-headline-builder`, `/free-cover-letter-writer`, `/free-resume-summary-generator`, `/free-follow-up-email-writer`, and `/free-career-path-explorer`.
- Each tool gets an individually crafted input, honest working/analyzing state without fake delay, a results screen with one headline finding first and details second, and an obvious next action third. Cross-link related tools in context. Keep SEO-friendly plain-language explanation content and an FAQ accordion at the end of every page, below the interactive flow. Each FAQ contains 8–12 real questions and uses `details` or an accessible accordion. Preserve the existing FAQ structured-data pattern.
- Fully design input, analyzing, and results for the ATS scanner and job description analyzer. The scanner supports upload or pasted CV and shows its real output; the analyzer accepts a pasted job description and shows its real output. The other eight tools follow the same pattern with tool-specific fields, results, and next actions.
- Use exact provided titles: ATS scanner `Free ATS Resume Checker and Scanner`; cover letter writer `Free AI Cover Letter Writer`; job analyzer `Job Description Analyzer: Keywords and Gaps`; skills matcher `Skills Matcher: You vs the Job Description`; LinkedIn headline `LinkedIn Headline Generator for Recruiters`; salary insights `Salary Insights from Real Job Listings`; interview questions `Interview Question Generator`; career path `Career Path Explorer for Your Skills`; resume summary `Resume Summary Generator`; follow-up email `Follow-Up Email Writer for Job Applications`. Use production descriptions where available, otherwise `TODO-SEO` comments for non-production pages.
- Stop after Phase 3 for user review and approval.

## Phase 4: App (do not start until Phase 3 approval)

- Build `/signup`, `/login`, `/dashboard`, `/generate`, jobs and applications tracking, and `/portfolio/[slug]`. Keep authentication and backend behavior as mock-only front-end examples. Auth pages are short, one column, with the supplied wordmark, Google and LinkedIn buttons, email fallback, clear error states, and no upsell noise. Use exact signup title `Create Your Free Account` and production metadata for other routes where available; add `TODO-SEO` for new routes.
- Dashboard is calm mission control: greeting and one-line agent status such as “2 applications ready for your approval”; approvals are the visual priority; include pipeline board/list views, jobs feed with match scores, document shortcuts, usage meter showing 3 generations and 10 tool uses without anxiety styling, and a new-user three-step setup checklist instead of a blank state.
- Approval screen shows exactly what would be sent: employer and job, tailored CV and letter in scrollable previews, what changed and why with diff-style highlights, and distinct “Approve and send” and “Request changes” actions. No submission occurs in this mock-only scope. This is the most carefully designed application surface.
- Generate flow has CV and cover letter builder with live preview. Application tracking supports job/application review surfaces. Public portfolio uses `/portfolio/[slug]`.
- Stop after Phase 4 for user review and approval.

## Phase 5: Polish (do not start until Phase 4 approval)

- Build reading-optimized `/blog`, `/blog/[slug]`, and `/templates`, plus `/about`, `/supported-systems`, legal/support content and all remaining requested public surfaces. Blog articles have a 68-character reading measure, desktop sticky mini-TOC, and preserved FAQ accordion. Templates gallery has filters by style and photo/no-photo, fast thumbnail grid, and mobile horizontal scroll rows. Support is a clean single column and keeps topic-based contact structure.
- Add honest empty, loading, and error states across all routes. Complete responsive QA at 360px and 390px, navy contrast audit, keyboard-only walkthrough, accessibility pass, and performance pass.
- Stop after Phase 5 with a complete handoff. Do not publish.
