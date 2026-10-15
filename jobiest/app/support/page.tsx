import type { Metadata } from "next";
import { Icon } from "@/components/icons/icons";
import { MarketingShell } from "@/components/marketing/marketing-shell";
import { marketingMetadata } from "@/components/marketing/metadata";
import { SupportForm } from "@/components/marketing/support-form";
import { supportTopics } from "@/components/marketing/support-topics";
import styles from "../marketing.module.css";

export const metadata: Metadata = marketingMetadata({
  title: "Contact Support - Jobiest",
  description:
    "How can we help? Account and login, jobs, CV and resume, applications, AI agent, payments and subscriptions.",
  path: "/support",
});

export default function SupportPage() {
  return (
    <MarketingShell activePath="/support">
      <main className={styles.page}>
        <header className={styles.pageHero}>
          <div className={styles.container}>
            <p className={styles.eyebrow}>Support</p>
            <h1>How can we help?</h1>
            <p className={styles.pageLead}>
              Pick what your message is about, tell us what happened, and a real person can reply by email. You can also email the support team directly.
            </p>
            <a className={styles.emailAction} href="mailto:support@jobiest.com">Write to support@jobiest.com</a>
          </div>
        </header>

        <section className={styles.section} aria-labelledby="support-title">
          <div className={styles.container}>
            <div className={styles.supportGrid}>
              <div>
                <h2 id="support-title">Choose a topic</h2>
                <p className={styles.topicIntro}>A clear topic helps your message reach the right place.</p>
                <ul className={styles.supportTopics}>
                  {supportTopics.map((topic) => (
                    <li key={topic}>
                      <Icon name="check-circle" width={18} height={18} />
                      {topic}
                    </li>
                  ))}
                </ul>
                <p className={styles.topicIntro}>
                  For account questions, include the email address on your Jobiest account. You can use the direct email link above.
                </p>
              </div>
              <SupportForm />
            </div>
          </div>
        </section>
      </main>
    </MarketingShell>
  );
}
