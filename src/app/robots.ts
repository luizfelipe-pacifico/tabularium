import type { MetadataRoute } from "next";
import { env } from "@tabularium/env/web";

const siteUrl = env.NEXT_PUBLIC_APP_URL.replace(/\/$/, "");

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
