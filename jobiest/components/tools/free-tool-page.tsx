import Link from "next/link";
import { MarketingShell } from "@/components/marketing/marketing-shell";
import { ToolExperience } from "./tool-experience";
import { ToolFaq } from "./tool-faq";
import type { FreeToolDefinition } from "./types";
import styles from "./tool-page.module.css";

export function FreeToolPage({ tool }: { tool: FreeToolDefinition }) {
  return (
    <MarketingShell activePath="/tools">
      <main className={styles.page}>
        <header className={styles.hero}>
          <div className={styles.container}>
            <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
              <ol><li><Link href="/">Home</Link></li><li><Link href="/tools">Free tools</Link></li><li aria-current="page">{tool.name}</li></ol>
            </nav>
            <p className={styles.eyebrow}>Free career tool</p>
            <h1>{tool.heading}</h1>
            <p className={styles.lede}>{tool.introduction}</p>
          </div>
        </header>

        <div className={styles.container}>
          <ToolExperience tool={tool} />

          <nav className={styles.relatedSection} aria-labelledby="related-tools-title">
            <p className={styles.eyebrow}>Keep moving</p>
            <h2 id="related-tools-title">Related free tools</h2>
            <div className={styles.relatedGrid}>
              {tool.relatedTools.map((related) => (
                <Link className={styles.relatedCard} href={related.href} key={related.href}>
                  <strong>{related.label}</strong>
                  <span>{related.reason}</span>
                </Link>
              ))}
            </div>
          </nav>

          <section className={styles.explanation} aria-labelledby="tool-explanation-title">
            <p className={styles.eyebrow}>How it works</p>
            <h2 id="tool-explanation-title">{tool.seoHeading}</h2>
            {tool.seoParagraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </section>

          <ToolFaq items={tool.faqs} />
        </div>
      </main>
    </MarketingShell>
  );
}
