import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { ResearchArtifactsWorkbench } from "./ResearchArtifactsWorkbench";

export const metadata: Metadata = {
  title: "Research Artifacts — kohl.design",
  description:
    "Turn raw qualitative interviews and field notes into Journey Maps, Service Blueprints, Stakeholder Maps, and Opportunity Solution Trees.",
};

export default function ResearchArtifactsPage() {
  return (
    <div className="min-h-dvh flex flex-col relative z-10">
      <SiteHeader />
      <main className="flex-1 w-full max-w-6xl mx-auto px-6 sm:px-8 md:px-12 pt-8 sm:pt-12 pb-28 md:pb-12">
        <ResearchArtifactsWorkbench />
      </main>
    </div>
  );
}
