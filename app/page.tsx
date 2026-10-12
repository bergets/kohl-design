"use client";

import * as React from "react";
import Link from "next/link";
import { cooper } from "./fonts";
import { SiteHeader } from "@/components/SiteHeader";
import { BrandFlower } from "@/components/BrandFlower";
import { ArrowUpRight } from "lucide-react";

interface ChapterItem {
  num: string;
  title: string;
  subtitle: string;
  href: string;
}

const DIRECTORY_CHAPTERS: ChapterItem[] = [
  {
    num: "02",
    title: "Side Projects",
    subtitle: "Interactive shaders, token architectures & open-source tools",
    href: "/projects",
  },
  {
    num: "03",
    title: "Skills Directory",
    subtitle: "Curated LLM prompts for senior designers — Apple fluid physics",
    href: "/skills",
  },
  {
    num: "04",
    title: "Notes & Essays",
    subtitle: "Thoughts on craft, AI interface ergonomics & invisible details",
    href: "/notes",
  },
  {
    num: "05",
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

        {/* Bottom Bar: Explore Work Cue & Edition */}
        <div className="w-full relative z-10 flex items-center justify-between pt-6 border-t border-border/40 dark:border-pine-400/20 max-w-7xl">
          <a
            href="#selected-work"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-pine-700 dark:text-[#6FB4A3] hover:text-primary dark:hover:text-white transition-colors"
          >
            <span>Explore Work</span>
            <span className="text-base animate-bounce">↓</span>
          </a>

          <div className="font-mono text-xs font-semibold tracking-[0.2em] uppercase text-pine-600 dark:text-[#8AD0BE] select-none">
            EDITION 2026 · STOCKHOLM
          </div>
        </div>
      </section>

      {/* 
        ========================================================================
        2. FEATURED CASE STUDY 01: ADITRO HR
        "Simple HR for everyone."
        MacBook Pro mockup with layered typography behind and in front.
        ========================================================================
      */}
      <section
        id="selected-work"
        className="w-full py-20 sm:py-28 md:py-36 px-6 sm:px-8 md:px-12 lg:px-14 flex flex-col items-center justify-center relative overflow-hidden"
      >
        <div className="w-full max-w-5xl mx-auto relative">
          {/* Phase 1: Text BEHIND the laptop (Layer 1) */}
          <div className="relative z-0 select-none text-left pl-2 sm:pl-6 md:pl-10">
            <h2
              className={`${cooper.className} text-[19vw] sm:text-[15vw] md:text-[13vw] lg:text-[135px] font-normal leading-[0.84] tracking-tighter text-pine-900/90 dark:text-white transition-colors`}
            >
              Simple
              <br />
              HR
            </h2>
          </div>

          {/* Phase 2: Floating MacBook Pro Mockup (Layer 2) */}
          <div className="relative z-10 -mt-10 sm:-mt-16 md:-mt-24 w-full flex items-center justify-center">
            {/* The Laptop Container */}
            <div className="relative w-full max-w-3xl px-2 sm:px-6">
              {/* Vertical Side Project Rail */}
              <div
                className="hidden sm:block absolute right-[-1rem] md:right-[-2.5rem] top-1/2 -translate-y-1/2 [writing-mode:vertical-rl] font-sans text-lg sm:text-2xl font-medium tracking-wide text-pine-900 dark:text-white select-none"
              >
                Aditro HR
              </div>

              {/* Laptop Screen Bezel */}
              <div className="relative mx-auto rounded-t-2xl sm:rounded-t-3xl bg-neutral-950 border-2 sm:border-4 border-neutral-800 p-2 sm:p-3 shadow-2xl shadow-black/40 overflow-hidden">
                {/* Camera Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 sm:w-24 h-3 sm:h-4 bg-neutral-950 rounded-b-lg z-30 flex items-center justify-center">
                  <div className="size-1.5 sm:size-2 rounded-full bg-neutral-800" />
                </div>

                {/* Display Canvas with Vibrant Liquid Gradient */}
                <div className="w-full aspect-[16/10] rounded-lg sm:rounded-xl overflow-hidden relative bg-gradient-to-tr from-purple-900 via-fuchsia-600 to-rose-500 flex flex-col justify-between p-4 sm:p-6 md:p-8">
                  <div className="flex items-center justify-between text-white/90 text-xs sm:text-sm font-medium">
                    <span>Aditro Cloud Self-Service</span>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-black/30 backdrop-blur-md text-[10px] sm:text-xs font-mono">
                      <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Nordic Enterprise
                    </span>
                  </div>

                  {/* Mockup Card inside display */}
                  <div className="max-w-md bg-white/10 dark:bg-black/30 backdrop-blur-md rounded-lg sm:rounded-xl p-3 sm:p-4 border border-white/20 text-white space-y-1.5 sm:space-y-2">
                    <p className="font-mono text-[9px] sm:text-[10px] tracking-wider uppercase text-pink-200">
                      EMPLOYEE PORTAL & PAYROLL
                    </p>
                    <p className={`${cooper.className} text-sm sm:text-lg md:text-xl font-normal`}>
                      Transparent time, compensation & benefits for 1M+ Nordic workers.
                    </p>
                  </div>
                </div>
              </div>

              {/* Laptop Metallic Base / Deck */}
              <div className="relative mx-auto w-[104%] h-3 sm:h-4.5 bg-gradient-to-b from-neutral-300 via-neutral-400 to-neutral-600 dark:from-neutral-700 dark:via-neutral-800 dark:to-neutral-950 rounded-b-lg shadow-xl border-t border-white/30 dark:border-neutral-700 flex justify-center items-start">
                <div className="w-14 sm:w-20 h-1 sm:h-1.5 bg-neutral-500 dark:bg-neutral-900 rounded-b" />
              </div>
            </div>
          </div>

          {/* Phase 3: Text IN FRONT of laptop base (Layer 3) */}
          <div className="relative z-20 -mt-8 sm:-mt-14 md:-mt-20 select-none text-left pl-10 sm:pl-24 md:pl-40">
            <h2
              className={`${cooper.className} text-[19vw] sm:text-[15vw] md:text-[13vw] lg:text-[135px] font-normal leading-[0.84] tracking-tighter text-pine-900/90 dark:text-white transition-colors`}
            >
              for
              <br />
              everyone.
            </h2>
          </div>

          {/* Metadata & Case Link */}
          <div className="mt-8 sm:mt-12 pt-6 border-t border-border/70 dark:border-pine-400/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="font-mono text-xs font-semibold uppercase tracking-wider text-pine-600 dark:text-[#8AD0BE]">
                ENTERPRISE CLOUD HR & PAYROLL · 2017–2022
              </span>
              <p className="text-xs sm:text-sm text-muted-foreground max-w-xl">
                Led UX and design systems transforming complex legacy administrative workflows into modern, human-centered Nordic self-service software.
              </p>
            </div>

            <Link
              href="/work"
              className="inline-flex items-center gap-2 h-10 px-5 rounded-[var(--radius)] bg-primary/10 hover:bg-primary text-primary hover:text-white dark:bg-white/10 dark:hover:bg-white dark:text-white dark:hover:text-pine-900 font-medium text-xs sm:text-sm transition-all"
            >
              <span>Read Aditro Case Study</span>
              <ArrowUpRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 
        ========================================================================
        3. FEATURED CASE STUDY 02: QUINYX AI SCHEDULING
        "Intelligent shifts at scale."
        Studio Display mockup with real SaaS Gantt timeline & AI optimization.
        ========================================================================
      */}
      <section className="w-full py-20 sm:py-28 md:py-36 px-6 sm:px-8 md:px-12 lg:px-14 flex flex-col items-center justify-center relative overflow-hidden bg-pine-50/25 dark:bg-[#011612]/30 backdrop-blur-xs">
        <div className="w-full max-w-5xl mx-auto relative">
          {/* Phase 1: Text BEHIND the display */}
          <div className="relative z-0 select-none text-left pl-2 sm:pl-6 md:pl-10">
            <h2
              className={`${cooper.className} text-[17vw] sm:text-[14vw] md:text-[12vw] lg:text-[125px] font-normal leading-[0.84] tracking-tighter text-pine-900/90 dark:text-white transition-colors`}
            >
              Intelligent
              <br />
              shifts
            </h2>
          </div>

          {/* Phase 2: Floating Studio Display Mockup */}
          <div className="relative z-10 -mt-10 sm:-mt-16 md:-mt-24 w-full flex items-center justify-center">
            <div className="relative w-full max-w-3xl px-2 sm:px-6">
              {/* Vertical Side Project Rail */}
              <div
                className="hidden sm:block absolute right-[-1rem] md:right-[-2.5rem] top-1/2 -translate-y-1/2 [writing-mode:vertical-rl] font-sans text-lg sm:text-2xl font-medium tracking-wide text-pine-700 dark:text-[#8AD0BE] select-none"
              >
                Quinyx AI
              </div>

              {/* Display Bezel */}
              <div className="relative mx-auto rounded-xl sm:rounded-2xl bg-neutral-950 border sm:border-2 border-neutral-800 p-2 sm:p-3.5 shadow-2xl shadow-black/40 overflow-hidden">
                {/* Quinyx UI Screen Canvas */}
                <div className="w-full rounded-lg sm:rounded-xl overflow-hidden bg-[#011612] border border-pine-500/30 p-3 sm:p-5 space-y-3">
                  {/* Top Bar inside UI */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-pine-500/20">
                    <div className="flex items-center gap-2">
                      <span className="size-2 rounded-full bg-emerald-400" />
                      <span className="font-mono text-[11px] sm:text-xs font-bold text-white">
                        Frontline Shift Intelligence · Terminal 5
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-[#005243] text-[#FCD3D6] text-[10px] font-mono font-bold">
                        98.8% Coverage · Union OK
                      </span>
                      <span className="hidden sm:inline-block px-2.5 py-0.5 rounded bg-crimson-500/20 text-crimson-200 text-[10px] font-mono font-semibold">
                        ✦ AI Matched
                      </span>
                    </div>
                  </div>

                  {/* Gantt Timeline Shift Rows */}
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between p-2 sm:p-2.5 rounded-md bg-[#02221C] border border-pine-500/20">
                      <div>
                        <p className="font-medium text-white text-[11px] sm:text-xs">Astrid Lind (Lead Dispatch)</p>
                        <p className="text-[10px] text-pine-300">Terminal Airside</p>
                      </div>
                      <span className="px-2 sm:px-3 py-1 rounded bg-[#005243] text-[#A8E3D2] font-mono text-[10px] sm:text-xs font-medium">
                        06:00 – 14:30
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-2 sm:p-2.5 rounded-md bg-[#02221C] border border-pine-500/20">
                      <div>
                        <p className="font-medium text-white text-[11px] sm:text-xs">Marcus Ek (Supervisor)</p>
                        <p className="text-[10px] text-pine-300">Gate Logistics</p>
                      </div>
                      <span className="px-2 sm:px-3 py-1 rounded bg-[#005243] text-[#A8E3D2] font-mono text-[10px] sm:text-xs font-medium">
                        14:00 – 22:30
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-2 sm:p-2.5 rounded-md bg-[#02221C] border border-crimson-300/40">
                      <div>
                        <p className="font-medium text-white text-[11px] sm:text-xs flex items-center gap-1.5">
                          <span>✦ AI Recommended Auto-Fill</span>
                        </p>
                        <p className="text-[10px] text-pine-300">Peak Passenger Matched</p>
                      </div>
                      <span className="px-2 sm:px-3 py-1 rounded bg-[#03352C] text-[#FCD3D6] font-mono text-[10px] sm:text-xs font-medium">
                        08:00 – 16:30
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Display Stand */}
              <div className="mx-auto w-12 sm:w-16 h-6 sm:h-8 bg-[#64748B]" />
              <div className="mx-auto w-28 sm:w-36 h-2 bg-[#475569] rounded-t" />
            </div>
          </div>

          {/* Phase 3: Text IN FRONT of display stand */}
          <div className="relative z-20 -mt-4 sm:-mt-8 md:-mt-12 select-none text-left pl-8 sm:pl-24 md:pl-40">
            <h2
              className={`${cooper.className} text-[17vw] sm:text-[14vw] md:text-[12vw] lg:text-[125px] font-normal leading-[0.84] tracking-tighter text-pine-900 dark:text-white transition-colors drop-shadow-sm`}
            >
              at scale.
            </h2>
          </div>

          {/* Metadata & Case Link */}
          <div className="mt-8 sm:mt-12 pt-6 border-t border-border/70 dark:border-pine-400/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="font-mono text-xs font-semibold uppercase tracking-wider text-pine-600 dark:text-[#8AD0BE]">
                PRODUCT AREA LEAD · 120,000+ FRONTLINE USERS
              </span>
              <p className="text-xs sm:text-sm text-muted-foreground max-w-xl">
                Replaced brittle manual matrices with a human-guided AI scheduling canvas balancing staff preference, union rulebooks, and labor budget across Europe.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <Link
                href="/work"
                className="inline-flex items-center gap-2 h-10 px-5 rounded-[var(--radius)] bg-primary/10 hover:bg-primary text-primary hover:text-white dark:bg-white/10 dark:hover:bg-white dark:text-white dark:hover:text-pine-900 font-medium text-xs sm:text-sm transition-all"
              >
                <span>Read Quinyx Case Study</span>
                <ArrowUpRight className="size-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 
        ========================================================================
        4. FEATURED CASE STUDY 03: QUINYX FRONTLINE MOBILE
        "Pocket power in hand."
        Smartphone mockup with shift calendar & peer swap ergonomics.
        ========================================================================
      */}
      <section className="w-full py-20 sm:py-28 md:py-36 px-6 sm:px-8 md:px-12 lg:px-14 flex flex-col items-center justify-center relative overflow-hidden">
        <div className="w-full max-w-5xl mx-auto relative">
          {/* Phase 1: Text BEHIND the phone */}
          <div className="relative z-0 select-none text-left pl-2 sm:pl-6 md:pl-10">
            <h2
              className={`${cooper.className} text-[18vw] sm:text-[15vw] md:text-[13vw] lg:text-[130px] font-normal leading-[0.84] tracking-tighter text-pine-900/90 dark:text-white transition-colors`}
            >
              Pocket
              <br />
              power
            </h2>
          </div>

          {/* Phase 2: Floating Smartphone Mockup */}
          <div className="relative z-10 -mt-10 sm:-mt-16 md:-mt-24 w-full flex items-center justify-center">
            <div className="relative">
              {/* Vertical Side Project Rail */}
              <div
                className="hidden sm:block absolute right-[-2.5rem] md:right-[-3rem] top-1/2 -translate-y-1/2 [writing-mode:vertical-rl] font-sans text-lg sm:text-2xl font-medium tracking-wide text-pine-700 dark:text-[#8AD0BE] select-none"
              >
                Quinyx Mobile
              </div>

              {/* Phone Device Bezel */}
              <div className="w-[260px] sm:w-[290px] md:w-[310px] aspect-[9/18.5] rounded-[36px] sm:rounded-[44px] bg-neutral-950 border-4 sm:border-8 border-neutral-800 p-3 sm:p-4 shadow-2xl shadow-black/50 overflow-hidden flex flex-col justify-between">
                {/* Dynamic Island */}
                <div className="mx-auto w-20 sm:w-24 h-4 sm:h-5 bg-black rounded-full flex items-center justify-between px-2">
                  <div className="size-2 rounded-full bg-neutral-800" />
                  <div className="size-2 rounded-full bg-emerald-500/70" />
                </div>

                {/* App Screen Content */}
                <div className="my-auto space-y-3 pt-2">
                  <div className="flex items-center justify-between text-white">
                    <span className={`${cooper.className} text-base sm:text-lg font-normal`}>My Shifts</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-pine-700/60 text-pine-200">
                      Sep 2026
                    </span>
                  </div>

                  {/* Active Shift Card */}
                  <div className="p-3 sm:p-3.5 rounded-xl bg-[#022B24] border border-crimson-200/40 text-white space-y-1">
                    <p className="font-mono text-[9px] uppercase tracking-wider text-crimson-200">TODAY · 14:00 — 22:30</p>
                    <p className={`${cooper.className} text-sm sm:text-base font-normal`}>Terminal 5 · Gate Control</p>
                  </div>

                  {/* Teammate Swap Sheet */}
                  <div className="p-3 rounded-xl bg-[#011D18] border border-pine-500/30 text-white space-y-2">
                    <p className="font-mono text-[9px] uppercase tracking-wider text-pine-400">✦ QUICK SHIFT SWAP</p>
                    <div className="flex items-center justify-between p-2 rounded bg-[#03352C] text-[11px]">
                      <span>Elin B. (Available)</span>
                      <span className="font-bold text-crimson-200">Trade →</span>
                    </div>
                  </div>
                </div>

                {/* Bottom Navigation Indicator Bar */}
                <div className="w-24 sm:w-28 h-1 bg-white/40 rounded-full mx-auto" />
              </div>
            </div>
          </div>

          {/* Phase 3: Text IN FRONT of phone frame */}
          <div className="relative z-20 -mt-4 sm:-mt-8 md:-mt-12 select-none text-left pl-8 sm:pl-20 md:pl-32">
            <h2
              className={`${cooper.className} text-[18vw] sm:text-[15vw] md:text-[13vw] lg:text-[130px] font-normal leading-[0.84] tracking-tighter text-pine-900 dark:text-white transition-colors drop-shadow-sm`}
            >
              in hand.
            </h2>
          </div>

          {/* Metadata & Case Link */}
          <div className="mt-8 sm:mt-12 pt-6 border-t border-border/70 dark:border-pine-400/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="font-mono text-xs font-semibold uppercase tracking-wider text-pine-600 dark:text-[#8AD0BE]">
                DESKLESS ERGONOMICS FOR 500,000+ STAFF · 4.8★ APP STORE
              </span>
              <p className="text-xs sm:text-sm text-muted-foreground max-w-xl">
                Designed native mobile interaction patterns for frontline workers on airport tarmacs and acute care wards, prioritizing one-handed reachability and instant sync.
              </p>
            </div>

            <Link
              href="/work"
              className="inline-flex items-center gap-2 h-10 px-5 rounded-[var(--radius)] bg-primary/10 hover:bg-primary text-primary hover:text-white dark:bg-white/10 dark:hover:bg-white dark:text-white dark:hover:text-pine-900 font-medium text-xs sm:text-sm transition-all"
            >
              <span>Explore Mobile Design Process</span>
              <ArrowUpRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 
        ========================================================================
        5. REALMS & SITE DIRECTORY (SCANDINAVIAN TYPOGRAPHIC TABLE)
        ========================================================================
      */}
      <section className="w-full py-20 sm:py-28 px-6 sm:px-8 md:px-12 lg:px-14 bg-pine-50/20 dark:bg-[#011612]/30 backdrop-blur-xs border-t border-border/70 dark:border-pine-400/20">
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
                <div className="flex items-start sm:items-center gap-4 sm:gap-6">
                  <span className="font-mono text-xs font-bold text-pine-600 dark:text-[#8AD0BE] pt-1 sm:pt-0 shrink-0">
                    {item.num}
                  </span>
                  <div>
                    <h4 className={`${cooper.className} text-xl sm:text-2xl font-normal text-pine-900 dark:text-white group-hover:text-primary dark:group-hover:text-pine-200 transition-colors`}>
                      {item.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-pine-700 dark:text-[#8AD0BE] mt-0.5">
                      {item.subtitle}
                    </p>
                  </div>
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
        6. FOOTER & COLOPHON
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
