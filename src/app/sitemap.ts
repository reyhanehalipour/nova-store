import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const locales = ["fa", "en"];
  const routes = ["", "/cart"];
  const now = new Date();
  return locales.flatMap((locale) =>
    routes.map((route) => ({
      url: `${base}/${locale}${route}`,
      lastModified: now,
      changeFrequency: "daily" as const,
      priority: route === "" ? 1 : 0.7,
    }))
  );
}