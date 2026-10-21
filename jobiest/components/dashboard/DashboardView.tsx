import Link from "next/link";
import { Icon } from "@/components/icons/icons";
import { sampleApplicationRows, sampleJobs } from "@/components/app/sample-data";
import styles from "./dashboard-view.module.css";

function getGreeting(hour: number) {
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

function countApplications(statuses: string[]) {
  return sampleApplicationRows.filter((row) => statuses.includes(row.status)).length;
}

const pipeline = [
  { label: "Prepared", count: countApplications(["Ready for your review"]) },
  { label: "Checking", count: countApplications(["Changes requested"]) },
  { label: "Sent", count: countApplications(["Approved to send"]) },
  { label: "Verified", count: 0 },
];

const drafts = sampleApplicationRows.slice(0, 4);
const profilePercent = 72;

export function DashboardView() {
  const greeting = getGreeting(new Date().getHours());

  return (
    <div className={styles.page}>
      <section className={styles.hero} aria-labelledby="command-deck-title">
        <div className={styles.heroCopy}>
          <p className={styles.heroKicker}>Command Deck · Sample workspace</p>
          <h1 id="command-deck-title">{greeting}, your next move is ready.</h1>
          <p className={styles.heroLead}>Keep your search moving with a clear view of what is prepared, what needs a check, and what you can do next.</p>
          <p className={styles.quotaLine}>Preview data only. Nothing here is saved or sent.</p>
        </div>
        <div className={styles.profileRing} aria-label={`Profile completeness ${profilePercent}%`}>
          <svg viewBox="0 0 100 100" role="img" aria-hidden="true">
            <circle className={styles.ringTrack} cx="50" cy="50" r="42" />
            <circle className={styles.ringValue} cx="50" cy="50" r="42" pathLength="100" strokeDasharray={`${profilePercent} ${100 - profilePercent}`} />
          </svg>
          <span><strong>{profilePercent}%</strong><small>profile strength</small></span>
        </div>
      </section>

      <aside className={styles.trustStrip} role="note">
        <Icon name="shield" width={19} height={19} />
        <p><strong>Your application is free.</strong> Jobiest never asks candidates for money. This preview does not submit applications or contact employers.</p>
      </aside>

      <section className={styles.pipelineSection} aria-labelledby="pipeline-title">
        <div className={styles.sectionHeading}>
          <div><p className={styles.eyebrow}>At a glance</p><h2 id="pipeline-title">Application pipeline</h2></div>
          <Link className={styles.textLink} href="/applications">Open applications <Icon name="arrow-right" width={16} height={16} /></Link>
        </div>
        <div className={styles.pipelineRail}>
          {pipeline.map((item, index) => (
            <div className={styles.pipelineNode} key={item.label}>
              <span className={styles.pipelineDot} aria-hidden="true">{item.count}</span>
              <div><strong>{item.count}</strong><span>{item.label}</span></div>
              {index < pipeline.length - 1 ? <span className={styles.pipelineConnector} aria-hidden="true" /> : null}
            </div>
          ))}
        </div>
      </section>

      <section className={styles.bentoGrid} aria-label="Dashboard overview">
        <article className={`${styles.card} ${styles.approvalsCard}`}>
          <div className={styles.cardHeading}>
            <div><p className={styles.eyebrow}>Approval first</p><h2>Drafts awaiting your review</h2></div>
            <span className={styles.countBadge}>{drafts.length}</span>
          </div>
          <p className={styles.cardIntro}>Review each draft before anything is sent.</p>
          <div className={styles.draftList}>
            {drafts.map((draft) => (
              <div className={styles.draftRow} key={`${draft.role}-${draft.employer}`}>
                <div><strong>{draft.role}</strong><span>{draft.employer}</span></div>
                <Link className={styles.smallAction} href="/approvals/demo">Review</Link>
              </div>
            ))}
          </div>
          <Link className={styles.primaryAction} href="/approvals/demo">Review drafts <Icon name="arrow-right" width={17} height={17} /></Link>
        </article>

        <article className={`${styles.card} ${styles.startCard}`}>
          <div><p className={styles.eyebrow}>Primary action</p><h2>Start an application</h2><p className={styles.cardIntro}>Paste a job link and build a preview from the role you choose.</p></div>
          <form className={styles.jobForm} action="/generate" method="get">
            <label htmlFor="job-link">Job link</label>
            <div className={styles.formRow}><input id="job-link" name="job" type="url" placeholder="https://example.com/job" /><button type="submit">Continue <Icon name="arrow-right" width={16} height={16} /></button></div>
          </form>
          <p className={styles.formNote}><Icon name="shield" width={16} height={16} /> Preview only. No link is submitted from this workspace.</p>
        </article>

        <article className={`${styles.card} ${styles.allowanceCard}`}>
          <div><p className={styles.eyebrow}>Free plan</p><h2>Daily allowances</h2></div>
          <div className={styles.allowanceList}>
            <div><span>Documents</span><strong>3 / day</strong><div className={styles.progress}><span style={{ width: "100%" }} /></div></div>
            <div><span>Career tools</span><strong>10 / day</strong><div className={styles.progress}><span style={{ width: "100%" }} /></div></div>
          </div>
          <p className={styles.mutedNote}>Allowance limits are shown for the preview and do not track account usage.</p>
        </article>

        <article className={`${styles.card} ${styles.statsCard}`}>
          <div><p className={styles.eyebrow}>Search signals</p><h2>Search stats</h2></div>
          <div className={styles.statsGrid}>
            <div><strong>{sampleJobs.length}</strong><span>saved roles</span></div>
            <div><strong>{sampleApplicationRows.length}</strong><span>tracked applications</span></div>
            <div><strong>{profilePercent}%</strong><span>profile strength</span></div>
          </div>
        </article>

        <article className={`${styles.card} ${styles.controlCard}`}>
          <div className={styles.cardHeading}><div><p className={styles.eyebrow}>Controls</p><h2>Auto-submit</h2></div><span className={styles.previewPill}>Preview</span></div>
          <label className={styles.toggleRow}><input type="checkbox" aria-label="Auto-submit preview toggle" /><span className={styles.toggleTrack}><span /></span><span>Approval required</span></label>
          <p className={styles.cardIntro}>Applications stay in review until you approve them.</p>
        </article>

        <article className={`${styles.card} ${styles.nextCard}`}>
          <div><p className={styles.eyebrow}>Next step</p><h2>Complete your profile</h2><p className={styles.cardIntro}>Add one more verified experience detail to make your next draft more useful.</p></div>
          <div className={styles.nextProgress}><span><strong>{profilePercent}%</strong> complete</span><div className={styles.progress}><span style={{ width: `${profilePercent}%` }} /></div></div>
          <Link className={styles.textLink} href="/portfolio/sample">Open profile preview <Icon name="arrow-right" width={16} height={16} /></Link>
        </article>
      </section>

      <section className={styles.lowerGrid} aria-label="Saved roles and setup">
        <article className={`${styles.card} ${styles.rolesCard}`}>
          <div className={styles.cardHeading}><div><p className={styles.eyebrow}>From your search</p><h2>Saved roles</h2></div><Link className={styles.textLink} href="/jobs">View all <Icon name="arrow-right" width={16} height={16} /></Link></div>
          <div className={styles.roleList}>{sampleJobs.map((job) => <div className={styles.roleRow} key={job.id}><div><strong>{job.role}</strong><span>{job.employer} · {job.location}</span></div><span className={styles.matchScore}>{job.score}% match</span></div>)}</div>
        </article>
        <article className={`${styles.card} ${styles.setupCard}`}>
          <p className={styles.eyebrow}>Setup guide</p><h2>Three calm steps</h2>
          <ol className={styles.stepList}><li><span>1</span><div><strong>Confirm your experience</strong><small>Use details you can verify.</small></div></li><li><span>2</span><div><strong>Add a role</strong><small>Paste a job link you want to explore.</small></div></li><li><span>3</span><div><strong>Review the draft</strong><small>Approve before anything is sent.</small></div></li></ol>
        </article>
      </section>
    </div>
  );
}
