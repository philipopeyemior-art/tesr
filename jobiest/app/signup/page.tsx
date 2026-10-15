import type { Metadata } from "next";
import { AuthExperience } from "@/components/auth/auth-experience";
import { AuthShell } from "@/components/auth/auth-shell";

// TODO: This is a front-end preview. It does not create an account or submit credentials.
export const metadata: Metadata = {
  title: "Create Your Free Account",
  description: "Create your Jobiest account in one step and start your AI job agent free. Google and LinkedIn signup supported.",
  robots: { index: false, follow: false },
};

export default function SignupPage() {
  return <AuthShell><AuthExperience mode="signup" /></AuthShell>;
}
