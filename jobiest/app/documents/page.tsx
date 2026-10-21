import type { Metadata } from "next";
import { AppShell } from "@/components/app/app-shell";
import { privateAppMetadata } from "@/components/app/app-metadata";
import { DocumentsView } from "@/components/documents/DocumentsView";

export const metadata: Metadata = privateAppMetadata(
  "My Documents | Jobiest",
  "Review fictional CV and cover letter previews in the Jobiest design workspace.",
);

export default function DocumentsPage() {
  return (
    <AppShell activePath="/documents">
      <DocumentsView />
    </AppShell>
  );
}
