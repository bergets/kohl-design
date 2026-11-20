"use client";

import * as React from "react";
import Link from "next/link";
import { cooper } from "./fonts";
import { SiteHeader } from "@/components/SiteHeader";
import { BrandFlower } from "@/components/BrandFlower";

interface ChapterItem {
  title: string;
  subtitle: string;
  href: string;
}

const DIRECTORY_CHAPTERS: ChapterItem[] = [
  {
    title: "Side Projects",
    subtitle: "Interactive shaders, token architectures & open-source tools",
    href: "/projects",
  },
  {
    title: "Playground",
    subtitle: "Self-contained experiments, small games & interactive prototypes",
    href: "/playground",
  },
  {
    title: "Skills Directory",
    subtitle: "Curated LLM prompts for senior designers — Apple fluid physics",
    href: "/skills",
  },
  {
    title: "Notes & Essays",
    subtitle: "Thoughts on craft, AI interface ergonomics & invisible details",
    href: "/notes",
  },
  {
    title: "About & Ethos",
    subtitle: "Background, design philosophy, tools, typography & colophon",
    href: "/about",
  },
];

export default function Home() {
  const containerRef = React.useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className="relative z-10 w-full min-h-dvh flex flex-col">
      {/* 
        ========================================================================
        STICKY NAVIGATION HEADER
        ========================================================================
      */}
      <SiteHeader />

      {/* 
        ========================================================================
        1. HERO SECTION: EXCEED EXPECTATIONS & CTA
        ========================================================================
      */}
      <section className="min-h-[calc(100dvh-5rem)] w-full flex flex-col justify-between px-6 sm:px-8 md:px-12 lg:px-14 pb-12 sm:pb-16 relative overflow-hidden">
        {/* Hero Headline & CTA */}
        <div className="my-auto py-12 sm:py-20 w-full relative z-10 max-w-6xl space-y-6 sm:space-y-8">
          <h1
            className={`${cooper.className} text-5xl sm:text-7xl md:text-8xl lg:text-[100px] xl:text-[116px] leading-[0.95] font-normal tracking-tight text-pine-900 dark:text-white transition-colors duration-300 max-w-5xl`}
          >
            Exceed expectations.
          </h1>

          <div className="space-y-2 max-w-2xl">
            <p className="text-xl sm:text-2xl md:text-3xl text-pine-800 dark:text-[#A8E3D2]">
              It’s great business.{" "}
              <a
                href="https://linkedin.com/in/henrikkohl"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-6 font-semibold text-pine-950 dark:text-white hover:text-primary dark:hover:text-[#8AD0BE] transition-colors inline-block"
              >
                Say hi on LinkedIn ↗
              </a>
            </p>
          </div>
        </div>

        {/* Bottom Bar: Explore Cue & Edition */}
        <div className="w-full relative z-10 flex items-center justify-between pt-6 border-t border-border/40 dark:border-pine-400/20 max-w-7xl">
          <a
            href="#realms"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-pine-700 dark:text-[#6FB4A3] hover:text-primary dark:hover:text-white transition-colors"
          >
            <span>Explore</span>
            <span className="text-base animate-bounce">↓</span>
          </a>

          <div className="font-mono text-xs font-semibold tracking-[0.2em] uppercase text-pine-600 dark:text-[#8AD0BE] select-none">
            EDITION 2026 · STOCKHOLM
          </div>
        </div>
      </section>

      {/* 
        ========================================================================
        2. REALMS & SITE DIRECTORY (SCANDINAVIAN TYPOGRAPHIC TABLE)
        ========================================================================
      */}
      <section
        id="realms"
        className="w-full py-20 sm:py-28 px-6 sm:px-8 md:px-12 lg:px-14 bg-pine-50/20 dark:bg-[#011612]/30 backdrop-blur-xs border-t border-border/70 dark:border-pine-400/20"
      >
        <div className="w-full max-w-5xl mx-auto space-y-8">
          <div className="flex items-center justify-between">
            <h3 className={`${cooper.className} text-2xl sm:text-3xl font-normal text-pine-900 dark:text-white`}>
              Other Realms of Craft
            </h3>

            <BrandFlower className="size-8 text-pine-700 dark:text-[#8AD0BE] shrink-0" />
          </div>

          <div className="border-t border-border/80 dark:border-pine-500/30 divide-y divide-border/60 dark:divide-pine-500/20">
            {DIRECTORY_CHAPTERS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group flex items-center justify-between py-5 sm:py-6 gap-4 hover:pl-2 transition-all duration-200"
              >
                <div>
                  <h4 className={`${cooper.className} text-xl sm:text-2xl font-normal text-pine-900 dark:text-white group-hover:text-primary dark:group-hover:text-pine-200 transition-colors`}>
                    {item.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-pine-700 dark:text-[#8AD0BE] mt-0.5">
                    {item.subtitle}
                  </p>
                </div>

                <div className="shrink-0 flex items-center gap-1 text-xs font-bold text-pine-600 dark:text-[#8AD0BE] group-hover:translate-x-1 transition-transform">
                  <span>Explore ↗</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 
        ========================================================================
        3. FOOTER & COLOPHON
        ========================================================================
      */}
      <footer className="w-full py-8 sm:py-10 px-6 sm:px-8 md:px-12 lg:px-14 border-t border-border/70 dark:border-pine-400/20 text-xs">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <BrandFlower className="size-4 text-pine-600 dark:text-[#8AD0BE]" />
            <span className="font-mono text-pine-600 dark:text-[#6FB4A3]">
              kohl.design · Henrik Kohl · Stockholm, Sweden
            </span>
          </div>

          <div className="flex items-center gap-6 font-medium">
            <a
              href="https://linkedin.com/in/henrikkohl"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-pine-900 dark:text-white hover:underline transition-colors"
            >
              LinkedIn ↗
            </a>
            <a
              href="https://github.com/bergets"
              target="_blank"
              rel="noopener noreferrer"
              className="text-pine-600 dark:text-[#8AD0BE] hover:text-primary dark:hover:text-white transition-colors"
            >
              GitHub ↗
            </a>
            <Link
              href="/design-system"
              className="text-pine-600 dark:text-[#8AD0BE] hover:text-primary dark:hover:text-white transition-colors"
            >
              Design System ↗
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
