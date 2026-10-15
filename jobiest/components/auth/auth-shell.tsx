import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import styles from "./auth-shell.module.css";

export function AuthShell({ children }: { children: ReactNode }) {
  return (
    <main className={styles.authPage}>
      <div className={styles.authCard}>
        <Link className={styles.logo} href="/" aria-label="Jobiest home">
          <Image src="/logos/wordmark-light-transparent.png" alt="Jobiest" width={544} height={262} priority sizes="172px" />
        </Link>
        <p className={styles.previewNotice}>Design preview only. No account or session will be created.</p>
        {children}
        <Link className={styles.returnLink} href="/">Back to Jobiest</Link>
      </div>
    </main>
  );
}
