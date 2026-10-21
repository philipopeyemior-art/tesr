"use client";

import { useEffect, useMemo, useState } from "react";
import { Icon } from "@/components/icons/icons";
import { recommendedTemplates, resumeTemplates, templateCategories, templateDescription, type ResumeTemplate } from "@/lib/resume-templates";
import { DribbbleResume } from "./DribbbleResume";
import styles from "./TemplateGallery.module.css";

type GalleryMode = "gallery" | "wizard";
type Filter = "all" | "ats" | "photo" | "one-page" | "two-column" | "minimal" | "modern" | "professional" | "creative" | "executive";

const filters: { id: Filter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "ats", label: "ATS-Friendly" },
  { id: "photo", label: "With Photo" },
  { id: "one-page", label: "One-Page" },
  { id: "two-column", label: "Two-Column" },
  ...templateCategories.map((category) => ({ id: category as Filter, label: category[0].toUpperCase() + category.slice(1) })),
];

function matchesFilter(template: ResumeTemplate, filter: Filter) {
  if (filter === "all") return true;
  if (filter === "ats") return template.atsFriendly;
  if (filter === "photo") return template.photoSupport !== "none";
  if (filter === "one-page") return template.columns === 1;
  if (filter === "two-column") return template.columns === 2;
  return template.category === filter;
}

export function TemplatePreviewDialog({ template, onClose }: { template: ResumeTemplate | null; onClose: () => void }) {
  useEffect(() => {
    if (!template) return;
    const handleKeyDown = (event: KeyboardEvent) => { if (event.key === "Escape") onClose(); };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [template, onClose]);

  if (!template) return null;
  return (
    <dialog className={styles.dialog} open role="dialog" aria-modal="true" aria-labelledby="template-preview-title">
      <div className={styles.dialogPanel}>
        <div className={styles.dialogHeader}><div><p className={styles.eyebrow}>Full preview</p><h2 id="template-preview-title">{template.name}</h2></div><button className={styles.iconButton} type="button" onClick={onClose} aria-label="Close template preview"><Icon name="close" width={18} height={18} /></button></div>
        <DribbbleResume template={template} size="full" />
        <button className={styles.closeButton} type="button" onClick={onClose}>Close template preview</button>
      </div>
    </dialog>
  );
}

export function TemplateCard({ template, selected = false, selectable = false, onPreview, onSelect }: { template: ResumeTemplate; selected?: boolean; selectable?: boolean; onPreview: (template: ResumeTemplate) => void; onSelect?: (template: ResumeTemplate) => void }) {
  return (
    <article className={`${styles.templateCard} ${selected ? styles.templateCardSelected : ""}`}>
      <button className={styles.previewButton} type="button" onClick={() => onPreview(template)} aria-label={`Preview ${template.name} full size`}>
        <DribbbleResume template={template} />
      </button>
      <div className={styles.cardBody}>
        <div className={styles.cardTitleRow}><div><h3>{template.name}</h3><p>{templateDescription(template)}</p></div>{selected ? <span className={styles.selectedLabel}>Selected</span> : null}</div>
        <div className={styles.metaRow}><span>{template.atsFriendly ? "ATS-friendly" : "Visual-first"}</span><span>{template.photoSupport === "none" ? "No photo" : "Photo ready"}</span><span>{template.columns === 2 ? "2 columns" : "1 page"}</span></div>
        <div className={styles.cardActions}><button className={styles.secondaryButton} type="button" onClick={() => onPreview(template)}>Preview full size</button>{selectable && onSelect ? <button className={styles.selectButton} type="button" onClick={() => onSelect(template)}>{selected ? "Selected" : "Use template"}</button> : null}</div>
      </div>
    </article>
  );
}

function FilterBar({ filter, setFilter, mode }: { filter: Filter; setFilter: (filter: Filter) => void; mode: GalleryMode }) {
  const filterItems = mode === "wizard" ? [{ id: "all" as Filter, label: "All" }, ...templateCategories.map((category) => ({ id: category as Filter, label: category[0].toUpperCase() + category.slice(1) }))] : filters;
  return <div className={`${styles.filterBar} ${mode === "wizard" ? styles.filterBarWizard : ""}`} role="tablist" aria-label="Template filters">
    {filterItems.map((item) => {
      const count = resumeTemplates.filter((template) => matchesFilter(template, item.id)).length;
      return <button className={filter === item.id ? styles.filterActive : ""} type="button" role="tab" aria-selected={filter === item.id} onClick={() => setFilter(item.id)} key={item.id}>{item.label} <span>{count}</span></button>;
    })}
  </div>;
}

export function TemplateGallery({ mode = "gallery", selectedTemplateId, onSelect }: { mode?: GalleryMode; selectedTemplateId?: string; onSelect?: (template: ResumeTemplate) => void }) {
  const [filter, setFilter] = useState<Filter>("all");
  const [visibleCount, setVisibleCount] = useState(mode === "gallery" ? 8 : 6);
  const [previewTemplate, setPreviewTemplate] = useState<ResumeTemplate | null>(null);
  const filteredTemplates = useMemo(() => resumeTemplates.filter((template) => matchesFilter(template, filter)), [filter]);
  const visibleTemplates = filteredTemplates.slice(0, visibleCount);
  const remaining = Math.max(0, filteredTemplates.length - visibleTemplates.length);

  return (
    <div className={`${styles.gallery} ${mode === "wizard" ? styles.galleryWizard : ""}`}>
      {mode === "wizard" ? <div className={styles.recommended}><div className={styles.sectionHeading}><div><p className={styles.eyebrow}>Recommended</p><h2>Good starting points</h2></div><span>Based on a clean preview workflow</span></div><div className={styles.recommendedGrid}>{recommendedTemplates().map((template) => <TemplateCard key={template.id} template={template} selected={selectedTemplateId === template.id} selectable onPreview={setPreviewTemplate} onSelect={onSelect} />)}</div></div> : null}
      <div className={styles.galleryHeader}><div><p className={styles.eyebrow}>{mode === "wizard" ? "All templates" : "Resume library"}</p><h2>{mode === "wizard" ? "Choose a template" : "Find your working style"}</h2><p className={styles.countNote}>Showing {visibleTemplates.length} of {filteredTemplates.length} templates with spacious preview cards.</p></div></div>
      <FilterBar filter={filter} setFilter={(nextFilter) => { setFilter(nextFilter); setVisibleCount(mode === "gallery" ? 8 : 6); }} mode={mode} />
      <div className={styles.templateGrid}>{visibleTemplates.map((template) => <TemplateCard key={template.id} template={template} selected={selectedTemplateId === template.id} selectable={mode === "wizard"} onPreview={setPreviewTemplate} onSelect={onSelect} />)}</div>
      {filteredTemplates.length > (mode === "gallery" ? 8 : 6) ? <div className={styles.pagination}><button type="button" onClick={() => setVisibleCount((current) => current < filteredTemplates.length ? filteredTemplates.length : (mode === "gallery" ? 8 : 6))}>{remaining > 0 ? `Show ${mode === "gallery" ? 8 : 6} more (${remaining} remaining)` : "Show less"}</button></div> : null}
      <TemplatePreviewDialog template={previewTemplate} onClose={() => setPreviewTemplate(null)} />
    </div>
  );
}
