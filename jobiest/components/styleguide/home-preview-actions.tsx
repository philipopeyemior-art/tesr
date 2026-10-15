"use client";

import { useState } from "react";
import { Icon } from "@/components/icons/icons";
import { Button } from "@/components/ui/primitives";
import { phase1PreviewMessages } from "@/mocks/phase1-preview";
import styles from "./home-preview-actions.module.css";

export function HomePreviewActions() {
  const [message, setMessage] = useState("");
  return (
    <div>
      <div className={styles.actions}>
        <Button variant="lime" type="button" onClick={() => setMessage(phase1PreviewMessages.account)}>Create free account<Icon name="arrow-right" /></Button>
        <Button variant="dark-outline" type="button" onClick={() => setMessage(phase1PreviewMessages.tools)}>Try the free tools</Button>
      </div>
      <p className={styles.previewNote} aria-live="polite">{message || "This is a design preview. The buttons show the planned next step."}</p>
    </div>
  );
}
