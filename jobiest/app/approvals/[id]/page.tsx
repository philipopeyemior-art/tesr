import { notFound } from "next/navigation";
import { AppShell } from "@/components/app/app-shell";
import { privateAppMetadata } from "@/components/app/app-metadata";
import { ApprovalPreviewActions } from "@/components/app/app-interactions";
import { sampleCvPages, sampleLetterPages } from "@/components/app/sample-data";
import styles from "@/components/app/app-surfaces.module.css";
import { DocumentPreviewFrame } from "@/components/product/document-preview";
import { Icon } from "@/components/icons/icons";

// TODO-SEO: Private mock-only approval route. Replace metadata when this page is connected to real account data.
export const metadata = privateAppMetadata("Application review | Jobiest", "TODO-SEO: Review a fictional job application in the Jobiest app preview.");

type RouteParams = Promise<{ id: string }>;

export default async function ApprovalPage({ params }: { params: RouteParams }) {
  const { id } = await params;
  if (id !== "demo") notFound();

  return (
    <AppShell activePath="/applications">
      <div className={styles.page}>
        <header className={styles.pageHeader}><div><p className={styles.kicker}>Approval review · Sample</p><h1>Review before anything is sent</h1><p>Check the job details, every document, and each proposed change.</p></div></header>
        <div className={styles.sampleNotice} role="note"><Icon name="shield" width={21} height={21} /><p><strong>Fictional example</strong>This preview contains no real employer or candidate data. The action buttons below do not send or save anything.</p></div>

        <div className={styles.reviewLayout}>
          <div className={styles.reviewSections}>
            <section className={styles.card} aria-labelledby="job-review-heading">
              <p className={styles.kicker}>Job details</p>
              <h2 id="job-review-heading">Product Designer at Example employer</h2>
              <p>Remote · Role added by the sample user</p>
              <p className={styles.cardBody}>Fictional role preview. In a real review, confirm the employer, role, and job description before continuing.</p>
            </section>

            <section className={styles.card} aria-labelledby="documents-ready-heading">
              <p className={styles.kicker}>Documents</p>
              <h2 id="documents-ready-heading">What is ready to review</h2>
              <p>One tailored CV and one cover letter. Both previews use fictional sample text.</p>
            </section>

            <section className={styles.card} aria-labelledby="change-reasons-heading">
              <p className={styles.kicker}>Evidence review</p>
              <h2 id="change-reasons-heading">What changed and why</h2>
              <ul className={styles.diffList}>
                <li><strong>Order adjusted</strong>Relevant, verified experience is placed before less relevant material to make the role connection easier to review.</li>
                <li><strong>Claims kept within the evidence</strong>No new qualification, employer, result, or date is added by this preview.</li>
                <li><strong>Role wording checked</strong>Terms are only used when they match the supplied experience. Any unsupported claim must be removed or clarified.</li>
              </ul>
            </section>

            <section className={styles.card} aria-labelledby="decision-heading">
              <p className={styles.kicker}>Your decision</p>
              <h2 id="decision-heading">Approve this exact draft or request a change</h2>
              <ApprovalPreviewActions />
            </section>
          </div>

          <section className={styles.documentStack} aria-label="Scroll through the sample document previews">
            <DocumentPreviewFrame title="Product Designer · Sample profile" kind="CV" pages={sampleCvPages} />
            <DocumentPreviewFrame title="Product Designer · Sample profile" kind="Cover letter" pages={sampleLetterPages} />
          </section>
        </div>
      </div>
    </AppShell>
  );
}
