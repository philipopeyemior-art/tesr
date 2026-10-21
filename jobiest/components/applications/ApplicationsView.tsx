"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { Icon } from "@/components/icons/icons";
import { createDraftApplication, pipeline, seedApplications, type Application, type ApplicationStatus } from "@/lib/application-preview";
import styles from "./applications-view.module.css";

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en", { month: "short", day: "numeric", year: "numeric" }).format(new Date(`${value}T12:00:00`));
}

function statusLabel(status: ApplicationStatus) {
  return { DRAFT: "Draft", PREPARED: "Prepared", SUBMITTED: "Submitted", INTERVIEW: "Interview" }[status];
}

export function ApplicationsView() {
  const [applications, setApplications] = useState<Application[]>(seedApplications);
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");

  function addApplication(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextTitle = title.trim() || "New role from pasted link";
    const nextCompany = company.trim() || "Sample employer";
    setApplications((current) => [createDraftApplication({ id: `application-preview-${Date.now()}`, company: nextCompany, title: nextTitle, created_at: new Date().toISOString().slice(0, 10) }), ...current]);
    setMessage(`${nextTitle} added as a draft. Nothing was submitted.`);
    setUrl(""); setTitle(""); setCompany("");
  }

  return (
    <div className={styles.page}>
      <header className={styles.hero}><div><p className={styles.eyebrow}>Applications</p><h1>See every role move forward.</h1><p>Paste a job link to make a fictional draft, then keep review and approval visible at every step.</p></div><div className={styles.heroCount}><strong>{applications.length}</strong><span>sample applications</span></div></header>
      <div className={styles.notice} role="note"><Icon name="shield" width={19} height={19} /><p><strong>Approval stays first.</strong> These cards are fictional. No employer receives anything from this preview workspace.</p></div>
      <section className={styles.pipelineSection} aria-labelledby="pipeline-heading"><div className={styles.sectionHeading}><div><p className={styles.eyebrow}>Command view</p><h2 id="pipeline-heading">Application pipeline</h2></div><span>Counts are sample workflow markers</span></div><div className={styles.pipelineRail}>{pipeline.map((stage, index) => <div className={styles.pipelineNode} key={stage.label}><span className={styles.pipelineDot}>{stage.count}</span><div><strong>{stage.count}</strong><span>{stage.label}</span></div>{index < pipeline.length - 1 ? <span className={styles.pipelineConnector} aria-hidden="true" /> : null}</div>)}</div></section>
      <section className={styles.addCard} aria-labelledby="add-application-heading"><div><p className={styles.eyebrow}>Start with a job link</p><h2 id="add-application-heading">Paste a role to create a draft</h2><p>Add the details you want shown on the local application card.</p></div><form className={styles.jobForm} onSubmit={addApplication}><label>Job link<input required value={url} onChange={(event) => setUrl(event.target.value)} placeholder="https://example.com/jobs/product-designer" type="url" /></label><label>Role title<input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Product Designer" /></label><label>Company<input value={company} onChange={(event) => setCompany(event.target.value)} placeholder="Example employer" /></label><button className={styles.primaryButton} type="submit"><Icon name="spark" width={17} height={17} />Create draft</button></form>{message ? <p className={styles.formMessage} role="status">{message}</p> : null}</section>
      <section className={styles.applicationSection} aria-labelledby="application-list-heading"><div className={styles.sectionHeading}><div><p className={styles.eyebrow}>Timeline</p><h2 id="application-list-heading">Your application list</h2></div><span>{applications.length} fictional roles</span></div><div className={styles.applicationList}>{applications.map((application) => <article className={styles.applicationCard} key={application.id}><span className={styles.timelineDot} aria-hidden="true" /><div className={styles.applicationMain}><div><p className={styles.company}>{application.company}</p><h3>{application.title}</h3><p className={styles.created}>Added {formatDate(application.created_at)}</p></div><span className={`${styles.appStatus} ${styles[`status${application.status}`]}`}>{statusLabel(application.status)}</span></div><div className={styles.applicationActions}>{application.status === "PREPARED" || application.status === "DRAFT" ? <Link href="/approvals/demo" className={styles.secondaryButton}>Review</Link> : <button className={styles.secondaryButton} type="button" onClick={() => setMessage(`${application.title} is a fictional ${statusLabel(application.status).toLowerCase()} example.`)}>View status</button>}</div></article>)}</div></section>
      <section className={styles.approvalRule}><p className={styles.eyebrow}>Approval rule</p><h2>Nothing is submitted without your approval.</h2><p>A prepared application stays available for review until you approve the exact documents and job details.</p></section>
    </div>
  );
}
