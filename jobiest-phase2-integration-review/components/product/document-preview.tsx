"use client";

import { useState } from "react";
import { Icon } from "@/components/icons/icons";
import styles from "./document-preview.module.css";

export function DocumentPreviewFrame({ title, kind, pages }: { title: string; kind: "CV" | "Cover letter"; pages: string[] }) {
  const [page, setPage] = useState(0);
  const safePages = pages.length > 0 ? pages : ["No page content is available in this preview."];
  const displayedPage = Math.min(page, safePages.length - 1);
  return (
    <section className={styles.frame} aria-label={`${kind} preview`}>
      <header className={styles.header}>
        <div><span className={styles.kind}>{kind} preview</span><h3>{title}</h3></div>
        <span className={styles.pageLabel}>Page {displayedPage + 1} of {safePages.length}</span>
      </header>
      <div className={styles.paper} aria-live="polite"><p>{safePages[displayedPage]}</p></div>
      <footer className={styles.controls}>
        <button className={styles.pageButton} type="button" onClick={() => setPage((current) => Math.max(0, current - 1))} disabled={displayedPage === 0} aria-label="Previous page"><Icon name="arrow-right" className={styles.previousIcon} /></button>
        <span aria-live="polite">Page {displayedPage + 1} of {safePages.length}</span>
        <button className={styles.pageButton} type="button" onClick={() => setPage((current) => Math.min(safePages.length - 1, current + 1))} disabled={displayedPage >= safePages.length - 1} aria-label="Next page"><Icon name="arrow-right" /></button>
      </footer>
    </section>
  );
}
