import { AppShell } from "@/components/app/app-shell";
import { privateAppMetadata } from "@/components/app/app-metadata";
import { DashboardView } from "@/components/dashboard/DashboardView";

export const metadata = privateAppMetadata(
  "Jobiest Command Deck",
  "A preview dashboard for reviewing job application progress and choosing the next step.",
);

export default function DashboardPage() {
  return (
    <AppShell activePath="/dashboard">
      <DashboardView />
    </AppShell>
  );
}
