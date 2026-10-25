import type { MetadataRoute } from "next";
import { env } from "@tabularium/env/web";

const siteUrl = env.NEXT_PUBLIC_APP_URL.replace(/\/$/, "");

// Public routes only. Product routes under (app) are private and marked noindex.
const publicRoutes: { path: string; priority: number }[] = [
  { path: "", priority: 1 },
  { path: "/recursos", priority: 0.8 },
  { path: "/sobre", priority: 0.6 },
  { path: "/login", priority: 0.4 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return publicRoutes.map(({ path, priority }) => ({
    url: `${siteUrl}${path}`,
    lastModified,
    changeFrequency: "monthly",
    priority,
  }));
}
