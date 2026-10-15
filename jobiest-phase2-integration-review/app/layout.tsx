import type { Metadata } from "next";
import type { ReactNode } from "react";
import { dmSans, spaceGrotesk } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://jobiest.com"),
  title: "Jobiest",
  description: "Jobiest helps you prepare truthful job applications and review every change before anything is sent.",
  icons: {
    icon: "/logos/mark-dark-transparent.png",
  },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${spaceGrotesk.variable}`}>
      <body>{children}</body>
    </html>
  );
}
