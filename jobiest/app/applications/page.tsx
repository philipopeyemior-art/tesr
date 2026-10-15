import Link from "next/link";
import { AppShell } from "@/components/app/app-shell";
import { privateAppMetadata } from "@/components/app/app-metadata";
import { ApplicationViewSwitcher } from "@/components/app/app-interactions";
import styles from "@/components/app/app-surfaces.module.css";

export const metadata = privateAppMetadata(
  "Jobiest - your AI career agent",
  "Create your professional profile once. Jobiest prepares truthful personalized applications for the roles you bring, applies with your agent on your approval, and tracks everything in one dashboard.",
);

export default function ApplicationsPage() {
  return (
    <AppShell activePath="/applications">
      <div className={styles.page}>
        <header className={styles.pageHeader}><div><p className={styles.kicker}>Applications</p><h1>Track each application, step by step</h1><p>See what is ready for your review and what still needs your input.</p></div></header>
        <div className={styles.sampleNotice} role="note"><p><strong>Sample workflow only</strong>These fictional application cards do not describe a real person's applications and do not indicate that anything was sent.</p></div>
        <section className={styles.section} aria-labelledby="applications-pipeline-heading">
          <div className={styles.sectionHeading}><div><h2 id="applications-pipeline-heading">Application pipeline</h2><p>Board view keeps the approval step visible. Switch to a compact list when you need it.</p></div><Link className={styles.inlineLink} href="/approvals/demo">Open approval review</Link></div>
          <ApplicationViewSwitcher />
        </section>
        <section className={styles.card} aria-labelledby="approval-rule-heading"><p className={styles.kicker}>Approval rule</p><h2 className={styles.cardTitle} id="approval-rule-heading">Nothing is submitted without your approval</h2><p className={styles.cardBody}>A job can be prepared for review, but no employer receives a document until you explicitly approve the exact CV and cover letter.</p></section>
      </div>
    </AppShell>
  );
}
