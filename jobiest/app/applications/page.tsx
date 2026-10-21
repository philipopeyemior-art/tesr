import type { Metadata } from "next";
import { AppShell } from "@/components/app/app-shell";
import { privateAppMetadata } from "@/components/app/app-metadata";
import { ApplicationsView } from "@/components/applications/ApplicationsView";

export const metadata: Metadata = privateAppMetadata(
  "Applications | Jobiest",
  "Track fictional Jobiest application stages in a preview-only workspace.",
);

export default function ApplicationsPage() {
  return (
    <AppShell activePath="/applications">
      <ApplicationsView />
    </AppShell>
  );
}
