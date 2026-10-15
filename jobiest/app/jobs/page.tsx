import Link from "next/link";
import { AppShell } from "@/components/app/app-shell";
import { privateAppMetadata } from "@/components/app/app-metadata";
import { sampleJobs } from "@/components/app/sample-data";
import { JobCard } from "@/components/product/product-components";
import styles from "@/components/app/app-surfaces.module.css";

// TODO-SEO: New private jobs preview. Replace copy only when real account data and production policy are connected.
export const metadata = privateAppMetadata("Saved jobs | Jobiest", "TODO-SEO: Sample saved jobs for a private Jobiest app preview.");

export default function JobsPage() {
  return (
    <AppShell activePath="/jobs">
      <div className={styles.page}>
        <header className={styles.pageHeader}><div><p className={styles.kicker}>Saved jobs</p><h1>Roles you chose to explore</h1><p>Jobiest works from criteria you set and jobs you add. These examples are fictional.</p></div></header>
        <div className={styles.sampleNotice} role="note"><p><strong>Preview data only</strong>Employers and match scores below are illustrative. No job feed or saved list is connected.</p></div>
        <section className={styles.section} aria-labelledby="saved-roles-heading">
          <div className={styles.sectionHeading}><div><h2 id="saved-roles-heading">Sample roles</h2><p>Match scores are examples, not actual evaluations.</p></div><Link className={styles.inlineLink} href="/applications">View application tracking</Link></div>
          <div className={styles.jobList}>
            {sampleJobs.map((job, index) => (
              <article className={styles.card} key={job.id}>
                <JobCard role={job.role} employer={job.employer} location={job.location} score={job.score} />
                <div className={styles.tagRow} aria-label="Example role topics">{job.tags.map((tag) => <span className={styles.tag} key={tag}>{tag}</span>)}</div>
                {index === 0 ? <Link className={styles.inlineLink} href="/approvals/demo">Open the sample approval review</Link> : null}
              </article>
            ))}
          </div>
        </section>
        <section className={styles.card} aria-labelledby="job-criteria-heading"><p className={styles.kicker}>Your control</p><h2 className={styles.cardTitle} id="job-criteria-heading">Choose the work you want</h2><p className={styles.cardBody}>This preview does not search, save, or apply for jobs. In the product, you set your criteria and add the roles you want the agent to prepare for.</p></section>
      </div>
    </AppShell>
  );
}
