import { AuthExperience } from "@/components/auth/auth-experience";
import { AuthShell } from "@/components/auth/auth-shell";
import { privateAppMetadata } from "@/components/app/app-metadata";

export const metadata = privateAppMetadata(
  "Jobiest - your AI career agent",
  "Create your professional profile once. Jobiest prepares truthful personalized applications for the roles you bring, applies with your agent on your approval, and tracks everything in one dashboard.",
);

export default function LoginPage() {
  return <AuthShell><AuthExperience mode="login" /></AuthShell>;
}
