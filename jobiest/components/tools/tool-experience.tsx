"use client";

import { useId, useState, type FormEvent } from "react";
import { Icon } from "@/components/icons/icons";
import { createPreviewOnlyResult, getVerifiedSampleResult } from "@/mocks/free-tools";
import type { FreeToolDefinition, ToolField } from "./types";
import styles from "./tool-experience.module.css";

type View = "form" | "preview-result" | "sample-result";

function ToolInput({ field, idPrefix }: { field: ToolField; idPrefix: string }) {
  const id = `${idPrefix}-${field.id}`;
  const hintId = field.hint ? `${id}-hint` : undefined;
  const common = {
    id,
    name: field.id,
    required: field.required,
    placeholder: field.placeholder,
    "aria-describedby": hintId,
  };

  return (
    <div className={`${styles.field} ${field.type === "textarea" ? styles.fieldWide : ""}`}>
      <label htmlFor={id}>
        <span className={styles.fieldLabel}>{field.label}{field.required ? <span aria-hidden="true"> *</span> : null}</span>
      </label>
      {field.type === "textarea" ? (
        <textarea {...common} rows={field.rows ?? 5} />
      ) : field.type === "select" ? (
        <select {...common} defaultValue="">
          <option value="" disabled>Select an option</option>
          {(field.options ?? []).map((option) => <option key={option} value={option}>{option}</option>)}
        </select>
      ) : (
        <input {...common} type={field.type} accept={field.accept} />
      )}
      {field.hint ? <p className={styles.fieldHint} id={hintId}>{field.hint}</p> : null}
    </div>
  );
}

export function ToolExperience({ tool }: { tool: FreeToolDefinition }) {
  const idPrefix = useId();
  const [view, setView] = useState<View>("form");
  const [validationMessage, setValidationMessage] = useState("");
  const liveToolUrl = `https://jobiest.com${tool.route}`;
  const sample = getVerifiedSampleResult(tool.id);
  const previewResult = createPreviewOnlyResult(tool.name, liveToolUrl);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const missingGroup = tool.requiresOneOf?.find((fieldIds) => !fieldIds.some((fieldId) => {
      const value = formData.get(fieldId);
      return typeof value === "string" ? value.trim().length > 0 : value !== null && value.size > 0;
    }));

    if (missingGroup) {
      const labels = missingGroup.map((fieldId) => tool.fields.find((field) => field.id === fieldId)?.label ?? fieldId);
      setValidationMessage(`Provide one of these: ${labels.join(" or ")}.`);
      return;
    }

    setValidationMessage("");
    setView("preview-result");
  }

  if (view === "preview-result") {
    return (
      <section className={styles.interactionCard} aria-labelledby={`${idPrefix}-result-title`}>
        <p className={styles.eyebrow}>Preview result</p>
        <h2 id={`${idPrefix}-result-title`}>{previewResult.headline}</h2>
        <p className={styles.resultDetail}>{previewResult.detail}</p>
        <div className={styles.resultActions}>
          <a className={styles.primaryAction} href={previewResult.liveToolUrl} target="_blank" rel="noopener noreferrer">
            Continue with the live {tool.name}
            <span className="visually-hidden"> (opens the live Jobiest site in a new tab)</span>
            <Icon name="arrow-up-right" width={17} height={17} />
          </a>
          {sample ? <button className={styles.secondaryAction} type="button" onClick={() => setView("sample-result")}>View the verified sample output</button> : null}
          <button className={styles.textAction} type="button" onClick={() => setView("form")}>Back to the inputs</button>
        </div>
      </section>
    );
  }

  if (view === "sample-result" && sample) {
    return (
      <section className={styles.interactionCard} aria-labelledby={`${idPrefix}-sample-title`}>
        <p className={styles.eyebrow}>{sample.label}</p>
        <h2 id={`${idPrefix}-sample-title`}>{sample.headline}</h2>
        <ul className={styles.sampleDetails}>
          {sample.details.map((detail) => <li key={detail}>{detail}</li>)}
        </ul>
        <p className={styles.sampleCaveat}>{sample.caveat}</p>
        <div className={styles.resultActions}>
          <a className={styles.primaryAction} href={sample.liveToolUrl} target="_blank" rel="noopener noreferrer">
            Try the live {tool.name}
            <span className="visually-hidden"> (opens the live Jobiest site in a new tab)</span>
            <Icon name="arrow-up-right" width={17} height={17} />
          </a>
          <button className={styles.textAction} type="button" onClick={() => setView("form")}>Back to the inputs</button>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.interactionCard} aria-labelledby={`${idPrefix}-form-title`}>
      <div className={styles.formHeading}>
        <p className={styles.eyebrow}>Tool preview</p>
        <h2 id={`${idPrefix}-form-title`}>{tool.interactionHeading}</h2>
        <p>{tool.interactionIntroduction}</p>
      </div>
      <div className={styles.previewNotice} role="note">
        <Icon name="eye" width={18} height={18} />
        <p>This redesign preview does not perform the analysis or send the information you enter. It shows the interface only.</p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className={styles.fields}>
          {tool.fields.map((field) => <ToolInput key={field.id} field={field} idPrefix={idPrefix} />)}
        </div>
        {validationMessage ? <p className={styles.validationError} role="alert">{validationMessage}</p> : null}
        <div className={styles.formActions}>
          <button className={styles.primaryAction} type="submit">
            {tool.submitLabel}
            <Icon name="arrow-right" width={17} height={17} />
          </button>
          {sample ? <button className={styles.secondaryAction} type="button" onClick={() => setView("sample-result")}>View the verified sample output</button> : null}
        </div>
      </form>
    </section>
  );
}
