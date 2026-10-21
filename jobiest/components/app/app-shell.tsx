import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { Icon } from "@/components/icons/icons";
import { PreviewAuthControls } from "./preview-auth-controls";
import styles from "./app-shell.module.css";

const appLinks = [
  { href: "/dashboard", label: "Overview", icon: "activity" as const },
  { href: "/jobs", label: "Saved jobs", icon: "briefcase" as const },
  { href: "/applications", label: "Applications", icon: "file" as const },
  { href: "/documents", label: "My documents", icon: "file" as const },
  { href: "/generate", label: "Create a document", icon: "spark" as const },
  { href: "/portfolios", label: "Portfolio Studio", icon: "user" as const },
];

const mobileLinks = ["/dashboard", "/documents", "/applications", "/generate", "/portfolios"];

function AppNavigation({ activePath }: { activePath: string }) {
  return (
    <nav aria-label="App navigation" className={styles.navigation}>
      {appLinks.map((item) => {
        const active = activePath === item.href || (item.href !== "/dashboard" && activePath.startsWith(`${item.href}/`));
        return (
          <Link key={item.href} href={item.href} aria-current={active ? "page" : undefined}>
            <Icon name={item.icon} width={19} height={19} />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

export function AppShell({ children, activePath }: { children: ReactNode; activePath: string }) {
  return (
    <div className={styles.appRoot}>
      <header className={styles.topbar}>
        <div className={styles.topbarInner}>
          <Link className={styles.brand} href="/dashboard" aria-label="Jobiest app overview">
            <Image src="/logos/wordmark-light-transparent.png" alt="Jobiest" width={544} height={262} priority sizes="142px" />
          </Link>
          <PreviewAuthControls />
          <details className={styles.mobileMenu}>
            <summary><span>Menu</span><Icon name="chevron-down" width={18} height={18} /></summary>
            <AppNavigation activePath={activePath} />
          </details>
        </div>
      </header>
      <div className={styles.workspace}>
        <aside className={styles.sidebar} aria-label="Workspace">
          <p className={styles.sidebarLabel}>Workspace</p>
          <AppNavigation activePath={activePath} />
          <div className={styles.sidebarNote}>
            <Icon name="shield" width={20} height={20} />
            <p>Review every document before anything is sent.</p>
          </div>
        </aside>
        <main className={styles.main}>{children}</main>
      </div>
      <nav className={styles.mobileTabs} aria-label="Mobile workspace navigation">
        {mobileLinks.map((href) => { const item = appLinks.find((link) => link.href === href); if (!item) return null; return <Link key={item.href} href={item.href} aria-label={item.label}><Icon name={item.icon} width={18} height={18} /><span>{item.href === "/generate" ? "Create" : item.href === "/applications" ? "Apps" : item.href === "/documents" ? "Docs" : item.href === "/portfolios" ? "Portfolio" : "Overview"}</span></Link>; })}
      </nav>
      <footer className={styles.footer}>
        <p>This is a design preview with sample content. No account, job, document, or application data is saved or sent.</p>
        <Link href="/support">Get support</Link>
      </footer>
    </div>
  );
}
