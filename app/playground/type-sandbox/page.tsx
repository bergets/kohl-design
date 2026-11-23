import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { TypeSandbox } from "./TypeSandbox";

export const metadata: Metadata = {
  title: "Editorial Type & Rhythm Sandbox — kohl.design",
  description:
    "Test display and UI font pairings with real product copy, then export CSS tokens.",
};

export default function TypeSandboxPage() {
  return (
    <div className="min-h-dvh flex flex-col relative z-10">
      <SiteHeader />
      <main className="flex-1 w-full max-w-4xl mx-auto px-6 sm:px-8 md:px-12 pt-8 sm:pt-12">
        <TypeSandbox />
      </main>
    </div>
  );
}
