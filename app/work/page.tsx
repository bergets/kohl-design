import type { Metadata } from "next";
import Link from "next/link";
import { cooper } from "@/app/fonts";
import { BrandFlower } from "@/components/BrandFlower";
import { ThemeToggle } from "@/components/theme-toggle";
import { ExploreSheet } from "@/components/ExploreSheet";
import { ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Work & Experience — kohl.design",
  description: "Selected commercial craft, design engineering, and career timeline.",
};

const WORK_EXPERIENCES = [
  {
    role: "Design Engineer & Creative Direction",
    company: "Independent Practice",
    period: "2024 — Present",
    description: "Designing tactile digital experiences, high-performance web applications, fluid motion systems, and custom design languages.",
    link: "https://linkedin.com/in/henrikkohl",
    linkText: "Connect on LinkedIn",
  },
  {
    role: "Digital Product Craft",
    company: "Selected Engagements",
    period: "2020 — 2024",
    description: "End-to-end product design, frontend architecture, and design systems bridging brand identity with production code.",
    link: "https://linkedin.com/in/henrikkohl",
    linkText: "View Case Studies & CV",
  },
];

export default function WorkPage() {
  return (
    <main className="min-h-dvh flex flex-col justify-between p-6 sm:p-8 md:p-12 lg:p-14 relative z-10">
      {/* Top Bar / Navigation */}
      <header className="w-full flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center group transition-transform duration-300 hover:scale-105"
          aria-label="kohl.design home"
        >
          <BrandFlower className="size-11 sm:size-12 md:size-14 text-pine-800 dark:text-crimson-100 transition-colors duration-300" />
        </Link>
        <div className="flex items-center gap-3">
          <ExploreSheet />
          <ThemeToggle />
        </div>
      </header>

      {/* Main Content Area */}
      <div className="my-auto py-10 sm:py-16 w-full max-w-4xl space-y-8 sm:space-y-12">
        <div className="space-y-4">
          <h1
            className={`${cooper.className} text-5xl sm:text-6xl md:text-7xl font-normal tracking-tight text-pine-800 dark:text-crimson-100 transition-colors duration-300`}
          >
            Work & Craft
          </h1>
          <p className="max-w-2xl text-base sm:text-lg text-pine-700/80 dark:text-pine-200/80 leading-relaxed font-sans">
            Bridging refined visual identity, physical motion, and rock-solid frontend architecture. Below is a snapshot of selected experience and commercial capabilities.
          </p>
        </div>

        {/* Experience Cards */}
        <div className="w-full space-y-4 border-t border-pine-800/10 dark:border-[#3B7D6F]/25 pt-6">
          {WORK_EXPERIENCES.map((item) => (
            <div
              key={item.role}
              className="p-6 sm:p-8 rounded-[var(--radius)] border border-pine-800/10 dark:border-[#3B7D6F]/30 bg-white/60 dark:bg-black/20 backdrop-blur-sm space-y-4 shadow-2xs hover:border-primary/40 dark:hover:border-[#A8E3D2]/40 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                <div>
                  <h2 className={`${cooper.className} text-2xl sm:text-3xl font-normal text-pine-900 dark:text-white`}>
                    {item.role}
                  </h2>
                  <span className="text-sm font-medium text-pine-600 dark:text-[#A8E3D2]">
                    {item.company}
                  </span>
                </div>
                <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                  {item.period}
                </span>
              </div>

              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                {item.description}
              </p>

              <div className="pt-2">
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary dark:text-[#A8E3D2] hover:underline"
                >
                  <span>{item.linkText}</span>
                  <ArrowUpRight className="size-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full pt-6 text-xs text-pine-600/70 dark:text-pine-400/50">
        <span>kohl.design · 2026</span>
      </footer>
    </main>
  );
}
