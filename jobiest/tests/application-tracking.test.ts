import { describe, expect, it } from "vitest";
import { createDraftApplication, pipeline, seedApplications } from "../lib/application-preview";

describe("application tracking preview", () => {
  it("keeps the four requested pipeline stages and counts", () => {
    expect(pipeline).toEqual([
      { label: "Prepared", count: 2 },
      { label: "Checking", count: 1 },
      { label: "Sent", count: 3 },
      { label: "Verified", count: 1 },
    ]);
  });

  it("seeds five applications across the visible status states", () => {
    expect(seedApplications).toHaveLength(5);
    expect(new Set(seedApplications.map((application) => application.status))).toEqual(new Set(["DRAFT", "PREPARED", "SUBMITTED", "INTERVIEW"]));
    expect(seedApplications.every((application) => application.company && application.title && application.created_at)).toBe(true);
  });

  it("turns pasted role details into a local draft", () => {
    expect(createDraftApplication({ id: "new-1", title: "  Product Designer  ", company: "  Example employer  ", created_at: "2026-10-21" })).toEqual({
      id: "new-1",
      title: "Product Designer",
      company: "Example employer",
      status: "DRAFT",
      created_at: "2026-10-21",
    });
  });

  it("uses safe preview defaults when optional role fields are empty", () => {
    expect(createDraftApplication({}).title).toBe("New role from pasted link");
    expect(createDraftApplication({}).company).toBe("Sample employer");
    expect(createDraftApplication({}).status).toBe("DRAFT");
  });
});
