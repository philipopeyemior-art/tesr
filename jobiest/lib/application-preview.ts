export type ApplicationStatus = "DRAFT" | "PREPARED" | "SUBMITTED" | "INTERVIEW";
export type Application = { id: string; company: string; title: string; status: ApplicationStatus; created_at: string };

export const pipeline = [
  { label: "Prepared", count: 2 },
  { label: "Checking", count: 1 },
  { label: "Sent", count: 3 },
  { label: "Verified", count: 1 },
] as const;

export const seedApplications: Application[] = [
  { id: "application-1", company: "Example employer", title: "Product Designer", status: "PREPARED", created_at: "2026-10-20" },
  { id: "application-2", company: "Sample company", title: "UX Researcher", status: "DRAFT", created_at: "2026-10-18" },
  { id: "application-3", company: "Fictional studio", title: "Content Designer", status: "SUBMITTED", created_at: "2026-10-15" },
  { id: "application-4", company: "Illustrative employer", title: "Service Designer", status: "INTERVIEW", created_at: "2026-10-11" },
  { id: "application-5", company: "Northstar Labs", title: "Product Designer", status: "SUBMITTED", created_at: "2026-10-06" },
];

export function createDraftApplication(input: { id?: string; title?: string; company?: string; created_at?: string }): Application {
  return {
    id: input.id ?? "application-preview-new",
    company: input.company?.trim() || "Sample employer",
    title: input.title?.trim() || "New role from pasted link",
    status: "DRAFT",
    created_at: input.created_at ?? "2026-10-21",
  };
}
