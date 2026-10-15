import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AppShell } from "@/components/app/app-shell";
import styles from "@/components/app/app-surfaces.module.css";

// TODO-SEO: This route contains one fictional portfolio sample. Set metadata and indexing policy when real portfolio data is connected.
export const metadata: Metadata = {
  title: "Portfolio preview | Jobiest",
  description: "TODO-SEO: A sample public portfolio page in the Jobiest app preview.",
  robots: { index: false, follow: false },
};

type RouteParams = Promise<{ slug: string }>;

export default async function PortfolioPage({ params }: { params: RouteParams }) {
  const { slug } = await params;
  if (slug !== "sample") notFound();

  return (
    <AppShell activePath="/portfolio/sample">
      <div className={styles.page}>
        <header className={styles.pageHeader}><div><p className={styles.kicker}>Public portfolio · Sample</p><h1>A portfolio built from verified experience</h1><p>Review what a shareable page can look like. This example does not describe a real person.</p></div></header>
        <div className={styles.sampleNotice} role="note"><p><strong>Fictional content</strong>This sample has no real identity, work history, or contact details. A real portfolio uses information the owner has chosen to make public.</p></div>
        <article className={styles.portfolioFrame}>
          <p className={styles.kicker}>Sample profile</p>
          <h2>Product Designer</h2>
          <p>A short introduction would appear here, written from the profile owner's verified experience and shared only with their permission.</p>
          <section className={styles.portfolioSection} aria-labelledby="sample-focus-heading"><h3 id="sample-focus-heading">Areas of focus</h3><div className={styles.tagRow}><span className={styles.tag}>Example only</span><span className={styles.tag}>Verified skills appear here</span></div></section>
          <section className={styles.portfolioSection} aria-labelledby="sample-work-heading"><h3 id="sample-work-heading">Selected work</h3><p>Project descriptions and outcomes are shown only when the portfolio owner has provided and approved them.</p></section>
          <section className={styles.portfolioSection} aria-labelledby="sample-contact-heading"><h3 id="sample-contact-heading">Contact</h3><p>No contact information is included in this sample.</p></section>
        </article>
      </div>
    </AppShell>
  );
}
