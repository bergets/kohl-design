"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cooper } from "./fonts";
import { TypewriterText } from "@/components/TypewriterText";
import { BrandFlower } from "@/components/BrandFlower";
import { ThemeToggle } from "@/components/theme-toggle";
import { ExploreSheet } from "@/components/ExploreSheet";
import { ArrowUpRight } from "lucide-react";

interface PageDestination {
  title: string;
  subtitle: string;
  desc: string;
  href: string;
}

const PAGE_DESTINATIONS: PageDestination[] = [
  {
    title: "Work",
    subtitle: "Career timeline, UX leadership & product design",
    desc: "10+ years leading product area design, SaaS platform strategy, and complex enterprise UX systems across Scandinavia.",
    href: "/work",
  },
  {
    title: "Side Projects",
    subtitle: "Experiments, tools & design system",
    desc: "Interactive shaders, token architectures, open-source prototypes, and digital craft experiments.",
    href: "/projects",
  },
  {
    title: "Skills",
    subtitle: "Curated LLM prompts & design engineering guides",
    desc: "Battle-tested prompt directory for senior designers — Apple fluid physics, Emil Kowalski polish, mobile native feel, and Tailwind v4 token setups.",
    href: "/skills",
  },
  {
    title: "Notes",
    subtitle: "Writing, design observations & micro-essays",
    desc: "Thoughts on craft, AI interface ergonomics, exceeding expectations, and why invisible details make software memorable.",
    href: "/notes",
  },
  {
    title: "About",
    subtitle: "Bio, design ethos & colophon",
    desc: "Background, personal design philosophy, tools, typography choices, and technical colophon.",
    href: "/about",
  },
];

export default function Home() {
  const [typewriterDone, setTypewriterDone] = React.useState(false);

  return (
    <div className="relative z-10 w-full min-h-dvh flex flex-col">
      {/* 
        ========================================================================
        HERO SECTION
        Takes min-h-dvh. The dialogue sits comfortably above the bottom edge,
        leaving room for the first destination card to peek into view.
        ========================================================================
      */}
      <section className="min-h-dvh w-full flex flex-col justify-between p-6 sm:p-8 md:p-12 lg:p-14 pb-12 sm:pb-16 relative">
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

        {/* Main Display Title */}
        <div className="my-auto py-10 sm:py-16 w-full">
          <h1
            className={`${cooper.className} text-[15vw] sm:text-[14vw] md:text-[13vw] lg:text-[140px] xl:text-[165px] leading-[0.82] font-normal tracking-tighter text-left text-pine-800 dark:text-crimson-100 transition-colors duration-300`}
          >
            kohl.design
          </h1>
        </div>

        {/* Bottom Dialogue */}
        <div className="w-full">
          <TypewriterText
            lines={[
              {
                text: "Exceeding expectations is great business.",
                className:
                  "text-lg sm:text-2xl md:text-3xl font-normal leading-snug text-pine-600 dark:text-[#A8E3D2]",
              },
              {
                text: "Want help doing just that? Slide into my LinkedIn DMs.",
                className:
                  "text-lg sm:text-2xl md:text-3xl font-normal leading-snug text-pine-800 dark:text-white",
                content: (
                  <span>
                    <span className="text-pine-800 dark:text-white">
                      Want help doing just that? Slide into my{" "}
                    </span>
                    <a
                      href="https://linkedin.com/in/henrikkohl"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium underline underline-offset-4 sm:underline-offset-6 decoration-primary/40 hover:decoration-primary dark:decoration-crimson-100/40 dark:hover:decoration-crimson-100 text-primary dark:text-crimson-100 transition-colors"
                    >
                      LinkedIn DMs.
                    </a>
                  </span>
                ),
              },
            ]}
            delay={0.4}
            showPrompt={false}
            cursorClassName="inline-block w-[3px] h-[1em] bg-primary dark:bg-accent ml-1.5 align-middle"
            onSequenceComplete={() => setTypewriterDone(true)}
          />
        </div>
      </section>

      {/* 
        ========================================================================
        PAGES & DESTINATIONS LIST
        Clean continuous flow starting with a 24px negative margin (-mt-6)
        so the Work card peeks 24px into the bottom of the hero viewport.
        ========================================================================
      */}
      <section className="w-full px-6 sm:px-8 md:px-12 lg:px-14 pb-16 sm:pb-24 space-y-4 sm:space-y-6 max-w-7xl mx-auto -mt-6">
        {PAGE_DESTINATIONS.map((item, index) => {
          if (index === 0) {
            return (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: 24 }}
                animate={typewriterDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
                transition={{
                  type: "spring",
                  damping: 24,
                  stiffness: 140,
                  mass: 0.8,
                }}
              >
                <Link
                  href={item.href}
                  className="group block w-full p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl border border-border/80 dark:border-[#3B7D6F]/50 bg-white/70 dark:bg-[#021E19]/80 hover:bg-white dark:hover:bg-[#032821] hover:border-primary/50 dark:hover:border-[#3B7D6F] backdrop-blur-sm transition-all duration-300 shadow-2xs hover:shadow-md"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="space-y-2.5 max-w-3xl">
                      <h2 className={`${cooper.className} text-2xl sm:text-3xl md:text-4xl font-normal text-pine-900 dark:text-white group-hover:text-primary dark:group-hover:text-[#FCD3D6] transition-colors`}>
                        {item.title}
                      </h2>

                      <p className="text-sm sm:text-base font-medium text-foreground/90 dark:text-[#FCD3D6]">
                        {item.subtitle}
                      </p>

                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                        {item.desc}
                      </p>
                    </div>

                    <div className="self-start md:self-center shrink-0">
                      <span className="inline-flex items-center gap-2 h-10 px-4 rounded-[var(--radius)] border border-border/80 dark:border-[#3B7D6F]/60 bg-background/80 group-hover:bg-primary/10 group-hover:border-primary/40 text-xs sm:text-sm font-medium text-foreground group-hover:text-primary dark:group-hover:text-[#FCD3D6] transition-all">
                        <span>Explore {item.title}</span>
                        <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className="group block w-full p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl border border-border/80 dark:border-[#3B7D6F]/50 bg-white/70 dark:bg-[#021E19]/80 hover:bg-white dark:hover:bg-[#032821] hover:border-primary/50 dark:hover:border-[#3B7D6F] backdrop-blur-sm transition-all duration-300 shadow-2xs hover:shadow-md"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-2.5 max-w-3xl">
                  <h2 className={`${cooper.className} text-2xl sm:text-3xl md:text-4xl font-normal text-pine-900 dark:text-white group-hover:text-primary dark:group-hover:text-[#FCD3D6] transition-colors`}>
                    {item.title}
                  </h2>

                  <p className="text-sm sm:text-base font-medium text-foreground/90 dark:text-[#FCD3D6]">
                    {item.subtitle}
                  </p>

                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="self-start md:self-center shrink-0">
                  <span className="inline-flex items-center gap-2 h-10 px-4 rounded-[var(--radius)] border border-border/80 dark:border-[#3B7D6F]/60 bg-background/80 group-hover:bg-primary/10 group-hover:border-primary/40 text-xs sm:text-sm font-medium text-foreground group-hover:text-primary dark:group-hover:text-[#FCD3D6] transition-all">
                    <span>Explore {item.title}</span>
                    <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </div>
            </Link>
          );
        })}

        {/* Bottom Colophon & Direct Links */}
        <footer className="pt-8 sm:pt-12 border-t border-border/70 dark:border-[#3B7D6F]/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
          <div className="space-y-1">
            <span className="font-mono text-muted-foreground">
              kohl.design · Henrik Kohl · Stockholm, Sweden
            </span>
          </div>

          <div className="flex items-center gap-5 font-medium">
            <a
              href="https://linkedin.com/in/henrikkohl"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary dark:hover:text-[#FCD3D6] transition-colors"
            >
              LinkedIn ↗
            </a>
            <a
              href="https://github.com/bergets"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary dark:hover:text-[#FCD3D6] transition-colors"
            >
              GitHub ↗
            </a>
            <Link
              href="/design-system"
              className="text-muted-foreground hover:text-primary dark:hover:text-[#FCD3D6] transition-colors"
            >
              Design System ↗
            </Link>
          </div>
        </footer>
      </section>
    </div>
  );
}
