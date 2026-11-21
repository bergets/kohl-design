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
        <section className="border-t border-pine-800/10 dark:border-[#3B7D6F]/25 pt-8 space-y-5">
          <h2 className={`${cooper.className} text-2xl sm:text-3xl font-normal text-pine-900 dark:text-white`}>
            Colophon
          </h2>

          <div className="space-y-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
            <p>
              This site is my small corner of the web — a place to try out ideas, maintain a{" "}
              <Link href="/design-system" className="text-foreground underline underline-offset-4 hover:text-primary dark:hover:text-[#A8E3D2] transition-colors">
                design system
              </Link>{" "}
              I actually enjoy using, and build things alongside coding agents after the kids are asleep.
            </p>
            <p>
              Set in <span className="text-foreground font-medium">Cooper</span> for headings because it brings a bit of warmth, and <span className="text-foreground font-medium">DM Sans</span> to keep everything else easy to read, paired with deep Pine, Crimson, and a slow WebGL shader in the background.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-5 pt-2 text-sm">
            <a
              href="https://linkedin.com/in/henrikkohl"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground hover:text-primary dark:hover:text-[#A8E3D2] font-medium inline-flex items-center gap-1 transition-colors"
            >
              <span>LinkedIn</span>
              <ArrowUpRight className="size-3.5" />
            </a>
            <a
              href="https://github.com/bergets"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground hover:text-primary dark:hover:text-[#A8E3D2] font-medium inline-flex items-center gap-1 transition-colors"
            >
              <span>GitHub</span>
              <ArrowUpRight className="size-3.5" />
            </a>
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
