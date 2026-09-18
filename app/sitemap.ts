import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: Array<{ ko: string; en: string; priority: number }> = [
    { ko: "", en: "/en", priority: 1 },
    { ko: "/new", en: "/en/new", priority: 0.8 },
    { ko: "/guide", en: "/en/guide", priority: 0.7 },
    { ko: "/about", en: "/en/about", priority: 0.5 },
    { ko: "/privacy", en: "/en/privacy", priority: 0.3 },
    { ko: "/terms", en: "/en/terms", priority: 0.3 },
  ];

  const entries: MetadataRoute.Sitemap = [];

  for (const { ko, en, priority } of routes) {
    const alternates = {
      languages: {
        ko: `${SITE_URL}${ko}`,
        en: `${SITE_URL}${en}`,
      },
    };
    entries.push({
      url: `${SITE_URL}${ko}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority,
      alternates,
    });
    entries.push({
      url: `${SITE_URL}${en}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority,
      alternates,
    });
  }

  return entries;
}
