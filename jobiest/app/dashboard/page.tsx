import { AppShell } from "@/components/app/app-shell";
import { privateAppMetadata } from "@/components/app/app-metadata";
import { ApplicationViewSwitcher } from "@/components/app/app-interactions";
import { sampleJobs } from "@/components/app/sample-data";
import styles from "@/components/app/app-surfaces.module.css";
import { Icon } from "@/components/icons/icons";
import { JobCard } from "@/components/product/product-components";
import Link from "next/link";

export const metadata = privateAppMetadata(
  "Jobiest - your AI career agent",
  "Create your professional profile once. Jobiest prepares truthful personalized applications for the roles you bring, applies with your agent on your approval, and tracks everything in one dashboard.",
);

export default function DashboardPage() {
  return (
    <AppShell activePath="/dashboard">
      <div className={styles.page}>
        <header className={styles.pageHeader}>
          <div>
            <p className={styles.kicker}>Dashboard</p>
            <h1>Your job search, with you in control</h1>
            <p>Review what is ready, choose the next step, and keep every application in view.</p>
          </div>
        </header>

        <div className={styles.sampleNotice} role="note">
          <Icon name="shield" width={21} height={21} />
          <p><strong>Sample workspace</strong>This page uses fictional preview data. It is not connected to a Jobiest account, and no action here is saved or sent.</p>
        </div>

        <div className={styles.dashboardGrid}>
          <section className={`${styles.card} ${styles.approvalPriority}`} aria-labelledby="approval-priority-heading">
            <p className={styles.kicker}>Approval first</p>
            <h2 id="approval-priority-heading">2 applications ready for your approval</h2>
            <p>Review the tailored CV and cover letter before anything is sent.</p>
            <div className={styles.approvalSummary}>
              <div><strong>Product Designer</strong><span>Example employer · Fictional sample</span></div>
              <Link className={styles.actionLink} href="/approvals/demo">Review draft</Link>
            </div>
            <div className={styles.approvalSummary}>
              <div><strong>UX Researcher</strong><span>Sample company · Fictional sample</span></div>
              <Link className={styles.inlineLink} href="/approvals/demo">Review draft</Link>
            </div>
          </section>

          <section className={`${styles.card} ${styles.section}`} aria-labelledby="free-limits-heading">
            <div><p className={styles.kicker}>Free plan</p><h2 className={styles.cardTitle} id="free-limits-heading">Daily allowances</h2></div>
            <div className={styles.limitList}>
              <div className={styles.limitItem}>
                <div><span>CV or cover letter generations</span><strong>3 per day</strong></div>
                <div className={styles.limitBar} role="img" aria-label="Free plan allows up to 3 CV or cover letter generations per day. Current use is not shown in this preview."><span /></div>
              </div>
              <div className={styles.limitItem}>
                <div><span>Career-tool uses</span><strong>10 per day</strong></div>
                <div className={styles.limitBar} role="img" aria-label="Free plan allows up to 10 career-tool uses per day. Current use is not shown in this preview."><span /></div>
              </div>
            </div>
            <p className={styles.limitFootnote}>These bars show the allowance only. This preview does not track account usage.</p>
          </section>
        </div>

        <section className={styles.section} aria-labelledby="pipeline-heading">
          <div className={styles.sectionHeading}>
            <div><h2 id="pipeline-heading">Application pipeline</h2><p>See what is ready for review and what still needs your input.</p></div>
            <Link className={styles.inlineLink} href="/applications">View applications <Icon name="arrow-right" width={17} height={17} /></Link>
          </div>
          <ApplicationViewSwitcher />
        </section>

        <div className={styles.dashboardGrid}>
          <section className={styles.section} aria-labelledby="jobs-heading">
            <div className={styles.sectionHeading}>
              <div><h2 id="jobs-heading">Jobs you added</h2><p>Illustrative matches only. The agent works from jobs you choose.</p></div>
              <Link className={styles.inlineLink} href="/jobs">View saved jobs</Link>
            </div>
            {sampleJobs.map((job) => <JobCard key={job.id} role={job.role} employer={job.employer} location={job.location} score={job.score} />)}
          </section>

          <section className={`${styles.card} ${styles.section}`} aria-labelledby="setup-heading">
            <div><p className={styles.kicker}>Start here</p><h2 className={styles.cardTitle} id="setup-heading">A clear first three steps</h2><p className={styles.cardBody}>A short checklist keeps the first run understandable.</p></div>
            <ol className={styles.checklist}>
              <li><Icon name="check-circle" width={19} height={19} /><span>Confirm the experience you want the agent to use.</span></li>
              <li><Icon name="briefcase" width={19} height={19} /><span>Add a role you want to apply for.</span></li>
              <li><Icon name="eye" width={19} height={19} /><span>Review a draft before anything is sent.</span></li>
            </ol>
            <Link className={styles.inlineLink} href="/generate">Open the document preview <Icon name="arrow-right" width={17} height={17} /></Link>
          </section>
        </div>

        <section className={styles.section} aria-labelledby="shortcuts-heading">
          <div className={styles.sectionHeading}><div><h2 id="shortcuts-heading">Document shortcuts</h2><p>Use a local preview to see how a draft fits together.</p></div></div>
          <div className={styles.shortcutGrid}>
            <Link className={styles.shortcut} href="/generate?type=cv"><Icon name="file" /><strong>Build a CV</strong><span>Review a live preview from text you enter.</span></Link>
            <Link className={styles.shortcut} href="/generate?type=letter"><Icon name="file" /><strong>Write a cover letter</strong><span>Check the structure before using verified details.</span></Link>
            <Link className={styles.shortcut} href="/portfolio/sample"><Icon name="user" /><strong>Portfolio preview</strong><span>See a clearly labeled sample public page.</span></Link>
          </div>
        </section>
      </div>
    </AppShell>
  );
}
