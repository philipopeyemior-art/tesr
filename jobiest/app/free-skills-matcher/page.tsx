import type { Metadata } from "next";
import { FreeToolPage } from "@/components/tools/free-tool-page";
import { marketingMetadata } from "@/components/marketing/metadata";
import { freeTools } from "@/components/tools/tool-catalog";

const tool = freeTools.skills;

export const metadata: Metadata = marketingMetadata({
  title: tool.productionTitle,
  description: tool.productionDescription,
  path: tool.route,
});

export default function SkillsMatcherPage() {
  return <FreeToolPage tool={tool} />;
}
