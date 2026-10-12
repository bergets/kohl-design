import * as React from "react";
import { DesignSystemProvider } from "@/components/design-system/DesignSystemContext";
import { DocsShell } from "@/components/design-system/DocsShell";

export const metadata = {
  title: "Kohl Design System — Components & Foundations",
  description: "Agent-first design system built on high-craft tokens, Cooper headlines, and 5 elevation layers.",
};

export default function DesignSystemLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <React.Suspense fallback={<div className="min-h-screen bg-background" />}>
      <DesignSystemProvider>
        <DocsShell>{children}</DocsShell>
      </DesignSystemProvider>
    </React.Suspense>
  );
}
