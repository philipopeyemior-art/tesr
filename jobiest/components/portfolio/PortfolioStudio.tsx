"use client";

import { useEffect, useMemo, useState } from "react";
import { Icon } from "@/components/icons/icons";
import { portfolioTemplates, samplePortfolios, type Portfolio, type PortfolioTemplate, type PortfolioVisibility } from "@/lib/portfolio-data";
import styles from "./portfolio-studio.module.css";

const storageKey = "jobiest-preview-portfolios";
const visibilityOptions: { id: PortfolioVisibility; label: string }[] = [
  { id: "PRIVATE", label: "Private" },
  { id: "UNLISTED", label: "Unlisted" },
  { id: "PUBLIC", label: "Public" },
];

type Draft = Omit<Portfolio, "id" | "updated_at">;

const emptyDraft: Draft = {
  slug: "new-portfolio",
  title: "New portfolio",
  template_id: "clean",
  visibility: "PRIVATE",
  headline: "",
  about: "",
  skills: [],
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en", { month: "short", day: "numeric", year: "numeric" }).format(new Date(`${value}T12:00:00`));
}

function visibilityCopy(visibility: PortfolioVisibility) {
  if (visibility === "PUBLIC") return "Published: it now has a public link.";
  if (visibility === "UNLISTED") return "Unlisted: reachable by link only.";
  return "Back to private";
}

function slugify(value: string) {
  return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || "new-portfolio";
}

function PortfolioPreview({ portfolio, compact = false }: { portfolio: Portfolio; compact?: boolean }) {
  return (
    <div className={`${styles.portfolioPreview} ${compact ? styles.portfolioPreviewCompact : styles.portfolioPreviewFull}`} data-portfolio-template={portfolio.template_id}>
      <div className={styles.previewTopline}><span>{portfolio.template_id}</span><span>{portfolio.visibility === "PUBLIC" ? "Public" : "Preview"}</span></div>
      <div className={styles.previewIdentity}><span className={styles.previewAvatar}>AM</span><div><p>Alex Morgan</p><h3>{portfolio.headline || "A clear headline goes here."}</h3></div></div>
      <p className={styles.previewAbout}>{portfolio.about || "A short introduction will appear here."}</p>
      <div className={styles.previewSkills}>{portfolio.skills.slice(0, 3).map((skill) => <span key={skill}>{skill}</span>)}</div>
      <div className={styles.previewWork}><span /><span /><span /></div>
    </div>
  );
}

function PortfolioEditor({ draft, editing, onChange, onClose, onSave }: { draft: Draft; editing: boolean; onChange: (next: Draft) => void; onClose: () => void; onSave: () => void }) {
  return (
    <div className={styles.modalBackdrop} role="presentation">
      <section className={styles.editorModal} role="dialog" aria-modal="true" aria-labelledby="portfolio-editor-title">
        <div className={styles.editorHeader}><div><p className={styles.eyebrow}>Portfolio editor</p><h2 id="portfolio-editor-title">{editing ? "Shape your portfolio" : "Create a portfolio"}</h2><p>Preview only. Your draft stays in this browser.</p></div><button className={styles.closeButton} type="button" onClick={onClose} aria-label="Close portfolio editor">Close</button></div>
        <div className={styles.editorForm}>
          <label>Portfolio title<input value={draft.title} onChange={(event) => onChange({ ...draft, title: event.target.value, slug: slugify(event.target.value) })} /></label>
          <label>Headline<input value={draft.headline} placeholder="What do you want people to remember?" onChange={(event) => onChange({ ...draft, headline: event.target.value })} /></label>
          <label>About<textarea value={draft.about} rows={4} placeholder="Write a short introduction from details you can support." onChange={(event) => onChange({ ...draft, about: event.target.value })} /></label>
          <label>Skills <span className={styles.fieldHint}>Comma separated</span><input value={draft.skills.join(", ")} placeholder="Product design, Research, Accessibility" onChange={(event) => onChange({ ...draft, skills: event.target.value.split(",").map((skill) => skill.trim()).filter(Boolean) })} /></label>
          <label>Template<select value={draft.template_id} onChange={(event) => onChange({ ...draft, template_id: event.target.value as PortfolioTemplate })}>{portfolioTemplates.map((template) => <option value={template.id} key={template.id}>{template.label} · {template.note}</option>)}</select></label>
          <fieldset className={styles.visibilityField}><legend>Visibility</legend><div className={styles.visibilitySegment}>{visibilityOptions.map((option) => <button className={draft.visibility === option.id ? styles.visibilityActive : ""} type="button" key={option.id} onClick={() => onChange({ ...draft, visibility: option.id })}>{option.label}</button>)}</div><p>{visibilityCopy(draft.visibility)}</p></fieldset>
        </div>
        <div className={styles.editorActions}><button className={styles.cancelButton} type="button" onClick={onClose}>Cancel</button><button className={styles.primaryButton} type="button" onClick={onSave}>{editing ? "Save changes" : "Create portfolio"}</button></div>
      </section>
    </div>
  );
}

function PreviewModal({ portfolio, onClose }: { portfolio: Portfolio; onClose: () => void }) {
  return <div className={styles.modalBackdrop} role="presentation"><section className={styles.previewModal} role="dialog" aria-modal="true" aria-labelledby="portfolio-preview-title"><div className={styles.editorHeader}><div><p className={styles.eyebrow}>Local preview</p><h2 id="portfolio-preview-title">{portfolio.title}</h2></div><button className={styles.closeButton} type="button" onClick={onClose}>Close</button></div><PortfolioPreview portfolio={portfolio} /><p className={styles.previewDisclosure}>This is a fictional preview. No portfolio is published or sent from this workspace.</p></section></div>;
}

export function PortfolioStudio() {
  const [portfolios, setPortfolios] = useState<Portfolio[]>(samplePortfolios);
  const [editorOpen, setEditorOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draft, setDraft] = useState<Draft>(emptyDraft);
  const [previewPortfolio, setPreviewPortfolio] = useState<Portfolio | null>(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(storageKey);
      if (stored) setPortfolios(JSON.parse(stored) as Portfolio[]);
    } catch {
      setPortfolios(samplePortfolios);
    }
  }, []);

  useEffect(() => {
    try { window.localStorage.setItem(storageKey, JSON.stringify(portfolios)); } catch { /* Preview persistence is best effort only. */ }
  }, [portfolios]);

  const publicCount = useMemo(() => portfolios.filter((portfolio) => portfolio.visibility === "PUBLIC").length, [portfolios]);

  function openCreate() {
    setEditingId(null);
    setDraft({ ...emptyDraft, title: `Portfolio ${portfolios.length + 1}`, slug: `portfolio-${portfolios.length + 1}` });
    setMessage("");
    setEditorOpen(true);
  }

  function openEdit(portfolio: Portfolio) {
    setEditingId(portfolio.id);
    setDraft({ slug: portfolio.slug, title: portfolio.title, template_id: portfolio.template_id, visibility: portfolio.visibility, headline: portfolio.headline, about: portfolio.about, skills: portfolio.skills });
    setMessage("");
    setEditorOpen(true);
  }

  function saveDraft() {
    const today = new Date().toISOString().slice(0, 10);
    if (editingId) {
      setPortfolios((current) => current.map((portfolio) => portfolio.id === editingId ? { ...portfolio, ...draft, updated_at: today } : portfolio));
      setMessage(`${draft.title} updated. ${visibilityCopy(draft.visibility)}`);
    } else {
      const newPortfolio: Portfolio = { id: `portfolio-preview-${Date.now()}`, ...draft, updated_at: today };
      setPortfolios((current) => [newPortfolio, ...current]);
      setMessage(`${draft.title} created. ${visibilityCopy(draft.visibility)}`);
    }
    setEditorOpen(false);
  }

  function removeMessage() { if (message) setMessage(""); }

  return (
    <div className={styles.studio} onClick={removeMessage}>
      <header className={styles.hero}><div><p className={styles.eyebrow}>Portfolio Studio</p><h1>Make your work easy to remember.</h1><p>Build a shareable portfolio from your verified story, then choose exactly who can see it.</p></div><div className={styles.heroStats}><strong>{portfolios.length}</strong><span>of 6 preview portfolios</span><strong>{publicCount}</strong><span>public link{publicCount === 1 ? "" : "s"}</span></div></header>
      {message ? <div className={styles.statusMessage} role="status"><Icon name="check-circle" width={19} height={19} /><span>{message}</span></div> : null}
      <section className={styles.toolbar} aria-label="Create portfolio"><div><label htmlFor="portfolio-search">Create a new portfolio</label><p>Start from a local preview template. No account data is used.</p></div><div className={styles.createControls}><input id="portfolio-search" placeholder="Portfolio title" onChange={(event) => setDraft((current) => ({ ...current, title: event.target.value, slug: slugify(event.target.value) }))} /><select aria-label="New portfolio template" value={draft.template_id} onChange={(event) => setDraft((current) => ({ ...current, template_id: event.target.value as PortfolioTemplate }))}>{portfolioTemplates.map((template) => <option value={template.id} key={template.id}>{template.label}</option>)}</select><button className={styles.primaryButton} type="button" disabled={portfolios.length >= 6} onClick={openCreate}><Icon name="spark" width={17} height={17} />Create portfolio</button></div></section>
      <div className={styles.sectionHeading}><div><p className={styles.eyebrow}>Your library</p><h2>Portfolio drafts and links</h2></div><span>{portfolios.length} saved in this browser</span></div>
      {portfolios.length === 0 ? <div className={styles.emptyState}><p className={styles.eyebrow}>Start with a blank page</p><h2>Your next portfolio can live here.</h2><p>Create a local preview and shape the story before sharing it.</p><button className={styles.primaryButton} type="button" onClick={openCreate}>Create portfolio</button></div> : <div className={styles.portfolioGrid}>{portfolios.map((portfolio) => <article className={styles.portfolioCard} key={portfolio.id}><PortfolioPreview portfolio={portfolio} compact /><div className={styles.cardBody}><div className={styles.cardTitleRow}><div><h3>{portfolio.title}</h3><p>Updated {formatDate(portfolio.updated_at)}</p></div><span className={`${styles.visibilityBadge} ${styles[`visibility${portfolio.visibility}`]}`}>{portfolio.visibility}</span></div><div className={styles.cardSkills}>{portfolio.skills.slice(0, 3).map((skill) => <span key={skill}>{skill}</span>)}</div><div className={styles.cardActions}><button className={styles.secondaryButton} type="button" onClick={() => setPreviewPortfolio(portfolio)}>Open preview</button><button className={styles.primarySmallButton} type="button" onClick={() => openEdit(portfolio)}>Edit</button></div></div></article>)}</div>}
      <div className={styles.disclosure}><Icon name="shield" width={19} height={19} /><p><strong>Preview-only studio.</strong> Private means browser-only, Unlisted means link-only in the design, and Public shows the published state. Nothing is sent from this workspace.</p></div>
      {editorOpen ? <PortfolioEditor draft={draft} editing={Boolean(editingId)} onChange={setDraft} onClose={() => setEditorOpen(false)} onSave={saveDraft} /> : null}
      {previewPortfolio ? <PreviewModal portfolio={previewPortfolio} onClose={() => setPreviewPortfolio(null)} /> : null}
    </div>
  );
}
