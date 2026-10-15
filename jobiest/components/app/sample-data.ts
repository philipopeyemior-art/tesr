export const sampleJobs = [
  {
    id: "job-sample-1",
    role: "Product Designer",
    employer: "Example employer",
    location: "Remote",
    score: 72,
    tags: ["Product design", "Accessibility", "Design systems"],
  },
  {
    id: "job-sample-2",
    role: "UX Researcher",
    employer: "Sample company",
    location: "Lagos, Nigeria",
    score: 58,
    tags: ["Research", "Interview planning", "Synthesis"],
  },
];

export const sampleApplicationColumns = [
  {
    title: "Ready for your review",
    items: [
      { role: "Product Designer", employer: "Example employer" },
      { role: "UX Researcher", employer: "Sample company" },
    ],
  },
  {
    title: "Changes requested",
    items: [{ role: "Content Designer", employer: "Fictional studio" }],
  },
  {
    title: "Approved to send",
    items: [{ role: "Service Designer", employer: "Illustrative employer" }],
  },
];

export const sampleApplicationRows = [
  { role: "Product Designer", employer: "Example employer", status: "Ready for your review", action: "Review draft" },
  { role: "UX Researcher", employer: "Sample company", status: "Ready for your review", action: "Review draft" },
  { role: "Content Designer", employer: "Fictional studio", status: "Changes requested", action: "Review notes" },
  { role: "Service Designer", employer: "Illustrative employer", status: "Approved to send", action: "Review approval" },
];

export const sampleCvPages = [
  "Sample profile\nProduct Designer\n\nProfile summary\nA short overview written from experience you have verified. This example contains no real person or credentials.",
  "Selected experience\n\nRole title and dates\nA result supported by evidence from the saved profile. Replace this sample content with verified experience before using a real application.",
];

export const sampleLetterPages = [
  "Dear Hiring team,\n\nI am interested in the Product Designer role. This sample preview is based on a fictional job and does not include personal claims or invented achievements.\n\nKind regards,\nSample profile",
];
