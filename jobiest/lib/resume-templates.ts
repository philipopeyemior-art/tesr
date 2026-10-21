export type TemplateCategory = "minimal" | "modern" | "professional" | "creative" | "executive";
export type TemplateLayout = "single" | "twoCol" | "sidebarLeft" | "sidebarRight";
export type PhotoSupport = "none" | "optional" | "required";

export type ResumeTemplate = {
  id: string;
  name: string;
  category: TemplateCategory;
  layout: TemplateLayout;
  accent: string;
  atsFriendly: boolean;
  photoSupport: PhotoSupport;
  columns: 1 | 2;
};

const navy = "#111d35";
const lime = "#d7f94b";
const blue = "#3b72bc";
const ink = "#17223b";
const muted = "#5d6b85";
const soft = "#e9f98b";

export const resumeTemplates: ResumeTemplate[] = [
  { id: "northstar", name: "Northstar", category: "minimal", layout: "single", accent: navy, atsFriendly: true, photoSupport: "optional", columns: 1 },
  { id: "clearline", name: "Clearline", category: "minimal", layout: "single", accent: blue, atsFriendly: true, photoSupport: "optional", columns: 1 },
  { id: "baseline", name: "Baseline", category: "minimal", layout: "single", accent: ink, atsFriendly: true, photoSupport: "none", columns: 1 },
  { id: "quiet-space", name: "Quiet Space", category: "minimal", layout: "single", accent: muted, atsFriendly: true, photoSupport: "none", columns: 1 },
  { id: "lumen", name: "Lumen", category: "minimal", layout: "sidebarLeft", accent: soft, atsFriendly: true, photoSupport: "optional", columns: 2 },
  { id: "gridline", name: "Gridline", category: "modern", layout: "twoCol", accent: blue, atsFriendly: true, photoSupport: "optional", columns: 2 },
  { id: "signal", name: "Signal", category: "modern", layout: "sidebarLeft", accent: lime, atsFriendly: true, photoSupport: "optional", columns: 2 },
  { id: "orbit", name: "Orbit", category: "modern", layout: "sidebarRight", accent: navy, atsFriendly: true, photoSupport: "optional", columns: 2 },
  { id: "daybreak", name: "Daybreak", category: "modern", layout: "single", accent: soft, atsFriendly: true, photoSupport: "optional", columns: 1 },
  { id: "momentum", name: "Momentum", category: "modern", layout: "twoCol", accent: ink, atsFriendly: true, photoSupport: "none", columns: 2 },
  { id: "ledger", name: "Ledger", category: "professional", layout: "single", accent: navy, atsFriendly: true, photoSupport: "none", columns: 1 },
  { id: "proof", name: "Proof", category: "professional", layout: "sidebarLeft", accent: blue, atsFriendly: true, photoSupport: "none", columns: 2 },
  { id: "anchor", name: "Anchor", category: "professional", layout: "single", accent: ink, atsFriendly: true, photoSupport: "none", columns: 1 },
  { id: "meridian", name: "Meridian", category: "professional", layout: "sidebarRight", accent: navy, atsFriendly: true, photoSupport: "none", columns: 2 },
  { id: "atelier", name: "Atelier", category: "creative", layout: "sidebarLeft", accent: blue, atsFriendly: false, photoSupport: "optional", columns: 2 },
  { id: "canvas", name: "Canvas", category: "creative", layout: "single", accent: lime, atsFriendly: false, photoSupport: "required", columns: 1 },
  { id: "signal-fire", name: "Signal Fire", category: "creative", layout: "sidebarRight", accent: soft, atsFriendly: false, photoSupport: "optional", columns: 2 },
  { id: "mosaic", name: "Mosaic", category: "creative", layout: "twoCol", accent: blue, atsFriendly: false, photoSupport: "required", columns: 2 },
  { id: "studio", name: "Studio", category: "creative", layout: "single", accent: ink, atsFriendly: false, photoSupport: "optional", columns: 1 },
  { id: "folio", name: "Folio", category: "creative", layout: "sidebarLeft", accent: navy, atsFriendly: false, photoSupport: "none", columns: 2 },
  { id: "crown", name: "Crown", category: "executive", layout: "single", accent: navy, atsFriendly: false, photoSupport: "required", columns: 1 },
  { id: "boardroom", name: "Boardroom", category: "executive", layout: "sidebarRight", accent: ink, atsFriendly: false, photoSupport: "required", columns: 2 },
  { id: "summit", name: "Summit", category: "executive", layout: "single", accent: blue, atsFriendly: false, photoSupport: "none", columns: 1 },
  { id: "capital", name: "Capital", category: "executive", layout: "twoCol", accent: navy, atsFriendly: false, photoSupport: "none", columns: 2 },
  { id: "principal", name: "Principal", category: "executive", layout: "single", accent: muted, atsFriendly: false, photoSupport: "none", columns: 1 },
  { id: "legacy", name: "Legacy", category: "executive", layout: "sidebarLeft", accent: soft, atsFriendly: false, photoSupport: "none", columns: 2 },
  { id: "modernist", name: "Modernist", category: "modern", layout: "sidebarRight", accent: lime, atsFriendly: false, photoSupport: "none", columns: 2 },
  { id: "chapter", name: "Chapter", category: "professional", layout: "single", accent: blue, atsFriendly: false, photoSupport: "none", columns: 1 },
  { id: "folio-plus", name: "Folio Plus", category: "creative", layout: "sidebarRight", accent: lime, atsFriendly: false, photoSupport: "none", columns: 2 },
  { id: "plainspoken", name: "Plainspoken", category: "minimal", layout: "single", accent: navy, atsFriendly: false, photoSupport: "none", columns: 1 },
];

export const templateCategories: TemplateCategory[] = ["minimal", "modern", "professional", "creative", "executive"];

export function recommendedTemplates(templates = resumeTemplates) {
  return templates.filter((template) => template.atsFriendly).slice(0, 2);
}

export function templateDescription(template: ResumeTemplate) {
  const columnText = template.columns === 2 ? "two-column" : "single-column";
  return `${template.category[0].toUpperCase()}${template.category.slice(1)} ${columnText} layout with a ${template.photoSupport === "none" ? "text-first" : "photo-ready"} structure.`;
}
