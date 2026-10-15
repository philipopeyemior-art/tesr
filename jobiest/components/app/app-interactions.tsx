"use client";

import { useState } from "react";
import { ApplicationPipelineColumn } from "@/components/product/product-components";
import { Button } from "@/components/ui/primitives";
import { sampleApplicationColumns, sampleApplicationRows } from "./sample-data";
import styles from "./app-interactions.module.css";
import surfaceStyles from "./app-surfaces.module.css";

export function ApplicationViewSwitcher() {
  const [view, setView] = useState<"board" | "list">("board");
  return (
    <section aria-label="Application tracking view">
      <div className={styles.viewControls} role="group" aria-label="Choose application view">
        <button type="button" aria-pressed={view === "board"} onClick={() => setView("board")}>Board view</button>
        <button type="button" aria-pressed={view === "list"} onClick={() => setView("list")}>List view</button>
      </div>
      {view === "board" ? (
        <div className={surfaceStyles.boardScroll}>
          <div className={surfaceStyles.board}>
            {sampleApplicationColumns.map((column) => <ApplicationPipelineColumn key={column.title} title={column.title} items={column.items} />)}
          </div>
        </div>
      ) : (
        <ul className={surfaceStyles.applicationList}>
          {sampleApplicationRows.map((row) => (
            <li className={surfaceStyles.applicationRow} key={`${row.role}-${row.employer}`}>
              <div><strong>{row.role}</strong><span>{row.employer} · {row.status}</span></div>
              <span>{row.action}</span>
            </li>
          ))}
        </ul>
      )}
      <p className={styles.sampleCaption}>Sample workflow only. These applications are not connected to an account.</p>
    </section>
  );
}

export function ApprovalPreviewActions() {
  const [message, setMessage] = useState("");
  return (
    <div className={styles.approvalControls}>
      <div className={styles.actionButtons}>
        <Button type="button" variant="lime" onClick={() => setMessage("Preview only. Nothing was sent to an employer.")}>Approve and send</Button>
        <Button type="button" variant="outline" onClick={() => setMessage("Preview only. No changes were requested or saved.")}>Request changes</Button>
      </div>
      <p className={styles.actionDisclosure}>These controls demonstrate the review flow only. They do not send, save, or change an application.</p>
      <p className={styles.actionMessage} role="status" aria-live="polite">{message}</p>
    </div>
  );
}
