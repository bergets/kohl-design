"use client";

import * as React from "react";
import Link from "next/link";
import { cooper } from "./fonts";
import { SiteHeader } from "@/components/SiteHeader";
import BackgroundShader from "@/components/BackgroundShader";
import { BrandFlower } from "@/components/BrandFlower";
import { Icon } from "@/components/ui/icon";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  SignatureStamp,
  StockholmHorizon,
  CraftLens,
} from "@/components/HomePersonalTouches";
import { ArrowUpRight } from "lucide-react";

interface ChapterItem {
  title: string;
  subtitle: string;
  href: string;
}

const DIRECTORY_CHAPTERS: ChapterItem[] = [
  {
    title: "Projects & Playground",
    subtitle: "Small tools, experiments, and the design system",
    href: "/projects",
  },
  {
    title: "Skills",
    subtitle: "Prompts and workflows I use with coding agents",
    href: "/skills",
  },
  {
    title: "Work",
    subtitle: "Selected product design work and case studies",
    href: "/work",
  },
  {
    title: "About",
    subtitle: "Who I am, what I use, and how this site is built",
    href: "/about",
  },
];

const HOME_NOTES = [
  {
    title: "Compound Design",
    date: "Nov 22, 2026",
    href: "/notes/compound-design",
  },
];

export default function Home() {
  const containerRef = React.useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className="relative z-10 w-full min-h-dvh flex flex-col">
      <SiteHeader position="fixed" />

      {/* 
        ========================================================================
        1. HERO SECTION: EXCEED EXPECTATIONS & CTA (WITH SHADER BACKGROUND)
        ========================================================================
      */}
      <div className="relative overflow-hidden">
        <BackgroundShader />

        <section className="min-h-dvh pt-20 sm:pt-24 w-full flex flex-col justify-between px-6 sm:px-8 md:px-12 lg:px-14 pb-12 sm:pb-16 relative">
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
              href="#intro"
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
      </div>

      {/* 
        ========================================================================
        2. ABOUT & WORK SUMMARY + PERSONAL MARGINALIA
        ========================================================================
      */}
      <section
        id="intro"
        className="w-full py-20 sm:py-28 px-6 sm:px-8 md:px-12 lg:px-14 border-t border-border/70 dark:border-pine-400/20"
      >
        <div className="w-full max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left column: Signed Editorial Letter with Tactile Perspectives */}
          <div className="lg:col-span-7 max-w-xl space-y-6">
            <Tabs defaultValue="bio" className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="space-y-1">
                  <h2 className="text-base sm:text-lg font-medium text-pine-900 dark:text-white">
                    Henrik Kohl
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Updated Nov 2026
                  </p>
                </div>

                <TabsList variant="tactile" size="sm">
                  <TabsTrigger value="bio">Bio</TabsTrigger>
                  <TabsTrigger value="work">How I work</TabsTrigger>
                  <TabsTrigger value="colophon">Colophon</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent
                value="bio"
                className="space-y-5 text-base sm:text-[17px] leading-relaxed text-pine-900/90 dark:text-neutral-200 mt-0"
              >
                <p>
                  I live in Stockholm with my family and two kids.
                </p>

                <p>
                  I currently work at{" "}
                  <a
                    href="https://www.quinyx.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-4 decoration-pine-400/50 dark:decoration-[#8AD0BE]/40 hover:decoration-foreground transition-colors"
                  >
                    Quinyx
                  </a>{" "}
                  as Product Area Design Lead, leading design for the core scheduling experience.
                </p>

                <p>
                  Previously, I spent nearly six years at{" "}
                  <Link
                    href="/work"
                    className="underline underline-offset-4 decoration-pine-400/50 dark:decoration-[#8AD0BE]/40 hover:decoration-foreground transition-colors"
                  >
                    Aditro
                  </Link>{" "}
                  designing mobile HR self-service apps used by 80,000+ people and stepping in as interim PM before it was acquired by{" "}
                  <a
                    href="https://www.sdworx.com/en-en/aditro"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-4 decoration-pine-400/50 dark:decoration-[#8AD0BE]/40 hover:decoration-foreground transition-colors"
                  >
                    SD Worx
                  </a>
                  . Before that, I worked at agencies on products for MediaTek, Libero, Vera &amp; John, and Nordnet.
                </p>

                <p>
                  Outside of work, I build small web apps and tools like{" "}
                  <a
                    href="https://kohlisar.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-4 decoration-pine-400/50 dark:decoration-[#8AD0BE]/40 hover:decoration-foreground transition-colors"
                  >
                    Köhlisar
                  </a>
                  ,{" "}
                  <a
                    href="https://nanny-agent-dun.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-4 decoration-pine-400/50 dark:decoration-[#8AD0BE]/40 hover:decoration-foreground transition-colors"
                  >
                    Kohlala
                  </a>
                  , and the{" "}
                  <Link
                    href="/design-system"
                    className="underline underline-offset-4 decoration-pine-400/50 dark:decoration-[#8AD0BE]/40 hover:decoration-foreground transition-colors"
                  >
                    kohl.design
                  </Link>{" "}
                  system.
                </p>

                <p>
                  You can find me on{" "}
                  <a
                    href="https://linkedin.com/in/henrikkohl"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-4 decoration-pine-400/50 dark:decoration-[#8AD0BE]/40 hover:decoration-foreground transition-colors"
                  >
                    LinkedIn
                  </a>{" "}
                  and{" "}
                  <a
                    href="https://github.com/bergets"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-4 decoration-pine-400/50 dark:decoration-[#8AD0BE]/40 hover:decoration-foreground transition-colors"
                  >
                    GitHub
                  </a>
                  , or read more about{" "}
                  <Link
                    href="/work"
                    className="underline underline-offset-4 decoration-pine-400/50 dark:decoration-[#8AD0BE]/40 hover:decoration-foreground transition-colors"
                  >
                    my work
                  </Link>
                  .
                </p>
              </TabsContent>

              <TabsContent
                value="work"
                className="space-y-5 text-base sm:text-[17px] leading-relaxed text-pine-900/90 dark:text-neutral-200 mt-0"
              >
                <p>
                  I care about calm, legible software — interfaces that respect people&apos;s attention and earn every border, badge, and pixel on screen.
                </p>
                <p>
                  I prototype early in real code rather than polishing static slides. Seeing how a layout breathes at 375px, how a focus ring lands, or how a spring settles tells you things a mockup never will.
                </p>
                <p>
                  Lately I&apos;ve been exploring{" "}
                  <Link
                    href="/notes/compound-design"
                    className="underline underline-offset-4 decoration-pine-400/50 dark:decoration-[#8AD0BE]/40 hover:decoration-foreground transition-colors"
                  >
                    compound design
                  </Link>{" "}
                  — turning every UI critique and taste decision into durable rules that both humans and coding agents can build from.
                </p>
              </TabsContent>

              <TabsContent
                value="colophon"
                className="space-y-5 text-base sm:text-[17px] leading-relaxed text-pine-900/90 dark:text-neutral-200 mt-0"
              >
                <p>
                  Set in <span className="font-cooper">Cooper</span> for display titles and <span className="font-medium">DM Sans</span> for UI and prose, over a Nordic pine and crimson palette.
                </p>
                <p>
                  Built with Next.js, Tailwind CSS, Radix primitives, and a live WebGL mesh shader from Paper Design on the hero canvas.
                </p>
                <p>
                  Every component on this page lives in the open{" "}
                  <Link
                    href="/design-system"
                    className="underline underline-offset-4 decoration-pine-400/50 dark:decoration-[#8AD0BE]/40 hover:decoration-foreground transition-colors"
                  >
                    kohl.design system
                  </Link>{" "}
                  and can be installed directly via the registry.
                </p>
              </TabsContent>
            </Tabs>

            <SignatureStamp />
          </div>

          {/* Right column: Quiet Marginalia (Stockholm Daylight + Craft Lens) */}
          <aside className="lg:col-span-5 lg:pt-1 space-y-8 border-t border-border/60 pt-8 lg:border-t-0 lg:border-l lg:pl-10">
            <StockholmHorizon />

            <div className="border-t border-border/60 pt-8">
              <CraftLens />
            </div>
          </aside>
        </div>
      </section>

      {/* 
        ========================================================================
        3. REALMS & SITE DIRECTORY (SCANDINAVIAN TYPOGRAPHIC TABLE)
        ========================================================================
      */}
      <section
        id="realms"
        className="w-full py-20 sm:py-28 px-6 sm:px-8 md:px-12 lg:px-14 bg-pine-50/20 dark:bg-[#011612]/30 backdrop-blur-xs border-t border-border/70 dark:border-pine-400/20 space-y-16 sm:space-y-20"
      >
        <div className="w-full max-w-5xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <h3 className={`${cooper.className} text-2xl sm:text-3xl font-normal text-pine-900 dark:text-white`}>
              Notes
            </h3>
          </div>

          <div className="border-t border-border/80 dark:border-pine-500/30 divide-y divide-border/60 dark:divide-pine-500/20">
            {HOME_NOTES.map((note) => (
              <Link
                key={note.href}
                href={note.href}
                className="group flex items-baseline justify-between py-5 sm:py-6 gap-4 hover:pl-2 transition-all duration-200"
              >
                <h4 className={`${cooper.className} text-xl sm:text-2xl font-normal text-pine-900 dark:text-white group-hover:text-primary dark:group-hover:text-pine-200 transition-colors`}>
                  {note.title}
                </h4>

                <span className="shrink-0 font-mono text-xs text-pine-600 dark:text-[#8AD0BE]">
                  {note.date}
                </span>
              </Link>
            ))}
          </div>
        </div>

        <div className="w-full max-w-5xl mx-auto space-y-8">
          <div className="flex items-center justify-between">
            <h3 className={`${cooper.className} text-2xl sm:text-3xl font-normal text-pine-900 dark:text-white`}>
              More
            </h3>
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

                <Icon
                  icon={ArrowUpRight}
                  className="shrink-0 text-pine-600 dark:text-[#8AD0BE] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
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
