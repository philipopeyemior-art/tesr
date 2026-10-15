import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { Icon } from "@/components/icons/icons";
import styles from "./marketing-shell.module.css";

const navItems = [
  { href: "/how-it-works", label: "How it works" },
  { href: "/tools", label: "Free tools" },
  { href: "/pricing", label: "Pricing" },
  { href: "/support", label: "Support" },
];

const liveSignIn = "https://jobiest.com/login";
const liveSignup = "https://jobiest.com/signup";

function ExternalDescription() {
  return <span className="visually-hidden"> (opens the live Jobiest site in a new tab)</span>;
}

function NavLinks({ activePath }: { activePath: string }) {
  return (
    <>
      {navItems.map((item) => (
        <Link key={item.href} href={item.href} aria-current={activePath === item.href ? "page" : undefined}>
          {item.label}
        </Link>
      ))}
    </>
  );
}

export function MarketingShell({ children, activePath = "/" }: { children: ReactNode; activePath?: string }) {
  return (
    <div className={styles.site}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <Link className={styles.logo} href="/" aria-label="Jobiest home" aria-current={activePath === "/" ? "page" : undefined}>
            <Image src="/logos/wordmark-light-transparent.png" alt="Jobiest" width={544} height={262} priority sizes="156px" />
          </Link>

          <nav className={styles.desktopNav} aria-label="Main navigation">
            <NavLinks activePath={activePath} />
          </nav>

          <div className={styles.accountLinks}>
            <a href={liveSignIn} target="_blank" rel="noopener noreferrer">Sign in<ExternalDescription /></a>
            <a className={styles.headerCta} href={liveSignup} target="_blank" rel="noopener noreferrer">
              Create free account<ExternalDescription />
            </a>
          </div>

          <details className={styles.mobileMenu}>
            <summary><span>Menu</span><Icon name="chevron-down" width={18} height={18} /></summary>
            <nav aria-label="Mobile navigation">
              <NavLinks activePath={activePath} />
              <a href={liveSignIn} target="_blank" rel="noopener noreferrer">Sign in<ExternalDescription /></a>
              <a className={styles.mobileCta} href={liveSignup} target="_blank" rel="noopener noreferrer">
                Create free account<ExternalDescription />
              </a>
            </nav>
          </details>
        </div>
      </header>

      {children}

      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <div className={styles.footerBrand}>
            <Link href="/" aria-label="Jobiest home">
              <Image src="/logos/wordmark-dark-transparent.png" alt="Jobiest" width={544} height={262} loading="lazy" sizes="144px" />
            </Link>
            <p>Truthful job applications, prepared from your experience. You review every send.</p>
          </div>

          <div className={styles.footerLinks}>
            <div>
              <h2>Explore</h2>
              <Link href="/how-it-works">How it works</Link>
              <Link href="/tools">Free tools</Link>
              <Link href="/pricing">Pricing</Link>
            </div>
            <div>
              <h2>Help</h2>
              <Link href="/support">Support</Link>
              <a href="mailto:support@jobiest.com">Email support</a>
            </div>
          </div>

          <p className={styles.copyright}>© 2026 Jobiest. Nothing is sent without your approval.</p>
        </div>
      </footer>
    </div>
  );
}
