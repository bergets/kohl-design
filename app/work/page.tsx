import type { Metadata } from "next";
import Link from "next/link";
import { cooper } from "@/app/fonts";
import { SiteHeader } from "@/components/SiteHeader";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Work — Henrik Kohl",
  description: "Product design, UX work, and past roles by Henrik Kohl.",
};

interface HighlightProject {
  title: string;
  context: string;
  summary: string;
  outcome?: string;
}

const SELECTED_WORK: HighlightProject[] = [
  {
    title: "Quinyx Core Scheduling",
    context: "Quinyx · 2022–Present · Product Area Design Lead",
    summary:
      "Leading product design for the core scheduling experience — the main product Quinyx customers use every day to plan shifts, manage staffing, and run frontline operations.",
  },
  {
    title: "Aditro Mobile HR",
    context: "Aditro · 2017–2021 · Designer & Interim PM",
    summary:
      "Built mobile HR self-service apps for employees and managers from scratch in a small UX team of five. Ran stakeholder interviews, workshops, and iterative Adobe XD user testing across Sweden, taking the product from internal beta and pilot customers to full release.",
    outcome: "Adopted by 80,000+ users across Nordic organizations before Aditro was acquired by SD Worx.",
  },
  {
    title: "Mediatek, Libero Kundklubb & Vera & John",
    context: "Lovable Rogues & Telegram Studios · 2013–2017",
    summary:
      "Client and agency UX work for well-known brands including Mediatek (external and event sites), Libero Kundklubb (quantitative user analysis), and Vera & John (mobile-first experience), alongside products like Auddly, Dockspot, and MammaFitness PT Online.",
  },
];

interface Role {
  title: string;
  period: string;
  type?: string;
  isCurrent?: boolean;
  description: string;
}

interface CompanyExperience {
  company: string;
  location: string;
  totalDuration?: string;
  overview?: string;
  roles: Role[];
}

const CAREER_EXPERIENCES: CompanyExperience[] = [
  {
    company: "Quinyx",
    location: "Stockholm",
    totalDuration: "4 yrs 2 mos",
    overview: "Workforce management platform for frontline teams.",
    roles: [
      {
        title: "Product Area Design Lead (UX/UI)",
        period: "Jul 2023 – Present",
        type: "Full-time",
        isCurrent: true,
        description:
          "Leading product design direction, UX strategy, and interface standards for Quinyx's core scheduling experience — the main product customers use.",
      },
      {
        title: "Product Designer",
        period: "Aug 2022 – Jul 2023",
        type: "Full-time",
        description:
          "Designed web and mobile workflows for frontline employees and managers, alongside design system components and prototypes.",
      },
    ],
  },
  {
    company: "Aditro",
    location: "Stockholm",
    totalDuration: "5 yrs 10 mos",
    overview: "Nordic HR, payroll, and employee self-service software, acquired by SD Worx.",
    roles: [
      {
        title: "UX Designer & Interim Product Manager",
        period: "Jan 2017 – Oct 2022",
        type: "Full-time",
        description:
          "Led UX and mobile product design for Aditro's cloud HR apps, turning legacy desktop admin flows into mobile self-service for employees and managers. Also stepped in as interim PM, ran customer presentations, and worked closely with sales and support.",
      },
    ],
  },
  {
    company: "Wemore AB",
    location: "Stockholm",
    totalDuration: "2 mos",
    roles: [
      {
        title: "UX Designer",
        period: "Jan 2017 – Feb 2017",
        type: "Contract",
        description:
          "Product discovery, UX structure, and wireframing for client engagements.",
      },
    ],
  },
  {
    company: "Lovable Rogues",
    location: "Stockholm",
    totalDuration: "1 yr 1 mo",
    roles: [
      {
        title: "UX Designer",
        period: "Jan 2016 – Jan 2017",
        type: "Full-time",
        description:
          "Requirements gathering, workshops, wireframes, and interactive prototypes for web and mobile products.",
      },
    ],
  },
  {
    company: "Telegram Studios",
    location: "Stockholm",
    totalDuration: "2 yrs 3 mos",
    roles: [
      {
        title: "UX Designer",
        period: "Oct 2013 – Dec 2015",
        type: "Full-time",
        description:
          "UX design, user behaviour analysis, information architecture, and user testing across digital services and client sites.",
      },
    ],
  },
  {
    company: "Nordnet Bank AB",
    location: "Stockholm",
    totalDuration: "3 mos",
    roles: [
      {
        title: "UX Designer",
        period: "Jun 2012 – Aug 2012",
        type: "Internship",
        description:
          "Worked on web banking interfaces, transaction flows, and usability improvements.",
      },
    ],
  },
];

const BRAND_LOGOS = [
  { name: "Quinyx", src: "/logos/quinyx.svg", className: "h-6 sm:h-7" },
  { name: "Aditro", src: "/logos/aditro.png", className: "h-5 sm:h-6" },
  { name: "SD Worx", src: "/logos/sd-worx.png", className: "h-6 sm:h-7" },
  { name: "Nordnet", src: "/logos/nordnet.svg", className: "h-4 sm:h-5" },
  { name: "MediaTek", src: "/logos/mediatek.svg", className: "h-5 sm:h-6" },
  { name: "Libero", src: "/logos/libero.svg", className: "h-6 sm:h-7" },
  { name: "Vera & John", src: "/logos/verajohn.png", className: "h-9 sm:h-10" },
];

export default function WorkPage() {
  return (
    <div className="min-h-dvh flex flex-col justify-between relative z-10">
      <SiteHeader />
      <main className="flex-1 w-full flex flex-col justify-between px-6 sm:px-8 md:px-12 lg:px-14 pb-6 sm:pb-8 md:pb-12 lg:pb-14">
        <div className="my-auto py-10 sm:py-16 w-full max-w-4xl space-y-12 sm:space-y-16">
          {/* Header */}
          <div className="space-y-4">
            <h1
              className={`${cooper.className} text-5xl sm:text-6xl md:text-7xl font-normal tracking-tight text-pine-800 dark:text-crimson-100 transition-colors duration-300`}
            >
              Work
            </h1>
            <p className="max-w-2xl text-base sm:text-lg text-pine-700/80 dark:text-pine-200/80 leading-relaxed font-sans">
              Over a decade designing products, HR and workforce tools, and mobile apps in Stockholm.
            </p>
            <div className="pt-2">
              <Button asChild variant="outline" size="default">
                <a
                  href="https://linkedin.com/in/henrikkohl"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>LinkedIn</span>
                  <ArrowUpRight className="size-3.5" />
                </a>
              </Button>
            </div>
          </div>

          {/* Monochrome Logo Strip */}
          <section aria-label="Companies and brands" className="border-t border-pine-800/10 dark:border-[#3B7D6F]/25 pt-6">
            {/* Mobile: smooth infinite marquee with soft edge fade */}
            <div className="md:hidden overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
              <div className="flex w-max animate-logo-marquee hover:[animation-play-state:paused]">
                {[0, 1].map((dupIndex) => (
                  <div
                    key={dupIndex}
                    aria-hidden={dupIndex === 1}
                    className="flex items-center gap-10 pr-10 shrink-0"
                  >
                    {BRAND_LOGOS.map((logo) => (
                      <img
                        key={`${dupIndex}-${logo.name}`}
                        src={logo.src}
                        alt={dupIndex === 0 ? logo.name : ""}
                        className={`${logo.className} w-auto shrink-0 object-contain grayscale brightness-0 dark:invert opacity-70`}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Desktop: clean single-row strip */}
            <div className="hidden md:flex items-center justify-between gap-8">
              {BRAND_LOGOS.map((logo) => (
                <img
                  key={logo.name}
                  src={logo.src}
                  alt={logo.name}
                  className={`${logo.className} w-auto object-contain grayscale brightness-0 dark:invert opacity-65 hover:opacity-100 transition-opacity`}
                />
              ))}
            </div>
          </section>

          {/* Selected Work from Portfolio */}
          <section className="space-y-4">
            <h2 className={`${cooper.className} text-2xl sm:text-3xl font-normal text-pine-900 dark:text-white`}>
              What I’ve worked on
            </h2>
            <div className="border-t border-pine-800/10 dark:border-[#3B7D6F]/25 divide-y divide-pine-800/10 dark:divide-[#3B7D6F]/25">
              {SELECTED_WORK.map((item) => (
                <div key={item.title} className="py-6 sm:py-7 space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <h3 className={`${cooper.className} text-xl sm:text-2xl font-normal text-foreground`}>
                      {item.title}
                    </h3>
                    <span className="font-mono text-xs text-muted-foreground">
                      {item.context}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl">
                    {item.summary}
                  </p>
                  {item.outcome && (
                    <p className="text-xs font-medium text-foreground pt-0.5">
                      {item.outcome}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Experience Timeline */}
          <section className="space-y-4">
            <h2 className={`${cooper.className} text-2xl sm:text-3xl font-normal text-pine-900 dark:text-white`}>
              Experience
            </h2>
            <div className="border-t border-pine-800/10 dark:border-[#3B7D6F]/25 divide-y divide-pine-800/10 dark:divide-[#3B7D6F]/25">
              {CAREER_EXPERIENCES.map((exp) => (
                <div key={exp.company} className="py-6 sm:py-7 space-y-5">
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                      <div>
                        <h3 className={`${cooper.className} text-xl sm:text-2xl font-normal text-foreground`}>
                          {exp.company}
                        </h3>
                        {exp.overview && (
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {exp.overview}
                          </p>
                        )}
                      </div>
                      <span className="text-xs text-muted-foreground shrink-0">
                        {exp.location}
                        {exp.totalDuration ? ` · ${exp.totalDuration}` : ""}
                      </span>
                    </div>

                    <div className="space-y-4">
                      {exp.roles.map((role) => (
                        <div key={role.title} className="space-y-1.5">
                          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <h4 className="text-sm sm:text-base font-semibold text-foreground">
                                {role.title}
                              </h4>
                              {role.isCurrent && (
                                <Badge variant="default" size="sm">
                                  Current
                                </Badge>
                              )}
                            </div>
                            <span className="text-xs text-muted-foreground">
                              {role.period}
                              {role.type ? ` · ${role.type}` : ""}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl">
                            {role.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
              ))}
            </div>
          </section>
        </div>

        {/* Footer */}
        <footer className="w-full pt-6 text-xs text-pine-600/70 dark:text-pine-400/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <span>kohl.design · 2026</span>
          <div className="flex items-center gap-4">
            <Link href="/" className="hover:text-primary dark:hover:text-[#A8E3D2] transition-colors">
              Home
            </Link>
            <Link href="/projects" className="hover:text-primary dark:hover:text-[#A8E3D2] transition-colors">
              Projects
            </Link>
            <Link href="/about" className="hover:text-primary dark:hover:text-[#A8E3D2] transition-colors">
              About
            </Link>
            <a
              href="https://linkedin.com/in/henrikkohl"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary dark:hover:text-[#A8E3D2] transition-colors"
            >
              LinkedIn ↗
            </a>
          </div>
        </footer>
      </main>
    </div>
  );
}
