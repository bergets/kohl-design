import type { Metadata } from "next";
import Link from "next/link";
import { cooper } from "@/app/fonts";
import { SiteHeader } from "@/components/SiteHeader";
import { ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "About — kohl.design",
  description: "About Henrik Kohl and how kohl.design is built.",
};

export default function AboutPage() {
  return (
    <div className="min-h-dvh flex flex-col justify-between relative z-10">
      <SiteHeader />
      <main className="flex-1 w-full flex flex-col justify-between px-6 sm:px-8 md:px-12 lg:px-14 pb-6 sm:pb-8 md:pb-12 lg:pb-14">

      {/* Main Content Area */}
      <div className="my-auto py-10 sm:py-16 w-full max-w-3xl space-y-10 sm:space-y-14">
        <div className="space-y-4">
          <h1
            className={`${cooper.className} text-5xl sm:text-6xl md:text-7xl font-normal tracking-tight text-pine-800 dark:text-crimson-100 transition-colors duration-300`}
          >
            About
          </h1>
          <p className="text-xl sm:text-2xl text-pine-900 dark:text-white font-normal leading-relaxed">
            I’m Henrik Kohl, a product designer based in Stockholm.
          </p>
        </div>

        {/* Bio Paragraphs */}
        <div className="space-y-6 text-base sm:text-lg text-muted-foreground leading-relaxed border-t border-pine-800/10 dark:border-[#3B7D6F]/25 pt-8">
          <p>
            I believe good design starts with knowing the people using what you build. Over the years I’ve worked across agencies, as a consultant, and inside larger product organizations — taking products from early workshops and prototypes to launch, and stepping into product management and customer-facing roles along the way.
          </p>
          <p>
            I like software that feels considered: clear typography, calm layouts, and interactions that respond the way you expect them to.
          </p>
          <p>
            Outside of work, most of my time goes to my two kids. When I get a quiet moment, you’ll find me with a good coffee, at the gym, watching Bajen, or tinkering with small web tools and coding agents.
          </p>
        </div>

        {/* Colophon Section */}
        <div className="p-6 sm:p-8 rounded-[var(--radius)] border border-pine-800/10 dark:border-[#3B7D6F]/30 bg-white/60 dark:bg-black/20 backdrop-blur-sm space-y-6">
          <h2 className={`${cooper.className} text-2xl font-normal text-pine-900 dark:text-white`}>
            Colophon
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
            <div>
              <span className="text-xs font-mono text-muted-foreground block mb-1">
                Typography
              </span>
              <p className="text-foreground font-medium">
                Cooper for headings, DM Sans for body and UI.
              </p>
            </div>

            <div>
              <span className="text-xs font-mono text-muted-foreground block mb-1">
                Theme
              </span>
              <p className="text-foreground font-medium">
                Pine, Crimson, and a WebGL shader background.
              </p>
            </div>

            <div>
              <span className="text-xs font-mono text-muted-foreground block mb-1">
                Stack
              </span>
              <p className="text-foreground font-medium">
                Next.js, React, Tailwind CSS, and Framer Motion.
              </p>
            </div>

            <div>
              <span className="text-xs font-mono text-muted-foreground block mb-1">
                Links
              </span>
              <div className="flex items-center gap-3">
                <a
                  href="https://linkedin.com/in/henrikkohl"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary dark:text-[#A8E3D2] hover:underline font-medium inline-flex items-center gap-1"
                >
                  LinkedIn <ArrowUpRight className="size-3" />
                </a>
                <a
                  href="https://github.com/bergets"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary dark:text-[#A8E3D2] hover:underline font-medium inline-flex items-center gap-1"
                >
                  GitHub <ArrowUpRight className="size-3" />
                </a>
              </div>
            </div>
          </div>
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
