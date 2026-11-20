import type { Metadata } from "next";
import Link from "next/link";
import { cooper } from "@/app/fonts";
import { SiteHeader } from "@/components/SiteHeader";
import { Card } from "@/components/ui/card";
import { PLAYGROUND_EXPERIMENTS } from "@/app/playground/experiments";
import { ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Side Projects & Playground — kohl.design",
  description: "Personal experiments, interactive prototypes, design tools, and open-source software.",
};

const PROJECTS = [
  {
    title: "kohl.design",
    meta: "Design system",
    description:
      "The components, tokens, and themes powering this site, built on Tailwind v4 and shadcn/ui.",
    href: "/design-system",
    actionText: "Open design system",
  },
];

export default function ProjectsPage() {
  return (
    <div className="min-h-dvh flex flex-col justify-between relative z-10">
      <SiteHeader />
      <main className="flex-1 w-full flex flex-col justify-between px-6 sm:px-8 md:px-12 lg:px-14 pb-6 sm:pb-8 md:pb-12 lg:pb-14">
        {/* Main Content Area */}
        <div className="my-auto py-10 sm:py-16 w-full max-w-4xl space-y-10 sm:space-y-14">
          <div className="space-y-4">
            <h1
              className={`${cooper.className} text-5xl sm:text-6xl md:text-7xl font-normal tracking-tight text-pine-800 dark:text-crimson-100 transition-colors duration-300`}
            >
              Side Projects
            </h1>
            <p className="max-w-2xl text-base sm:text-lg text-pine-700/80 dark:text-pine-200/80 leading-relaxed font-sans">
              Small tools, experiments, and things I’m building on the side.
            </p>
          </div>

          {/* Playground Experiments */}
          <section className="space-y-4">
            <h2 className={`${cooper.className} text-2xl sm:text-3xl font-normal text-pine-900 dark:text-white`}>
              Playground
            </h2>
            <Card variant="default" className="p-0 overflow-hidden gap-0">
              <div className="divide-y divide-border/60">
                {PLAYGROUND_EXPERIMENTS.map((experiment) => (
                  <Link
                    key={experiment.slug}
                    href={experiment.href}
                    className="group flex items-start justify-between gap-4 p-5 sm:p-6 transition-colors hover:bg-muted/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <div className="space-y-1">
                      <div className="flex items-baseline gap-2.5 flex-wrap">
                        <span className="text-base font-semibold text-foreground group-hover:text-primary transition-colors">
                          {experiment.title}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {experiment.status}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">
                        {experiment.summary}
                      </p>
                    </div>
                    <ArrowUpRight className="size-4 text-muted-foreground group-hover:text-primary transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0 mt-1" />
                  </Link>
                ))}
              </div>
            </Card>
          </section>

          {/* Projects & Tools */}
          <section className="space-y-4">
            <h2 className={`${cooper.className} text-2xl sm:text-3xl font-normal text-pine-900 dark:text-white`}>
              Projects
            </h2>
            <div className="w-full grid grid-cols-1 gap-4 sm:gap-6">
              {PROJECTS.map((project) => (
                <Link
                  key={project.title}
                  href={project.href}
                  className="group p-6 sm:p-7 rounded-[var(--radius)] border border-pine-800/10 dark:border-[#3B7D6F]/30 bg-white/60 dark:bg-black/20 backdrop-blur-sm space-y-4 shadow-2xs hover:border-primary/50 dark:hover:border-[#A8E3D2]/50 hover:bg-white/80 dark:hover:bg-black/40 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-2.5">
                    <p className="font-mono text-xs text-muted-foreground">
                      {project.meta}
                    </p>
                    <h3 className={`${cooper.className} text-2xl sm:text-3xl font-normal text-pine-900 dark:text-white group-hover:text-primary dark:group-hover:text-[#FCD3D6] transition-colors`}>
                      {project.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  <div className="pt-2 flex items-center gap-1 text-xs font-semibold text-primary dark:text-[#A8E3D2]">
                    <span>{project.actionText}</span>
                    <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </div>

        {/* Footer */}
        <footer className="w-full pt-6 text-xs text-pine-600/70 dark:text-pine-400/50">
          <span>kohl.design · 2026</span>
        </footer>
      </main>
    </div>
  );
}
