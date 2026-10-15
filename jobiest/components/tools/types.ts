export type ToolFieldType = "text" | "email" | "url" | "number" | "textarea" | "select" | "file";

export type ToolField = {
  id: string;
  label: string;
  type: ToolFieldType;
  required?: boolean;
  placeholder?: string;
  hint?: string;
  rows?: number;
  accept?: string;
  options?: string[];
};

export type ToolFaq = {
  question: string;
  answer: string;
};

export type RelatedTool = {
  href: string;
  label: string;
  reason: string;
};

export type FreeToolDefinition = {
  id: string;
  route: string;
  productionTitle: string;
  productionDescription: string;
  name: string;
  heading: string;
  introduction: string;
  interactionHeading: string;
  interactionIntroduction: string;
  submitLabel: string;
  fields: ToolField[];
  requiresOneOf?: string[][];
  seoHeading: string;
  seoParagraphs: string[];
  faqs: ToolFaq[];
  relatedTools: RelatedTool[];
};
