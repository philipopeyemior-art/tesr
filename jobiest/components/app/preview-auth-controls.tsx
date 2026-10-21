"use client";

import { useEffect, useState } from "react";
import styles from "./app-shell.module.css";

export type PreviewTier = "FREE" | "PRO" | "TEAM";

const tiers: { id: PreviewTier; label: string; allowance: string }[] = [
  { id: "FREE", label: "Free preview", allowance: "2 documents" },
  { id: "PRO", label: "Pro preview", allowance: "Unlimited documents" },
  { id: "TEAM", label: "Team preview", allowance: "Shared workspace" },
];

const storageKey = "jobiest-preview-auth-tier";

export function PreviewAuthControls() {
  const [tier, setTier] = useState<PreviewTier>("FREE");
  const current = tiers.find((entry) => entry.id === tier) ?? tiers[0];

  useEffect(() => {
    const storedTier = window.localStorage.getItem(storageKey) as PreviewTier | null;
    if (storedTier && tiers.some((entry) => entry.id === storedTier)) setTier(storedTier);
  }, []);

  function changeTier(value: PreviewTier) {
    setTier(value);
    window.localStorage.setItem(storageKey, value);
  }

  return (
    <div className={styles.authPreview} data-auth-tier={tier}>
      <span className={styles.authIdentity}>Sample workspace</span>
      <label><span className={styles.visuallyHidden}>Preview subscription tier</span><select value={tier} onChange={(event) => changeTier(event.target.value as PreviewTier)} aria-label="Preview subscription tier">{tiers.map((entry) => <option value={entry.id} key={entry.id}>{entry.label}</option>)}</select></label>
      <span className={styles.authAllowance}>{current.allowance}</span>
    </div>
  );
}
