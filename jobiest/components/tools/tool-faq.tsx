import type { ToolFaq } from "./types";
import styles from "./tool-page.module.css";

export function ToolFaq({ items }: { items: ToolFaq[] }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
  const safeJson = JSON.stringify(structuredData).replace(/</g, "\\u003c");

  return (
    <>
      <section className={styles.faqSection} aria-labelledby="tool-faq-title">
        <p className={styles.eyebrow}>Common questions</p>
        <h2 id="tool-faq-title">Questions about this tool</h2>
        <div className={styles.faqList}>
          {items.map((item, index) => (
            <details key={item.question} open={index === 0}>
              <summary>{item.question}</summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJson }} />
    </>
  );
}
