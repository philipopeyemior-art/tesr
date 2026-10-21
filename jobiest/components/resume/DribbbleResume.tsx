import type { CSSProperties } from "react";
import type { ResumeTemplate } from "@/lib/resume-templates";
import styles from "./TemplateGallery.module.css";

type DribbbleResumeProps = {
  template: ResumeTemplate;
  size?: "mini" | "full";
};

type VisualStyle = "editorial" | "compact" | "classic" | "airy" | "spotlight" | "matrix" | "timeline" | "orbit" | "executive" | "collage" | "frame" | "signal";

const sections = ["Experience", "Selected work", "Education", "Skills", "Contact"];

const visualStyleById: Record<string, VisualStyle> = {
  northstar: "editorial",
  clearline: "compact",
  baseline: "classic",
  "quiet-space": "airy",
  lumen: "spotlight",
  gridline: "matrix",
  signal: "timeline",
  orbit: "orbit",
  daybreak: "editorial",
  momentum: "matrix",
  ledger: "classic",
  proof: "timeline",
  anchor: "compact",
  meridian: "executive",
  atelier: "collage",
  canvas: "spotlight",
  "signal-fire": "signal",
  mosaic: "matrix",
  studio: "collage",
  folio: "frame",
  crown: "executive",
  boardroom: "executive",
  summit: "classic",
  capital: "frame",
  principal: "editorial",
  legacy: "frame",
  modernist: "orbit",
  chapter: "timeline",
  "folio-plus": "collage",
  plainspoken: "airy",
};

export function DribbbleResume({ template, size = "mini" }: DribbbleResumeProps) {
  const style = { "--accent": template.accent } as CSSProperties;
  const visualStyle = visualStyleById[template.id] ?? "classic";
  return (
    <div
      className={`${styles.resumeViewport} ${size === "full" ? styles.resumeFull : styles.resumeMini}`}
      data-preview-size={size}
      data-template-id={template.id}
      data-demo="true"
      data-layout={template.layout}
      data-visual-style={visualStyle}
      style={style}
    >
      <div className={styles.resumePaper}>
        <header className={styles.resumeHeader}>
          {template.photoSupport !== "none" ? <span className={styles.resumePhoto} aria-hidden="true" /> : null}
          <div><strong>Alex Morgan</strong><span>Product Designer</span><small>Lagos, Nigeria · alex@example.com</small></div>
          <b className={styles.resumeMark} aria-hidden="true">AM</b>
        </header>
        <div className={styles.resumeIntro}><strong>Designing useful things for people and teams.</strong><span>Selected profile summary</span></div>
        <div className={styles.resumeColumns}>
          <div className={styles.resumeMain}>
            {sections.slice(0, 3).map((section) => <section className={styles.resumeSection} data-section={section.toLowerCase().replace(" ", "-")} key={section}><h3>{section}</h3><span /><span /><span className={styles.resumeLineShort} /></section>)}
          </div>
          <aside className={styles.resumeAside}>
            {sections.slice(3).map((section) => <section className={styles.resumeSection} data-section={section.toLowerCase()} key={section}><h3>{section}</h3><span /><span className={styles.resumeLineShort} /></section>)}
          </aside>
        </div>
        <div className={styles.resumeFooterMark}><span /> <small>Alex Morgan · Product Designer</small></div>
      </div>
    </div>
  );
}
