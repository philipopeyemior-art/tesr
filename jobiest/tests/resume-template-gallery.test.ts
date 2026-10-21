import { describe, expect, it } from "vitest";
import { recommendedTemplates, resumeTemplates, templateCategories, templateDescription } from "../lib/resume-templates";

describe("resume template gallery catalog", () => {
  it("keeps 30 unique templates reachable by id", () => {
    expect(resumeTemplates).toHaveLength(30);
    expect(new Set(resumeTemplates.map((template) => template.id)).size).toBe(30);
    expect(new Set(resumeTemplates.map((template) => template.name)).size).toBe(30);
  });

  it("keeps the library filter groups complete", () => {
    expect(templateCategories).toEqual(["minimal", "modern", "professional", "creative", "executive"]);
    expect(resumeTemplates.filter((template) => template.atsFriendly)).toHaveLength(14);
    expect(resumeTemplates.filter((template) => template.photoSupport !== "none")).toHaveLength(14);
    expect(resumeTemplates.filter((template) => template.columns === 1)).toHaveLength(14);
    expect(resumeTemplates.filter((template) => template.columns === 2)).toHaveLength(16);
  });

  it("recommends ATS-friendly templates first", () => {
    const recommended = recommendedTemplates();
    expect(recommended).toHaveLength(2);
    expect(recommended.every((template) => template.atsFriendly)).toBe(true);
  });

  it("describes each preview using its real metadata", () => {
    for (const template of resumeTemplates) {
      const description = templateDescription(template);
      expect(description).toContain(template.category[0].toUpperCase() + template.category.slice(1));
      expect(description).toContain(template.columns === 2 ? "two-column" : "single-column");
    }
  });
});
