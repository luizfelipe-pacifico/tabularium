import type { Metadata } from "next";

import { AppShell } from "@/components/app-shell/app-shell";

// Product routes are private (see src/proxy.ts); keep them out of search results.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function AppGroupLayout({ children }: { children: React.ReactNode }) {
  return <AppShell>{children}</AppShell>;
}
