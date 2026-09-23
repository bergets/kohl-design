import type { Metadata } from "next";
import Link from "next/link";
import { cooper } from "@/app/fonts";
import { SiteHeader } from "@/components/SiteHeader";

interface SkillItem {
  name: string;
  href: string;
  external?: boolean;
}

const SKILLS: SkillItem[] = [
  { name: "emil-design-eng", href: "https://emilkowal.ski", external: true },
  { name: "apple-design", href: "https://developer.apple.com/design", external: true },
  { name: "pen-dev", href: "https://pen.dev", external: true },
  { name: "animate", href: "https://motion.dev", external: true },
  { name: "mobile-native", href: "https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps", external: true },
  { name: "better-ui", href: "https://github.com", external: true },
  { name: "better-typography", href: "https://practicaltypography.com", external: true },
  { name: "write-swift", href: "https://www.swift.org/documentation/", external: true },
  { name: "ask-sonner", href: "https://sonner.emilkowal.ski", external: true },
  { name: "better-interface", href: "https://github.com", external: true },
];

export const metadata: Metadata = {
  title: "Skills — kohl.design",
  description: "Curated collection of favourite LLM skills for design engineering, animation, and tactile software craft.",
};

export default function SkillsPage() {
  return (
    <div className="min-h-dvh flex flex-col justify-between relative z-10">
      <SiteHeader />
      <main className="flex-1 w-full flex flex-col justify-between px-6 sm:px-8 md:px-12 lg:px-14 pb-6 sm:pb-8 md:pb-12 lg:pb-14">

      {/* Main Content Area */}
      <div className="my-auto py-10 sm:py-16 w-full max-w-4xl">
        {/* Headline */}
        <h1
          className={`${cooper.className} text-5xl sm:text-6xl md:text-7xl font-normal tracking-tight text-pine-800 dark:text-crimson-100 transition-colors duration-300 mb-8 sm:mb-12`}
        >
          Skills
        </h1>

        {/* Typographic Skills List */}
        <div className="w-full border-t border-pine-800/10 dark:border-[#3B7D6F]/25">
          {SKILLS.map((skill) => (
            <a
              key={skill.name}
              href={skill.href}
              target={skill.external ? "_blank" : undefined}
              rel={skill.external ? "noopener noreferrer" : undefined}
              className="group flex items-center justify-between py-4 sm:py-5 border-b border-pine-800/10 dark:border-[#3B7D6F]/25 transition-colors duration-200"
            >
              <span
                className={`${cooper.className} text-xl sm:text-2xl md:text-[26px] font-normal tracking-tight text-pine-900 dark:text-white group-hover:text-pine-600 dark:group-hover:text-[#A8E3D2] transition-colors duration-200`}
              >
                {skill.name}
              </span>
              <span
                className="text-base sm:text-lg text-pine-500/80 group-hover:text-pine-800 dark:text-[#7AD4BE]/80 dark:group-hover:text-[#A8E3D2] transition-all duration-200 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              >
                ↗
              </span>
            </a>
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
