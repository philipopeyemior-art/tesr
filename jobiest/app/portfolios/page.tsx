import type { Metadata } from "next";
import { AppShell } from "@/components/app/app-shell";
import { privateAppMetadata } from "@/components/app/app-metadata";
import { PortfolioStudio } from "@/components/portfolio/PortfolioStudio";

export const metadata: Metadata = privateAppMetadata(
  "Portfolio Studio | Jobiest",
  "Build and preview a fictional Jobiest portfolio locally in this design preview.",
);

export default function PortfoliosPage() {
  return (
    <AppShell activePath="/portfolios">
      <PortfolioStudio />
    </AppShell>
  );
}
