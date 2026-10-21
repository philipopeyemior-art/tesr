import type { Metadata } from "next";
import { AppShell } from "@/components/app/app-shell";
import { privateAppMetadata } from "@/components/app/app-metadata";
import { TemplateGallery } from "@/components/resume/TemplateGallery";
import styles from "@/components/app/app-surfaces.module.css";

export const metadata: Metadata = privateAppMetadata(
  "Resume Library | Jobiest",
  "Browse 30 fictional resume template previews in the Jobiest design preview.",
);

export default function TemplatesPage() {
  return (
    <AppShell activePath="/generate">
      <div className={styles.page}>
        <header className={styles.pageHeader}><div><p className={styles.kicker}>Resume Library</p><h1>Choose a resume style that feels like you.</h1><p>Browse spacious preview cards, compare layouts, and choose a starting point for your local draft.</p></div></header>
        <div className={styles.sampleNotice} role="note"><p><strong>Preview-only library</strong>These are fictional template previews. No account data, resume, or photo is saved or sent.</p></div>
        <TemplateGallery />
      </div>
    </AppShell>
  );
}
