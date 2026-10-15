export type PreviewOnlyResult = {
  headline: string;
  detail: string;
  liveToolUrl: string;
};

export type VerifiedSampleResult = {
  label: string;
  headline: string;
  details: string[];
  caveat: string;
  liveToolUrl: string;
};

const verifiedSamples: Record<string, VerifiedSampleResult> = {
  ats: {
    label: "Fictional sample CV · 47 words",
    headline: "54 / 100",
    details: [
      "No email found; phone found.",
      "3 of 3 standard sections and year references detected.",
      "Weak action verbs flagged. 7 of 12 role terms matched.",
    ],
    caveat: "This is the result for one deliberately incomplete fictional CV. It is not a typical result, a benchmark, or a measure of candidate worth.",
    liveToolUrl: "https://jobiest.com/free-ats-resume-scanner",
  },
  salary: {
    label: "Fictional listing · pay omitted",
    headline: "0 stated pay",
    details: ["1 listing source(s) scanned. 0 stated pay. No estimates or averages are included."],
    caveat: "This is one example listing, not market data. Salary Insights reports pay explicitly stated in the pasted listing and does not create an estimate when it is missing.",
    liveToolUrl: "https://jobiest.com/free-salary-insights",
  },
};

export function createPreviewOnlyResult(_toolName: string, liveToolUrl: string): PreviewOnlyResult {
  return {
    headline: "No analysis was run on your input.",
    detail: "This redesign preview displays the tool flow only. It did not evaluate or send the information you entered. Continue to the live tool to run an actual check or generation.",
    liveToolUrl,
  };
}

export function getVerifiedSampleResult(toolId: string): VerifiedSampleResult | null {
  return verifiedSamples[toolId] ?? null;
}
