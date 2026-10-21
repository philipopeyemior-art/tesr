export type PortfolioTemplate = "clean" | "bold" | "editorial";
export type PortfolioVisibility = "PRIVATE" | "UNLISTED" | "PUBLIC";

export type Portfolio = {
  id: string;
  slug: string;
  title: string;
  template_id: PortfolioTemplate;
  visibility: PortfolioVisibility;
  updated_at: string;
  headline: string;
  about: string;
  skills: string[];
};

export const samplePortfolios: Portfolio[] = [
  {
    id: "portfolio-sample-1",
    slug: "alex-morgan-product-design",
    title: "Alex Morgan · Product design",
    template_id: "clean",
    visibility: "PRIVATE",
    updated_at: "2026-10-18",
    headline: "Product designer shaping calm, useful digital products.",
    about: "A fictional profile preview for showing how a clear portfolio can bring verified work, focus areas, and a short introduction together.",
    skills: ["Product design", "Design systems", "Accessibility"],
  },
  {
    id: "portfolio-sample-2",
    slug: "alex-morgan-research",
    title: "Alex Morgan · Research and strategy",
    template_id: "bold",
    visibility: "UNLISTED",
    updated_at: "2026-10-12",
    headline: "Research-led strategy for products people can understand.",
    about: "This fictional portfolio uses a bold visual system to highlight research themes, product thinking, and selected outcomes.",
    skills: ["User research", "Synthesis", "Product strategy"],
  },
  {
    id: "portfolio-sample-3",
    slug: "alex-morgan-editorial",
    title: "Alex Morgan · Editorial portfolio",
    template_id: "editorial",
    visibility: "PUBLIC",
    updated_at: "2026-10-08",
    headline: "Thoughtful stories and systems for teams making change.",
    about: "A fictional public example showing how an editorial layout can make a portfolio feel personal while staying easy to scan.",
    skills: ["Content design", "Storytelling", "Brand systems"],
  },
];

export const portfolioTemplates: { id: PortfolioTemplate; label: string; note: string }[] = [
  { id: "clean", label: "Clean", note: "Quiet hierarchy and easy scanning" },
  { id: "bold", label: "Bold", note: "Strong blocks for a confident profile" },
  { id: "editorial", label: "Editorial", note: "Large type and considered rhythm" },
];
