import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cooper } from "@/app/fonts";
import { SiteHeader } from "@/components/SiteHeader";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Icon } from "@/components/ui/icon";
import { PLAYGROUND_EXPERIMENTS } from "./experiments";

export const metadata: Metadata = {
  title: "Playground — kohl.design",
  description: "Self-contained interactive experiments and small web tools.",
};

export default function PlaygroundPage() {
  return (
    <div className="min-h-dvh flex flex-col justify-between relative z-10">
      <SiteHeader />

      <main className="flex-1 w-full px-6 sm:px-8 md:px-12 lg:px-14 py-10 sm:py-16">
        <div className="mx-auto w-full max-w-3xl space-y-6">
          <div className="space-y-2">
            <h1
              className={`${cooper.className} text-3xl sm:text-4xl font-normal tracking-tight text-foreground`}
            >
              Playground
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground font-sans">
              Self-contained experiments, small games, and interactive prototypes.
            </p>
          </div>

          <Card variant="default" className="p-0 overflow-hidden gap-0">
            <div className="divide-y divide-border/60">
              {PLAYGROUND_EXPERIMENTS.map((experiment) => (
                <Link
                  key={experiment.slug}
                  href={experiment.href}
                  className="group flex items-start justify-between gap-4 p-5 sm:p-6 transition-colors hover:bg-muted/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <span className="text-base font-semibold text-foreground group-hover:text-primary transition-colors">
                        {experiment.title}
                      </span>
                      <Badge variant="default" size="sm">
                        {experiment.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {experiment.summary}
                    </p>
                  </div>

                  <Icon
                    icon={ArrowUpRight}
                    size="sm"
                    intent="muted"
                    className="mt-1 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground"
                  />
                </Link>
              ))}
            </div>
          </Card>
        </div>
      </main>

      <footer className="w-full px-6 sm:px-8 md:px-12 lg:px-14 pb-6 sm:pb-8 text-xs text-muted-foreground">
        <span>kohl.design · 2026</span>
      </footer>
    </div>
  );
}
