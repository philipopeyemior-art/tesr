"use client";

import { useId, useRef, type MouseEvent, type ReactNode } from "react";
import { Icon } from "@/components/icons/icons";
import { Button } from "./primitives";
import styles from "./primitives.module.css";

type DialogProps = {
  triggerLabel: string;
  title: string;
  description?: string;
  children: ReactNode;
  continueLabel?: string;
  onContinue?: () => void;
};

export function Dialog({
  triggerLabel,
  title,
  description,
  children,
  continueLabel = "Continue",
  onContinue,
}: DialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const dialogId = useId();
  const titleId = useId();
  const descriptionId = useId();

  function openDialog() {
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) dialog.showModal();
  }

  function closeDialog() {
    dialogRef.current?.close();
  }

  function handleBackdropClick(event: MouseEvent<HTMLDialogElement>) {
    if (event.target === dialogRef.current) closeDialog();
  }

  function handleContinue() {
    onContinue?.();
    closeDialog();
  }

  return (
    <>
      <Button type="button" variant="outline" aria-haspopup="dialog" aria-controls={dialogId} onClick={openDialog}>
        {triggerLabel}
      </Button>
      <dialog
        id={dialogId}
        ref={dialogRef}
        className={styles.modalDialog}
        aria-labelledby={titleId}
        aria-describedby={description ? descriptionId : undefined}
        onClick={handleBackdropClick}
      >
        <div className={styles.modalHeader}>
          <h3 id={titleId}>{title}</h3>
          <button
            className={styles.modalCloseButton}
            type="button"
            onClick={closeDialog}
            aria-label="Close dialog"
            autoFocus
          >
            <Icon name="close" />
          </button>
        </div>
        <div className={styles.modalBody}>
          {description ? <p id={descriptionId}>{description}</p> : null}
          {children}
        </div>
        <footer className={styles.modalFooter}>
          <Button type="button" variant="outline" onClick={closeDialog}>
            Close
          </Button>
          <Button type="button" variant="navy" onClick={handleContinue}>
            {continueLabel}
          </Button>
        </footer>
      </dialog>
    </>
  );
}
