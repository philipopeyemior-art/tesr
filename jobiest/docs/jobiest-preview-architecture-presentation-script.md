# Jobiest Preview Architecture and Template Library

## Presenter guidance

Use this as an 8 minute walkthrough for the Jobiest preview workspace. The product shown here is fictional and preview-only. Do not describe sample records as real accounts, employer submissions, provider acceptance, or inbox delivery.

## 1. Opening: one workspace, one review rule

**On screen:** `/dashboard`

**Say:**

Jobiest is organized around one simple rule: candidates review what is prepared before anything is sent. The preview workspace makes that rule visible in the dashboard, applications, documents, and portfolio surfaces.

The navigation uses one AppShell so the product feels consistent as the user moves between work areas. On desktop, the workspace sidebar recedes. On mobile, the same destinations remain available through the top menu and bottom tabs.

## 2. Command Deck dashboard

**On screen:** `/dashboard`

**Say:**

The dashboard is the command deck. It gives the user a quick view of profile strength, application pipeline, drafts waiting for review, document allowances, and the next useful action.

The page is intentionally arranged as a set of focused cards. The primary action is starting an application from a pasted job link. Approval messaging stays visible so the interface never implies that an application was sent automatically.

## 3. Preview authentication and subscription tiers

**On screen:** AppShell tier selector

**Say:**

This build includes a mock authentication state for previewing product tiers without connecting a real account. The selector stores only the chosen preview tier in local browser storage.

Free preview shows a small document allowance. Pro preview shows unlimited documents. Team preview shows a shared workspace label. These states are presentation controls only. They do not change real entitlements, billing, authentication, or access permissions.

## 4. Resume Library

**On screen:** `/templates`

**Say:**

The Resume Library contains 30 local template records. Each template has its own id, category, layout, accent, ATS flag, photo support, and column count.

The gallery supports filters for ATS-friendly templates, photo support, one-page layouts, two-column layouts, and the five visual categories. Cards use miniature resume previews so users can compare hierarchy before choosing a starting point.

The library also includes a full preview dialog. The generate flow can deep-link to any template using its local id, and selection persists only in the local draft state.

## 5. Template design system

**On screen:** first row of library cards

**Say:**

The template library is not a single card recolored 30 times. The previews use distinct compositions such as editorial headers, framed pages, timeline sections, matrix columns, executive nameplates, spotlight bands, compact structures, and photo-led layouts.

All visual directions stay inside the existing Jobiest tokens. The system uses deep navy ink, lime accents, warm surfaces, DM Sans for body text, Space Grotesk for display text, and the existing radius and shadow values.

## 6. My Documents

**On screen:** `/documents`

**Say:**

My Documents completes the review loop. The page shows four fictional documents across CV and Cover Letter types. Each card includes a mini header band using the selected template accent.

Preview opens a local document view. Download mock creates a text Blob in the browser and does not call a server. The disclosure makes that boundary clear: the content is sample material and nothing is saved or sent as a real document.

## 7. Applications tracking

**On screen:** `/applications`

**Say:**

Applications combines a four-node pipeline rail with a timeline list. The sample counts are Prepared 2, Checking 1, Sent 3, and Verified 1. The list uses fictional records with Draft, Prepared, Submitted, and Interview statuses.

The paste-link form is also local. A job URL, role title, and company create a new Draft card in memory. The form confirms that nothing was submitted, which keeps the prototype honest while still demonstrating the interaction.

## 8. Portfolio Studio

**On screen:** `/portfolios`

**Say:**

Portfolio Studio lets the user create up to six local preview portfolios. Each record contains a title, slug, template, visibility, update date, headline, about text, and skills.

The editor supports clean, bold, and editorial portfolio directions. Visibility can be switched between Private, Unlisted, and Public. The confirmation copy explains the state without claiming a real public link exists. Changes persist in local storage only.

## 9. Quality and delivery boundary

**On screen:** repository test output and screenshots

**Say:**

The preview uses automated tests for the 30-template catalog and application tracking behavior. Typecheck and production build are run before delivery. Desktop and mobile screenshots verify that the pages fit the AppShell at 1440 and 390 pixels.

The final product boundary is deliberate: fictional data, no destructive operations, no external submission, no provider claims, and no hidden account behavior.

## Closing

**Say:**

Jobiest now has a coherent preview architecture across the command deck, template library, documents, applications, and portfolio studio. Each surface demonstrates a realistic workflow while keeping sample data and real account behavior clearly separated.
