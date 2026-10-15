"use client";

import type { ReactNode } from "react";
import { Icon } from "@/components/icons/icons";
import styles from "./primitives.module.css";

type ToastTone = "success" | "info" | "error";

type ToastProps = {
  message: ReactNode;
  onDismiss: () => void;
  tone?: ToastTone;
};

export function Toast({ message, onDismiss, tone = "success" }: ToastProps) {
  const role = tone === "error" ? "alert" : "status";
  const toneClass = tone === "success" ? styles.toastSuccess : tone === "error" ? styles.toastError : styles.toastInfo;

  return (
    <div className={`${styles.toast} ${toneClass}`} role={role} aria-live={role === "alert" ? "assertive" : "polite"} aria-atomic="true">
      <span>{message}</span>
      <button className={styles.toastDismiss} type="button" onClick={onDismiss} aria-label="Dismiss notification">
        <Icon name="close" width={18} height={18} />
      </button>
    </div>
  );
}
