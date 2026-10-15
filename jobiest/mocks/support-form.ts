export type SupportPreviewMessage = {
  status: "preview-only";
  message: string;
};

export function mockSupportFormSubmission(): SupportPreviewMessage {
  return {
    status: "preview-only",
    message: "This preview does not send or store messages. Email support@jobiest.com to contact the support team.",
  };
}
