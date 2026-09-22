import type { Metadata } from "next";
import Link from "next/link";
import { cooper } from "@/app/fonts";
import { BrandFlower } from "@/components/BrandFlower";
import { ThemeToggle } from "@/components/theme-toggle";
import { ExploreSheet } from "@/components/ExploreSheet";
import { ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Notes & Writing — kohl.design",
  description: "Essays, design engineering observations, and thoughts on software craft.",
};

const NOTES = [
  {
    title: "The tactile web: bringing physical weight back to pixels",
    date: "Sep 2026",
    readingTime: "4 min read",
    snippet: "Why software feels dead when it lacks physical resistance, optical feedback, and organic spring easing.",
  },
  {
    title: "Dual-register design: why every brand needs an editorial and utility mode",
    date: "Aug 2026",
    readingTime: "6 min read",
    snippet: "Splitting a design system into expressive character surfaces and quiet utility canvases.",
  },
  {
    title: "Token abstraction for personal side projects",
    date: "Aug 2026",
    readingTime: "3 min read",
    snippet: "How parameterizing 3 CSS variables lets one design language spawn infinite personal project variations.",
  },
];

export default function NotesPage() {
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
            Notes
          </h1>
          <p className="max-w-2xl text-base sm:text-lg text-pine-700/80 dark:text-pine-200/80 leading-relaxed font-sans">
            Short essays, design engineering observations, and notes on typography, animation, and tactile software craft.
          </p>
        </div>

        {/* Notes List */}
        <div className="w-full border-t border-pine-800/10 dark:border-[#3B7D6F]/25 divide-y divide-pine-800/10 dark:divide-[#3B7D6F]/25">
          {NOTES.map((note) => (
            <article
              key={note.title}
              className="group py-6 sm:py-8 space-y-2 cursor-pointer transition-colors"
            >
              <div className="flex items-center justify-between gap-4">
                <h2 className={`${cooper.className} text-2xl sm:text-3xl font-normal text-pine-900 dark:text-white group-hover:text-primary dark:group-hover:text-[#A8E3D2] transition-colors`}>
                  {note.title}
                </h2>
                <ArrowUpRight className="size-4 text-muted-foreground group-hover:text-primary dark:group-hover:text-[#A8E3D2] transition-all transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0" />
              </div>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-3xl">
                {note.snippet}
              </p>
              <div className="flex items-center gap-3 pt-1 text-xs font-mono text-muted-foreground/70">
                <span>{note.date}</span>
                <span>·</span>
                <span>{note.readingTime}</span>
              </div>
            </article>
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
