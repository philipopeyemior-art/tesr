import Image from "next/image";
import type { Metadata } from "next";
import { Icon } from "@/components/icons/icons";
import { AgentTimeline } from "@/components/product/product-components";
import { HomePreviewActions } from "@/components/styleguide/home-preview-actions";
import { ButtonLink } from "@/components/ui/primitives";
import styles from "./home.module.css";

export const metadata: Metadata = {
  title: "Jobiest - Your AI Agent for the Job Search",
  description: "The AI agent for your job search: tell it your criteria once, add the jobs you want, and it tailors your CV and cover letter and submits after your approval. Start free.",
};

export default function HomePage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <a className={styles.logo} href="/" aria-label="Jobiest home"><Image src="/logos/wordmark-light-transparent.png" alt="Jobiest" width={544} height={262} priority sizes="178px" /></a>
        <span className={styles.phaseBadge}>Phase 1 design review</span>
      </header>
      <section className={styles.hero} aria-labelledby="home-title">
        <div className={styles.heroCopy}>
          <span className={styles.kicker}><Icon name="spark" width={17} height={17} /> AI career agent</span>
          <h1 id="home-title">Your AI agent for the job search. <span>You approve everything it sends.</span></h1>
          <p className={styles.heroText}>Set your job criteria once. Add the jobs you want. Jobiest prepares truthful applications from your verified experience, then shows you every change before anything goes to an employer.</p>
          <HomePreviewActions />
          <p className={styles.trustLine}><Icon name="shield" width={19} height={19} /> Nothing is sent without your approval.</p>
        </div>
        <aside className={styles.agentPanel} aria-label="Agent activity example">
          <div className={styles.agentPanelTop}><div><span className={styles.panelEyebrow}>EXAMPLE ACTIVITY</span><h2>Agent activity</h2></div><span className={styles.activityMark}><Icon name="activity" /></span></div>
          <AgentTimeline events={[{ verb: "Reviewed verified experience", detail: "Compared saved evidence with the job requirements.", timeLabel: "Example activity", state: "current" }]} />
          <div className={styles.reviewStrip}><span className={styles.reviewIcon}><Icon name="file" width={18} height={18} /></span><span><strong>CV and cover letter</strong><small>Ready for your review</small></span><Icon name="arrow-right" width={18} height={18} /></div>
        </aside>
      </section>
      <section className={styles.nextStep} id="phase1-review" aria-labelledby="review-title">
        <div><p className={styles.kickerLight}>PHASE 1 / FOUNDATION</p><h2 id="review-title">A system built around clear choices.</h2><p>Explore the tokens, accessible controls, and Jobiest product patterns that shape this direction.</p></div>
        <ButtonLink href="/styleguide" variant="lime" iconEnd={<Icon name="arrow-right" />}>Open the styleguide</ButtonLink>
      </section>
      <footer className={styles.footer}><span>Jobiest</span><span>Review preview. No applications are sent from this page.</span></footer>
    </main>
  );
}
