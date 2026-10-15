import localFont from "next/font/local";

export const dmSans = localFont({
  src: "../public/fonts/dm-sans.woff2",
  variable: "--font-dm-sans",
  display: "swap",
  weight: "100 900",
  fallback: [],
  adjustFontFallback: false,
});

export const spaceGrotesk = localFont({
  src: "../public/fonts/space-grotesk.woff2",
  variable: "--font-space-grotesk",
  display: "swap",
  weight: "300 700",
  fallback: [],
  adjustFontFallback: false,
});
