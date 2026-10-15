import Image from "next/image";
import { Breadcrumbs, Card, ProgressBar, Skeleton } from "@/components/ui/primitives";
import { ApprovalCard, AgentTimeline, ApplicationPipelineColumn, JobCard, MatchScoreRing, TemplateThumbnailGrid, ToolResultHero } from "@/components/product/product-components";
import { DocumentPreviewFrame } from "@/components/product/document-preview";
import { InteractiveShowcase } from "@/components/styleguide/interactive-showcase";
import styles from "./styleguide.module.css";
import type { Metadata } from "next";

// TODO-SEO: The styleguide route is new and does not exist in production. Replace this metadata with final SEO copy when approved.
export const metadata: Metadata = {
  title: "Styleguide | Jobiest",
  description: "TODO-SEO: Jobiest design system review for colors, typography, accessible components, and product patterns.",
};

const colors = [
  { name: "Primary navy", value: "#111D35", use: "Trust, main actions, dark surfaces", className: "navy" },
  { name: "Deep navy", value: "#070D1C", use: "Depth and dark section backgrounds", className: "deep" },
  { name: "Light navy", value: "#1B2540", use: "Raised dark cards", className: "lightNavy" },
  { name: "Yellow-lime", value: "#D7F94B", use: "Action fill on navy, progress accents", className: "lime" },
  { name: "Softer lime", value: "#E9F98B", use: "Hover fill on navy", className: "softLime" },
  { name: "Ink", value: "#17223B", use: "Text on light surfaces", className: "ink" },
  { name: "Muted text", value: "#5D6B85", use: "Secondary text on white", className: "muted" },
  { name: "Line", value: "#E2E6ED", use: "Borders and separators", className: "line" },
  { name: "Success", value: "#16A34A", use: "Verified state accent", className: "success" },
  { name: "Warning", value: "#D97706", use: "Needs-attention accent", className: "warning" },
  { name: "Danger", value: "#DC2626", use: "Rejected or destructive state", className: "danger" },
  { name: "Info blue", value: "#3B72BC", use: "Links and informational accents", className: "info" },
];

const typeSizes = [13, 14, 15, 17, 20, 24, 32, 44, 60] as const;
const spacingSizes = [4, 8, 12, 16, 24, 32, 40, 48, 64, 80] as const;

export default function StyleguidePage() {
  return (
    <div className={styles.page}>
      <aside className={styles.rail}>
        <a className={styles.brand} href="/" aria-label="Jobiest home">
          <Image src="/logos/wordmark-light-transparent.png" alt="Jobiest" width={544} height={262} priority sizes="176px" />
        </a>
        <div className={styles.phaseLabel}><span>FOUNDATION</span><strong>Phase 01</strong></div>
        <nav className={styles.railNav} aria-label="Styleguide sections">
          <a href="#overview">Overview</a><a href="#tokens">Tokens</a><a href="#primitives">Primitives</a><a href="#product-patterns">Product patterns</a>
        </nav>
        <div className={styles.railNote}><span className={styles.statusDot} />Review preview<br />No applications are sent here.</div>
      </aside>

      <main className={styles.main}>
        <header className={styles.topbar}>
          <Breadcrumbs items={[{ label: "Jobiest", href: "/" }, { label: "Styleguide" }]} />
          <span className={styles.previewPill}>Design review</span>
        </header>
        <section className={styles.intro} id="overview">
          <div className={styles.introCopy}>
            <p className={styles.eyebrow}>01 / Design foundation</p>
            <h1>Trust is built into every screen.</h1>
            <p className={styles.lede}>A clear, calm system for preparing truthful job applications. People see the work, review every change, and choose what happens next.</p>
            <div className={styles.introMeta}><span><Image src="/logos/mark-dark-transparent.png" alt="" width={24} height={32} /></span><span>Approval first. Clear by default.</span></div>
          </div>
          <div className={styles.introCard}>
            <div className={styles.introCardTop}><span className={styles.cardEyebrow}>THE AGENT'S RULE</span><span className={styles.ruleIcon}><span /></span></div>
            <strong>Nothing is sent without your approval.</strong>
            <p>Every suggestion stays visible. Every decision stays yours.</p>
          </div>
        </section>

        <section className={styles.section} id="tokens" aria-labelledby="tokens-title">
          <div className={styles.sectionHeader}><div><p className={styles.eyebrow}>Foundations</p><h2 id="tokens-title">Tokens</h2></div><p>One source for brand color, type, spacing, and motion.</p></div>
          <div className={styles.tokenPanel}>
            <div className={styles.subsectionHead}><h3>Color scale</h3><p>Colors keep the interface calm and the approval action unmistakable.</p></div>
            <div className={styles.colorGrid}>{colors.map((color) => <div className={styles.colorItem} key={color.name}><span className={`${styles.swatch} ${styles[color.className as keyof typeof styles]}`} aria-hidden="true" /><div><strong>{color.name}</strong><code>{color.value}</code><small>{color.use}</small></div></div>)}</div>
            <div className={styles.contrastBlock}><h4>Contrast-tested pairs</h4><div className={styles.contrastGrid}><span className={styles.contrastLime}>Lime on primary navy <strong>14.02:1</strong></span><span className={styles.contrastSoftLime}>Soft lime on primary navy <strong>14.70:1</strong></span><span className={styles.contrastInk}>Ink on white <strong>15.81:1</strong></span><span className={styles.contrastMuted}>Muted on white <strong>5.37:1</strong></span><span className={styles.contrastInfo}>Info blue on white <strong>4.86:1</strong></span><span className={styles.contrastDanger}>Danger red on white <strong>4.83:1</strong></span></div><p>Success and warning colors mark icons, edges, and state accents. Their labels stay navy on light backgrounds.</p></div>
          </div>

          <div className={styles.tokenGrid}>
            <Card>
              <div className={styles.subsectionHead}><h3>Typography</h3><p>DM Sans for interface text. Space Grotesk for display and numbers.</p></div>
              <div className={styles.typeRows}>{typeSizes.map((size) => <div className={styles.typeRow} key={size}><span className={styles.typeSize}>{size}</span><span className={styles.typeSpecimen} style={{ fontSize: `var(--text-${size})` }}>Review before sending</span></div>)}</div>
              <div className={styles.typeNote}><span>Body line-height 1.6</span><span>Display line-height 1.15</span><span>Reading measure 68 characters</span></div>
            </Card>
            <Card>
              <div className={styles.subsectionHead}><h3>Spacing</h3><p>A 4 and 8 based rhythm, used consistently.</p></div>
              <div className={styles.spacingRows}>{spacingSizes.map((size) => <div className={styles.spacingRow} key={size}><span>{size}px</span><span style={{ width: `${Math.min(size * 2, 160)}px` }} /></div>)}</div>
            </Card>
          </div>
          <div className={styles.tokenGrid}>
            <Card>
              <div className={styles.subsectionHead}><h3>Shape and depth</h3><p>Friendly corners, light borders, two shadow levels.</p></div>
              <div className={styles.shapeRows}><div><span className={styles.radiusStandard} /><small>10px standard</small></div><div><span className={styles.radiusCard} /><small>16px card</small></div><div><span className={styles.radiusPill} /><small>999px pill</small></div><div><span className={styles.shadowOne} /><small>Shadow 1</small></div><div><span className={styles.shadowTwo} /><small>Shadow 2</small></div></div>
            </Card>
            <Card>
              <div className={styles.subsectionHead}><h3>Motion</h3><p>Short transitions. No motion is required to understand a state.</p></div>
              <div className={styles.motionRows}><div><span>Micro</span><strong>150ms</strong><i className={styles.motionShort} /></div><div><span>Transitions</span><strong>250ms</strong><i className={styles.motionLong} /></div><p>Ease-out. Reduced motion is respected.</p></div>
            </Card>
          </div>
        </section>

        <section className={styles.section} id="primitives" aria-labelledby="primitives-title">
          <div className={styles.sectionHeader}><div><p className={styles.eyebrow}>Reusable foundations</p><h2 id="primitives-title">Primitives</h2></div><p>Component states are visible, keyboard-ready, and built for the next step.</p></div>
          <Card><InteractiveShowcase /></Card>
        </section>

        <section className={styles.section} id="product-patterns" aria-labelledby="product-title">
          <div className={styles.sectionHeader}><div><p className={styles.eyebrow}>Jobiest-specific</p><h2 id="product-title">Product patterns</h2></div><p>Trust, evidence, and approval appear in the interface itself.</p></div>
          <div className={styles.patternGrid}>
            <div className={styles.patternWide}><p className={styles.specimenLabel}>ApprovalCard · sample review only</p><ApprovalCard /></div>
            <Card><p className={styles.specimenLabel}>AgentTimeline · example activity</p><AgentTimeline events={[{ verb: "Reviewed verified experience", detail: "Compared saved evidence with the role requirements.", timeLabel: "Example activity", state: "current" }]} /></Card>
            <Card><p className={styles.specimenLabel}>JobCard · sample listing</p><JobCard /></Card>
            <div className={styles.pipelinePair}><div><p className={styles.specimenLabel}>ApplicationPipelineColumn</p><ApplicationPipelineColumn title="Ready for review" items={[{ role: "Product Designer", employer: "Example employer" }]} /></div><div><p className={styles.specimenLabel}>MatchScoreRing · illustrative bands</p><MatchScoreRing score={72} /></div></div>
            <div className={styles.patternWide}><p className={styles.specimenLabel}>DocumentPreviewFrame · example pages</p><DocumentPreviewFrame title="Tailored CV" kind="CV" pages={["Example page one. Relevant experience is brought forward, and every statement remains tied to saved evidence.", "Example page two. Skills and background details remain visible for review."]} /></div>
            <Card><p className={styles.specimenLabel}>TemplateThumbnailGrid</p><TemplateThumbnailGrid /></Card>
            <div className={styles.patternWide}><p className={styles.specimenLabel}>ToolResultHero · illustrative result</p><ToolResultHero eyebrow="Example finding" metric="A clearer result, first" detail="Show one useful finding, then its evidence and next action." /></div>
          </div>
          <div className={styles.finalNote}><strong>Approval is the hero interaction.</strong><span>The full review flow is designed in a later phase. This specimen does not send an application.</span></div>
        </section>

        <footer className={styles.footer}><span>Jobiest foundation · Phase 1 review</span><span>Brand rules and assets supplied by Jobiest.</span></footer>
      </main>
    </div>
  );
}
