import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { BranchingCritiqueCanvas } from "./BranchingCritiqueCanvas";

export const metadata: Metadata = {
  title: "Branching Critique Canvas — kohl.design",
  description:
    "Explore UI iterations on a 2D canvas, mark Keep or Reject, and extract AGENTS.md rules from the difference.",
};

export default function BranchingCritiquePage() {
  return (
    <div className="min-h-dvh flex flex-col relative z-10">
      <SiteHeader />
      <main className="flex-1 w-full max-w-6xl mx-auto px-6 sm:px-8 md:px-12 pt-8 sm:pt-12">
        <BranchingCritiqueCanvas />
      </main>
    </div>
  );
}
