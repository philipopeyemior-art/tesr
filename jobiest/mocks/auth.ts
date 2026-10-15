export type AuthPreviewKind = "signup" | "login" | "google" | "linkedin";

export function getAuthPreviewMessage(kind: AuthPreviewKind): string {
  if (kind === "signup") return "Preview only. No account was created and your details were not sent or saved.";
  if (kind === "login") return "Preview only. No session was created and your details were not sent or saved.";
  const provider = kind === "google" ? "Google" : "LinkedIn";
  return `${provider} sign-in is shown for layout review only. No provider connection was started.`;
}
