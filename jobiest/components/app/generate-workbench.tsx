"use client";

import { useMemo, useState } from "react";
import { DocumentPreviewFrame } from "@/components/product/document-preview";
import { Icon } from "@/components/icons/icons";
import styles from "./generate-workbench.module.css";

type DocumentKind = "CV" | "Cover letter";

export function GenerateWorkbench({ initialType = "cv" }: { initialType?: string }) {
  const [kind, setKind] = useState<DocumentKind>(initialType === "letter" ? "Cover letter" : "CV");
  const [role, setRole] = useState("Product Designer");
  const [experience, setExperience] = useState("");
  const [evidence, setEvidence] = useState("");

  const previewPages = useMemo(() => {
    if (kind === "Cover letter") {
      return [`Dear Hiring team,\n\nI am interested in the ${role || "role"}.\n\n${experience || "Add only experience you can verify. This preview reflects the text you enter and does not invent qualifications."}\n\n${evidence ? `Relevant evidence: ${evidence}` : "Add a relevant example to support your application."}\n\nKind regards\nYour name`];
    }
    return [
      `Your name\n${role || "Target role"}\n\nProfessional summary\n${experience || "Add verified experience in the form. This preview only reflects the text you enter."}`,
      `Evidence for this role\n\n${evidence || "Add a specific example, skill, or result you can support."}\n\nReview each statement before using it in an application.`,
    ];
  }, [evidence, experience, kind, role]);

  return (
    <div className={styles.workbench}>
      <div className={styles.disclosure} role="note"><Icon name="shield" width={20} height={20} /><p><strong>Local preview only.</strong> No AI generation runs here. The preview uses only the text you enter and is not saved or sent.</p></div>
      <div className={styles.workbenchGrid}>
        <form className={styles.form} onSubmit={(event) => event.preventDefault()}>
          <fieldset className={styles.documentType}>
            <legend>Choose a document</legend>
            <label><input type="radio" name="document-kind" checked={kind === "CV"} onChange={() => setKind("CV")} /> CV</label>
            <label><input type="radio" name="document-kind" checked={kind === "Cover letter"} onChange={() => setKind("Cover letter")} /> Cover letter</label>
          </fieldset>
          <label className={styles.field} htmlFor="target-role"><span>Target role</span><input id="target-role" value={role} onChange={(event) => setRole(event.target.value)} /></label>
          <label className={styles.field} htmlFor="verified-experience"><span>Verified experience</span><textarea id="verified-experience" value={experience} onChange={(event) => setExperience(event.target.value)} placeholder="Add experience you can support with evidence." /></label>
          <label className={styles.field} htmlFor="supporting-evidence"><span>Supporting evidence</span><textarea id="supporting-evidence" value={evidence} onChange={(event) => setEvidence(event.target.value)} placeholder="Add a result, skill, or example you can verify." /></label>
          <p className={styles.fieldHint}>Keep unsupported claims out. This preview does not verify the content.</p>
        </form>
        <section className={styles.previewColumn} aria-labelledby="live-preview-title">
          <div className={styles.previewHeading}><div><p className={styles.kicker}>Live preview</p><h2 id="live-preview-title">Your {kind.toLowerCase()}</h2></div><span>Updates as you type</span></div>
          <DocumentPreviewFrame title={role || "Untitled draft"} kind={kind} pages={previewPages} />
        </section>
      </div>
    </div>
  );
}
