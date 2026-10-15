import type { Metadata } from "next";

type MarketingMetadataInput = {
  title: string;
  description: string;
  path: string;
};

const socialImage = {
  url: "/logos/wordmark-light-transparent.png",
  width: 544,
  height: 262,
  alt: "Jobiest",
};

export function marketingMetadata({ title, description, path }: MarketingMetadataInput): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      title,
      description,
      url: path,
      siteName: "Jobiest",
      images: [socialImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [socialImage.url],
    },
  };
}
