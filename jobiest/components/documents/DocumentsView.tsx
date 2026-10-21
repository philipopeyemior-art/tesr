"use client";

import { useState, type CSSProperties } from "react";
import { Icon } from "@/components/icons/icons";
import { resumeTemplates } from "@/lib/resume-templates";
import styles from "./documents-view.module.css";

type DocumentItem = {
  id: string;
  title: string;
  type: "CV" | "Cover Letter";
  updated_at: string;
  template_id: string;
};

const sampleDocuments: DocumentItem[] = [
  { id: "doc-1", title: "Product Designer CV", type: "CV", updated_at: "2026-10-20", template_id: "northstar" },
  { id: "doc-2", title: "Product Designer cover letter", type: "Cover Letter", updated_at: "2026-10-18", template_id: "gridline" },
  { id: "doc-3", title: "UX Researcher CV", type: "CV", updated_at: "2026-10-14", template_id: "baseline" },
  { id: "doc-4", title: "Content Designer cover letter", type: "Cover Letter", updated_at: "2026-10-09", template_id: "clearline" },
];

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en", { month: "short", day: "numeric", year: "numeric" }).format(new Date(`${value}T12:00:00`));
}

function accentFor(templateId: string) {
  return resumeTemplates.find((template) => template.id === templateId)?.accent ?? "var(--color-lime)";
}

export function DocumentsView() {
  const [preview, setPreview] = useState<DocumentItem | null>(null);

  function downloadDocument(document: DocumentItem) {
    const body = `${document.title}\n${document.type}\n\nThis is a fictional Jobiest document preview. No account data is included.\n\nAlex Morgan\nProduct Designer\n`;
    const url = URL.createObjectURL(new Blob([body], { type: "text/plain" }));
    const anchor = window.document.createElement("a");
    anchor.href = url;
    anchor.download = `${document.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}.txt`;
    anchor.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className={styles.page}>
      <header className={styles.hero}><div><p className={styles.eyebrow}>My documents</p><h1>Keep every draft ready to review.</h1><p>Your CVs and cover letters stay together here, with a quick preview before anything is used.</p></div><div className={styles.heroCount}><strong>{sampleDocuments.length}</strong><span>fictional documents</span></div></header>
      <div className={styles.notice} role="note"><Icon name="shield" width={19} height={19} /><p><strong>Preview-only library.</strong> These documents use sample content. Preview and download are local demonstrations with no server call.</p></div>
      <section className={styles.section} aria-labelledby="documents-heading"><div className={styles.sectionHeading}><div><p className={styles.eyebrow}>Document library</p><h2 id="documents-heading">Saved documents</h2></div><span>{sampleDocuments.length} sample files</span></div><div className={styles.documentGrid}>{sampleDocuments.map((document) => <article className={styles.documentCard} key={document.id}><div className={styles.documentPreview} style={{ "--accent": accentFor(document.template_id) } as CSSProperties}><div className={styles.miniBand} /><div className={styles.miniHeader}><span /><div><b>Alex Morgan</b><small>{document.type === "CV" ? "Product Designer" : "Application letter"}</small></div></div><div className={styles.miniLines}><span /><span /><span /><span /><span /></div></div><div className={styles.cardBody}><div className={styles.cardTitleRow}><div><h3>{document.title}</h3><p>{document.type} · Updated {formatDate(document.updated_at)}</p></div><span className={styles.typePill}>{document.type}</span></div><div className={styles.cardActions}><button className={styles.secondaryButton} type="button" onClick={() => setPreview(document)}>Preview</button><button className={styles.primarySmallButton} type="button" onClick={() => downloadDocument(document)}>Download mock</button></div></div></article>)}</div></section>
      {preview ? <div className={styles.modalBackdrop} role="presentation"><section className={styles.previewModal} role="dialog" aria-modal="true" aria-labelledby="document-preview-title"><div className={styles.modalHeader}><div><p className={styles.eyebrow}>Local preview</p><h2 id="document-preview-title">{preview.title}</h2><p>{preview.type} · fictional sample</p></div><button className={styles.secondaryButton} type="button" onClick={() => setPreview(null)}>Close</button></div><div className={styles.largePreview} style={{ "--accent": accentFor(preview.template_id) } as CSSProperties}><div className={styles.largeBand} /><h3>Alex Morgan</h3><p>Product Designer · Lagos, Nigeria · alex@example.com</p><div className={styles.largeColumns}><div><b>Profile summary</b><span /><span /><span /><b>Experience</b><span /><span /><span /></div><div><b>Skills</b><span /><span /><b>Education</b><span /><span /></div></div></div><p className={styles.modalNote}>No account data is saved or sent by this preview.</p></section></div> : null}
    </div>
  );
}
