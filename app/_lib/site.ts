import type { Metadata } from "next";

export const siteUrl = "https://didc-dev.github.io";

export const basePath = "";

export function assetPath(path: string) {
  return `${basePath}${path.startsWith("/") ? path : `/${path}`}`;
}

export function pageMetadata(title: string, description: string, path: string): Metadata {
  const url = `${siteUrl}${path}`;
  const fullTitle = title.includes("Daniel Cruz") ? title : `${title} — Daniel Cruz`;
  const image = `${siteUrl}/og-daniel-cruz.png`;
  return {
    title: title.includes("Daniel Cruz") ? { absolute: title } : title,
    description,
    alternates: { canonical: url },
    openGraph: { type: "website", locale: "fr_CH", title: fullTitle, description, url, images: [{ url: image, width: 1200, height: 630, alt: "Portfolio professionnel de Daniel Cruz" }] },
    twitter: { card: "summary_large_image", title: fullTitle, description, images: [{ url: image, alt: "Portfolio professionnel de Daniel Cruz" }] },
  };
}
