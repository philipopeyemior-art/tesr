"use client";

import { useEffect, useState } from "react";
import { Icon } from "@/components/icons/icons";
import { resumeTemplates, type ResumeTemplate } from "@/lib/resume-templates";
import { TemplateGallery } from "./TemplateGallery";
import styles from "./TemplateGallery.module.css";

const draftStorageKey = "jobiest-preview-draft";

type StoredDraft = { selectedTemplate?: string };

export function TemplatesStep({ initialTemplateId }: { initialTemplateId?: string }) {
  const [selectedTemplateId, setSelectedTemplateId] = useState(initialTemplateId ?? "");
  const [photoUrl, setPhotoUrl] = useState("");
  const [photoError, setPhotoError] = useState("");

  useEffect(() => {
    try {
      const stored = JSON.parse(window.localStorage.getItem(draftStorageKey) ?? "null") as StoredDraft | null;
      if (!initialTemplateId && stored?.selectedTemplate && resumeTemplates.some((template) => template.id === stored.selectedTemplate)) setSelectedTemplateId(stored.selectedTemplate);
    } catch {
      setSelectedTemplateId(initialTemplateId ?? "");
    }
  }, [initialTemplateId]);

  useEffect(() => {
    try {
      window.localStorage.setItem(draftStorageKey, JSON.stringify({ selectedTemplate: selectedTemplateId } satisfies StoredDraft));
    } catch {
      // Preview persistence is best effort only.
    }
  }, [selectedTemplateId]);

  useEffect(() => () => { if (photoUrl) URL.revokeObjectURL(photoUrl); }, [photoUrl]);

  const selectedTemplate = resumeTemplates.find((template) => template.id === selectedTemplateId);

  function handlePhotoChange(file?: File) {
    setPhotoError("");
    if (!file) return;
    if (!file.type.match(/^image\/(jpeg|png)$/)) {
      setPhotoError("Choose a JPEG or PNG image.");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      setPhotoError("Choose an image under 2MB.");
      return;
    }
    if (photoUrl) URL.revokeObjectURL(photoUrl);
    setPhotoUrl(URL.createObjectURL(file));
  }

  return (
    <div className={styles.stepWrap}>
      <div className={styles.stepDisclosure} role="note"><Icon name="shield" width={19} height={19} /><p><strong>Preview-only template step.</strong> Your selection is saved in this browser only. No template or image is uploaded.</p></div>
      <div className={styles.stepSummary}><div><p className={styles.eyebrow}>Selected template</p><h2>{selectedTemplate?.name ?? "Choose a starting point"}</h2><p>{selectedTemplate ? "This choice is stored in local draft state for the preview." : "Pick a template below to continue your local draft."}</p></div>{selectedTemplate ? <span className={styles.selectedLabel}>Ready</span> : null}</div>
      <TemplateGallery mode="wizard" selectedTemplateId={selectedTemplateId} onSelect={(template: ResumeTemplate) => setSelectedTemplateId(template.id)} />
      <section className={styles.photoPanel} aria-labelledby="photo-upload-title">
        <div><p className={styles.eyebrow}>Optional photo</p><h2 id="photo-upload-title">Add a profile photo</h2><p>Accepted for the photo-capable preview templates. JPEG or PNG, up to 2MB.</p></div>
        <div className={styles.photoUploadRow}><label className={styles.uploadButton} htmlFor="preview-photo">Choose photo<input id="preview-photo" type="file" accept="image/jpeg,image/png" onChange={(event) => handlePhotoChange(event.target.files?.[0])} /></label>{photoUrl ? <img className={styles.photoPreview} src={photoUrl} alt="Local preview upload" /> : <span className={styles.photoEmpty}>No photo selected</span>}</div>
        {photoError ? <p className={styles.photoError} role="alert">{photoError}</p> : <p className={styles.photoNote}>Local preview only. The image is not sent anywhere.</p>}
      </section>
    </div>
  );
}
