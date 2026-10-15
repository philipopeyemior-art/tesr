import type { Metadata } from "next";
import Link from "next/link";
import { Icon, type IconName } from "@/components/icons/icons";
import { MarketingShell } from "@/components/marketing/marketing-shell";
import { marketingMetadata } from "@/components/marketing/metadata";
import { AgentTimeline, ToolResultHero } from "@/components/product/product-components";
import styles from "./marketing.module.css";

export const metadata: Metadata = marketingMetadata({
  title: "Jobiest - Your AI Agent for the Job Search",
  description:
    "The AI agent for your job search: tell it your criteria once, add the jobs you want, and it tailors your CV and cover letter and submits after your approval. Start free.",
  path: "/",
});

const liveSignup = "https://jobiest.com/signup";
const liveTools = "https://jobiest.com/tools";

const toolLinks = [
  ["ATS Resume Scanner", "https://jobiest.com/free-ats-resume-scanner"],
  ["Job Description Analyzer", "https://jobiest.com/free-job-description-analyzer"],
  ["Skills Matcher", "https://jobiest.com/free-skills-matcher"],
  ["Salary Insights", "https://jobiest.com/free-salary-insights"],
  ["Interview Question Generator", "https://jobiest.com/free-interview-question-generator"],
  ["LinkedIn Headline Builder", "https://jobiest.com/free-linkedin-headline-builder"],
  ["Cover Letter Writer", "https://jobiest.com/free-cover-letter-writer"],
  ["Resume Summary Generator", "https://jobiest.com/free-resume-summary-generator"],
  ["Follow-up Email Writer", "https://jobiest.com/free-follow-up-email-writer"],
  ["Career Path Explorer", "https://jobiest.com/free-career-path-explorer"],
] as const;

const steps: { number: string; title: string; body: string; sample: string; icon: IconName }[] = [
  {
    number: "1",
    title: "Set your criteria",
    body: "Tell Jobiest your target roles, locations, salary needs, and must-haves once.",
    sample: "Your search preferences become clear profile facts.",
    icon: "user",
  },
  {
    number: "2",
    title: "Add the jobs you want",
    body: "Paste a job link or listing. The agent checks the role against your verified experience.",
    sample: "Gaps are flagged. Unsupported claims are never filled in.",
    icon: "briefcase",
  },
  {
    number: "3",
    title: "Review and approve",
    body: "Read the tailored CV and cover letter. Approve, edit, or ask for changes before anything sends.",
    sample: "Nothing goes to an employer without your explicit approval.",
    icon: "shield",
  },
];

const faqs = [
  {
    question: "Does Jobiest invent experience to improve an application?",
    answer:
      "No. It uses verified facts from your profile. If a fact is missing or unsupported, it flags the gap instead of guessing.",
  },
  {
    question: "Does anything get sent without my approval?",
    answer:
      "No. You review the job details, CV, and cover letter before an application can move forward.",
  },
  {
    question: "Can I use the free tools without an account?",
    answer:
      "Yes. The ten public career tools are designed to work without an account.",
  },
  {
    question: "What is included in the free plan?",
    answer:
      "The free plan includes 3 CV or cover letter generations and 10 tool uses a day.",
  },
];

export default function HomePage() {
  return (
    <MarketingShell activePath="/">
      <main className={styles.page}>
        <section className={styles.hero} aria-labelledby="home-title">
          <div className={styles.heroInner}>
            <div className={styles.heroCopy}>
              <p className={styles.eyebrow}>
                <Icon name="spark" width={17} height={17} />
                AI career agent
              </p>
              <h1 id="home-title">
                Your AI agent for the job search. <span>You approve everything it sends.</span>
              </h1>
              <p className={styles.heroLead}>
                Set your criteria once. Add the jobs you want. Jobiest prepares truthful applications from your verified experience, then shows you every change before anything goes to an employer.
              </p>
              <div className={styles.heroActions}>
                <a className={styles.primaryAction} href={liveSignup} target="_blank" rel="noopener noreferrer">
                  Create free account
                  <span className="visually-hidden"> (opens the live Jobiest site in a new tab)</span>
                  <Icon name="arrow-right" width={18} height={18} />
                </a>
                <a className={styles.secondaryAction} href={liveTools} target="_blank" rel="noopener noreferrer">
                  Try the free tools
                  <span className="visually-hidden"> (opens the live Jobiest site in a new tab)</span>
                </a>
              </div>
              <p className={styles.heroTrust}>
                <Icon name="shield" width={19} height={19} />
                Nothing is sent without your approval.
              </p>
              <span className={styles.heroFreeFact}>
                <Icon name="check-circle" width={16} height={16} />
                Free plan: 3 CV or cover letter generations and 10 tool uses a day
              </span>
            </div>

            <aside className={styles.heroPanel} aria-label="Example of the Jobiest agent at work">
              <div className={styles.panelHeader}>
                <div>
                  <span className={styles.eyebrow}>Example work</span>
                  <h2>The agent shows its work</h2>
                </div>
                <span className={styles.panelBadge}>Review first</span>
              </div>
              <AgentTimeline
                label="Example agent activity"
                events={[
                  {
                    verb: "Reviewed verified experience",
                    detail: "Compared saved evidence with the job requirements.",
                    timeLabel: "Example preparation step",
                    state: "current",
                  },
                  {
                    verb: "Flagged an unsupported claim",
                    detail: "Left it out instead of guessing.",
                    timeLabel: "Example truthfulness check",
                    state: "complete",
                  },
                ]}
              />
              <div className={styles.panelApproval}>
                <span className={styles.panelApprovalIcon}>
                  <Icon name="file" width={18} height={18} />
                </span>
                <span className={styles.panelApprovalText}>
                  <strong>CV and cover letter</strong>
                  <small>Ready for you to review</small>
                </span>
                <Icon name="arrow-right" width={18} height={18} />
              </div>
            </aside>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="steps-title">
          <div className={styles.container}>
            <div className={styles.sectionHead}>
              <p className={styles.eyebrow}>How it works</p>
              <h2 id="steps-title">A calmer way to prepare job applications.</h2>
              <p>Jobiest handles the repetitive preparation. You bring the facts and decide what leaves your account.</p>
            </div>
            <div className={styles.stepsGrid}>
              {steps.map((step) => (
                <article className={styles.stepCard} key={step.number}>
                  <div className={styles.stepTop}>
                    <span className={styles.stepNumber}>{step.number}</span>
                    <Icon name={step.icon} width={22} height={22} />
                  </div>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                  <div className={styles.stepSample}>
                    <strong>What this means</strong>
                    <span>{step.sample}</span>
                  </div>
                </article>
              ))}
            </div>
            <Link className={styles.inlineCta} href="/how-it-works">
              See the full three-step flow <Icon name="arrow-right" width={17} height={17} />
            </Link>
          </div>
        </section>

        <section className={`${styles.section} ${styles.sectionSoft}`} aria-labelledby="proof-title">
          <div className={styles.container}>
            <div className={styles.sectionHead}>
              <p className={styles.eyebrow}>Proof before promises</p>
              <h2 id="proof-title">Useful results, with the limits in view.</h2>
              <p>These are actual tool outputs from clearly fictional test inputs. The ATS score belongs only to one incomplete sample CV. Salary Insights found no stated pay in one fictional listing. Neither is a benchmark or market estimate.</p>
            </div>
            <div className={styles.proofGrid}>
              <article className={styles.proofCard}>
                <p className={styles.eyebrow}>ATS Resume Scanner</p>
                <h3>Rule-based checks you can inspect</h3>
                <p>The live tool checks parseability and core CV structure, with optional role-keyword overlap.</p>
                <ToolResultHero
                  eyebrow="Fictional sample CV · 47 words"
                  metric="54 / 100"
                  detail="This score belongs to this deliberately incomplete sample. It is not a typical result or a measure of candidate worth."
                >
                  <ul className={styles.resultFindings} aria-label="Actual findings from the fictional sample scan">
                    <li>Length flagged at 47 words. No email found; phone found.</li>
                    <li>3 of 3 standard sections and year references detected.</li>
                    <li>Action verbs flagged as weak. 7 of 12 role terms matched.</li>
                  </ul>
                </ToolResultHero>
                <a className={styles.inlineCta} href="https://jobiest.com/free-ats-resume-scanner" target="_blank" rel="noopener noreferrer">
                  Open the real ATS scanner
                  <span className="visually-hidden"> (opens the live Jobiest site in a new tab)</span>
                  <Icon name="arrow-up-right" width={17} height={17} />
                </a>
              </article>
              <article className={styles.proofCard}>
                <p className={styles.eyebrow}>Salary Insights</p>
                <h3>Stated pay only</h3>
                <p>The tool reports the pay that your pasted listing explicitly states. It does not create a market average when the listing is silent.</p>
                <ToolResultHero
                  eyebrow="Fictional listing · pay omitted"
                  metric="0 stated pay"
                  detail="Actual output: 1 listing source(s) scanned. No estimates or averages are included."
                >
                  <p className={styles.resultContext}>The single fictional listing did not state compensation, so no salary figure appears.</p>
                </ToolResultHero>
                <a className={styles.inlineCta} href="https://jobiest.com/free-salary-insights" target="_blank" rel="noopener noreferrer">
                  Open Salary Insights
                  <span className="visually-hidden"> (opens the live Jobiest site in a new tab)</span>
                  <Icon name="arrow-up-right" width={17} height={17} />
                </a>
              </article>
            </div>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="tools-title">
          <div className={styles.container}>
            <div className={styles.sectionHead}>
              <p className={styles.eyebrow}>Free career tools</p>
              <h2 id="tools-title">Ten tools for the parts that eat your week.</h2>
              <p>Use them without an account. Each result works from the text you provide, and missing facts stay missing.</p>
            </div>
            <div className={styles.toolGrid}>
              {toolLinks.map(([label, href]) => (
                <a className={styles.toolLink} key={label} href={href} target="_blank" rel="noopener noreferrer">
                  {label}
                  <span className="visually-hidden"> (opens the live Jobiest site in a new tab)</span>
                  <Icon name="arrow-up-right" width={17} height={17} />
                </a>
              ))}
            </div>
            <Link className={styles.inlineCta} href="/tools">
              See all tool details <Icon name="arrow-right" width={17} height={17} />
            </Link>
          </div>
        </section>

        <section className={`${styles.section} ${styles.sectionSoft}`} aria-labelledby="pricing-title">
          <div className={styles.container}>
            <div className={styles.pricingTeaser}>
              <div>
                <p className={styles.eyebrow}>Start free</p>
                <h2 id="pricing-title">Try the useful part before you pay.</h2>
                <p>The free plan includes 3 CV or cover letter generations and 10 tool uses a day. Paid plans start at ₦5,000 a month in Nigeria or $3.99 a month globally.</p>
                <Link className={styles.inlineCta} href="/pricing">
                  Compare the plans <Icon name="arrow-right" width={17} height={17} />
                </Link>
              </div>
              <div className={styles.priceStart}>
                <strong>₦0 to begin</strong>
                <span>No card is needed for the free tools.</span>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="faq-title">
          <div className={styles.container}>
            <div className={styles.sectionHead}>
              <p className={styles.eyebrow}>Questions, answered</p>
              <h2 id="faq-title">Trust should not need a footnote.</h2>
            </div>
            <div className={styles.faqList}>
              {faqs.map((faq, index) => (
                <details key={faq.question} open={index === 0}>
                  <summary>{faq.question}</summary>
                  <p>{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="home-cta-title">
          <div className={styles.container}>
            <div className={styles.ctaBand}>
              <div>
                <h2 id="home-cta-title">Your next step stays yours.</h2>
                <p>Start with the free tools or create an account when you want the agent to prepare applications.</p>
              </div>
              <a className={styles.primaryAction} href={liveSignup} target="_blank" rel="noopener noreferrer">
                Create free account
                <span className="visually-hidden"> (opens the live Jobiest site in a new tab)</span>
                <Icon name="arrow-right" width={18} height={18} />
              </a>
            </div>
          </div>
        </section>
      </main>
    </MarketingShell>
  );
}
