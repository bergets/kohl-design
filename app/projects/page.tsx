import type { Metadata } from "next";
import Link from "next/link";
import { cooper } from "@/app/fonts";
import { SiteHeader } from "@/components/SiteHeader";
import { ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Side Projects — kohl.design",
  description: "Personal experiments, design tools, open-source software, and prototypes.",
};

const PROJECTS = [
  {
    title: "kohl.design System",
    badge: "Production Ready",
    description: "Token-driven component architecture built on Tailwind v4 and shadcn/ui. Features custom Pine and Crimson palettes, dynamic derived radii, and multi-project personality presets.",
    href: "/design-system",
    external: false,
    actionText: "View Design System & Switcher",
  },
  {
    title: "Curated LLM Skills Directory",
    badge: "Live Directory",
    description: "Curated list of favourite engineering and design skills used with LLMs, from Emil Kowalski polish to Apple design motion guides.",
    href: "/skills",
    external: false,
    actionText: "Explore Skills",
  },
  {
    title: "GLSL Fluid Shader Canvas",
    badge: "Interactive Shader",
    description: "Interactive ambient GPU background shaders reacting to viewport movement, color themes, and subtle fluid dynamics.",
    href: "/",
    external: false,
    actionText: "Experience on Homepage",
  },
];

export default function ProjectsPage() {
  return (
    <div className="min-h-dvh flex flex-col justify-between relative z-10">
      <SiteHeader />
      <main className="flex-1 w-full flex flex-col justify-between px-6 sm:px-8 md:px-12 lg:px-14 pb-6 sm:pb-8 md:pb-12 lg:pb-14">

      {/* Main Content Area */}
      <div className="my-auto py-10 sm:py-16 w-full max-w-4xl space-y-8 sm:space-y-12">
        <div className="space-y-4">
          <h1
            className={`${cooper.className} text-5xl sm:text-6xl md:text-7xl font-normal tracking-tight text-pine-800 dark:text-crimson-100 transition-colors duration-300`}
          >
            Side Projects
          </h1>
          <p className="max-w-2xl text-base sm:text-lg text-pine-700/80 dark:text-pine-200/80 leading-relaxed font-sans">
            Independent tools, open-source software, design system experiments, and visual prototypes.
          </p>
        </div>

        {/* Project Cards Grid */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 border-t border-pine-800/10 dark:border-[#3B7D6F]/25 pt-6">
          {PROJECTS.map((project) => (
            <Link
              key={project.title}
              href={project.href}
              className="group p-6 sm:p-7 rounded-[var(--radius)] border border-pine-800/10 dark:border-[#3B7D6F]/30 bg-white/60 dark:bg-black/20 backdrop-blur-sm space-y-4 shadow-2xs hover:border-primary/50 dark:hover:border-[#A8E3D2]/50 hover:bg-white/80 dark:hover:bg-black/40 transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wide uppercase bg-pine-100/60 text-pine-800 dark:bg-[#A8E3D2]/15 dark:text-[#A8E3D2]">
                    {project.badge}
                  </span>
                </div>
                <h2 className={`${cooper.className} text-2xl sm:text-3xl font-normal text-pine-900 dark:text-white group-hover:text-primary dark:group-hover:text-[#FCD3D6] transition-colors`}>
                  {project.title}
                </h2>
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
      </div>

      {/* Footer */}
      <footer className="w-full pt-6 text-xs text-pine-600/70 dark:text-pine-400/50">
        <span>kohl.design · 2026</span>
      </footer>
      </main>
    </div>
  );
}
