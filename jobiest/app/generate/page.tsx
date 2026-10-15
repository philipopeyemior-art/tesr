import type { Metadata } from "next";
import { AppShell } from "@/components/app/app-shell";
import { privateAppMetadata } from "@/components/app/app-metadata";
import { GenerateWorkbench } from "@/components/app/generate-workbench";
import styles from "@/components/app/app-surfaces.module.css";

type SearchParams = Promise<{ type?: string }>;

export const metadata: Metadata = privateAppMetadata(
  "Jobiest - your AI career agent",
  "Create your professional profile once. Jobiest prepares truthful personalized applications for the roles you bring, applies with your agent on your approval, and tracks everything in one dashboard.",
);

export default async function GeneratePage({ searchParams }: { searchParams: SearchParams }) {
  const { type } = await searchParams;
  return (
    <AppShell activePath="/generate">
      <div className={styles.page}>
        <header className={styles.pageHeader}><div><p className={styles.kicker}>Create a document</p><h1>Make a draft you can review</h1><p>Choose a CV or cover letter, add verified details, and check how the content reads.</p></div></header>
        <GenerateWorkbench initialType={type} />
      </div>
    </AppShell>
  );
}
