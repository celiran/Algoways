import type { MetadataRoute } from "next";
import { seoConfig } from "./seo-config";

const lastModified = new Date("2026-07-30T00:00:00+03:00");

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { path: "", changeFrequency: "weekly" as const, priority: 1 },
    { path: "/about", changeFrequency: "monthly" as const, priority: 0.8 },
    { path: "/contact", changeFrequency: "monthly" as const, priority: 0.7 },
    {
      path: "/risk-disclosure",
      changeFrequency: "yearly" as const,
      priority: 0.4,
    },
    { path: "/terms", changeFrequency: "yearly" as const, priority: 0.3 },
    { path: "/privacy", changeFrequency: "yearly" as const, priority: 0.3 },
    { path: "/copyright", changeFrequency: "yearly" as const, priority: 0.2 },
    {
      path: "/accessibility",
      changeFrequency: "yearly" as const,
      priority: 0.2,
    },
  ];

  return routes.map((route) => ({
    url: `${seoConfig.siteUrl}${route.path}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
