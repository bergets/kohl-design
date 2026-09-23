import type { Metadata } from "next";
import Link from "next/link";
import { cooper } from "@/app/fonts";
import { SiteHeader } from "@/components/SiteHeader";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, MapPin, Calendar, Briefcase, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "Work & Experience — Henrik Kohl",
  description: "Career timeline, UX leadership, and product design craft by Henrik Kohl.",
};

interface Role {
  title: string;
  period: string;
  type?: string;
  isCurrent?: boolean;
  description: string;
  tags?: string[];
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
    location: "Stockholm, Sweden",
    totalDuration: "4 yrs 2 mos",
    overview: "AI-powered frontline workforce management SaaS platform serving global enterprise organizations.",
    roles: [
      {
        title: "Product Area Design Lead (UX/UI)",
        period: "Jul 2023 — Present",
        type: "Full-time · On-site",
        isCurrent: true,
        description:
          "Leading product area design direction, UX strategy, and interface standards. Championing end-to-end craft, scalable design system architecture, complex operational workflow simplification, and cross-functional synergy between product, engineering, and enterprise customers.",
        tags: ["Design Leadership", "Enterprise SaaS", "AI Workflows", "Design Systems", "Product Strategy"],
      },
      {
        title: "Product Designer",
        period: "Aug 2022 — Jul 2023",
        type: "Full-time",
        description:
          "Designed core web and mobile experiences for frontline employees and workforce managers. Spearheaded design system evolution, user research, and tactile interactive prototypes.",
        tags: ["Product Design", "Mobile & Web", "Interaction Design", "Prototyping"],
      },
    ],
  },
  {
    company: "ADITRO",
    location: "Sundbyberg, Stockholm",
    totalDuration: "5 yrs 10 mos",
    overview: "Leading Nordic provider of mission-critical cloud HR, payroll, and employee self-service software.",
    roles: [
      {
        title: "UX Designer",
        period: "Jan 2017 — Oct 2022",
        type: "Full-time",
        description:
          "Led UX and interface design for enterprise Nordic HR and payroll applications. Transformed complex legacy administrative workflows into modern, responsive, human-centered self-service platforms. Drove extensive user research, journey mapping, and collaborative design standards.",
        tags: ["UX Design", "Complex Workflows", "Design Systems", "User Research", "Cloud HR"],
      },
    ],
  },
  {
    company: "Wemore AB",
    location: "Stockholm, Sweden",
    totalDuration: "2 mos",
    overview: "Specialist digital product consultancy.",
    roles: [
      {
        title: "UX Designer",
        period: "Jan 2017 — Feb 2017",
        type: "Konsultuppdrag (Consultancy)",
        description:
          "Targeted consulting engagement focused on client product discovery, UX architecture, and interface wireframing.",
        tags: ["Consultancy", "Discovery", "Wireframing"],
      },
    ],
  },
  {
    company: "Lovable Rogues",
    location: "Stockholm, Sweden",
    totalDuration: "1 yr 1 mo",
    overview: "Digital product and creative design studio.",
    roles: [
      {
        title: "User Experience Designer",
        period: "Jan 2016 — Jan 2017",
        type: "Full-time",
        description:
          "Crafted digital products and engaging brand interfaces for a variety of web and mobile applications. Developed high-fidelity interactive prototypes and refined UI motion.",
        tags: ["Interaction Design", "Prototyping", "Digital Products", "Mobile UI"],
      },
    ],
  },
  {
    company: "Telegram Studios",
    location: "Stockholm, Sweden",
    totalDuration: "2 yrs 3 mos",
    overview: "Game studio creating interactive digital player experiences.",
    roles: [
      {
        title: "User Experience Designer",
        period: "Oct 2013 — Dec 2015",
        type: "Full-time",
        description:
          "Designed playful game UI, player onboarding flows, and tactile interface mechanics. Focused on player engagement loops, clear visual hierarchies, and mobile responsiveness.",
        tags: ["Game UI/UX", "Tactile Interaction", "Onboarding", "Visual Polish"],
      },
    ],
  },
  {
    company: "Nordnet Bank AB",
    location: "Stockholm, Sweden",
    totalDuration: "3 mos",
    overview: "Pioneering pan-Nordic digital bank and investment platform.",
    roles: [
      {
        title: "User Experience Designer",
        period: "Jun 2012 — Aug 2012",
        type: "Internship",
        description:
          "Contributed to web banking interfaces, customer transaction flows, and usability improvements for retail investors.",
        tags: ["Fintech", "Banking UX", "Research"],
      },
    ],
  },
];

export default function WorkPage() {
  return (
    <div className="min-h-dvh flex flex-col justify-between relative z-10">
      <SiteHeader />
      <main className="flex-1 w-full flex flex-col justify-between px-6 sm:px-8 md:px-12 lg:px-14 pb-6 sm:pb-8 md:pb-12 lg:pb-14">

      {/* Main Content Area */}
      <div className="my-auto py-10 sm:py-16 w-full max-w-4xl space-y-10 sm:space-y-14">
        {/* Hero Header */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium tracking-tight bg-pine-100/70 text-pine-800 dark:bg-[#A8E3D2]/15 dark:text-[#A8E3D2] border border-pine-200/50 dark:border-[#3B7D6F]/30">
            <span>12+ Years Product & UX Leadership</span>
            <span>·</span>
            <span>Stockholm, Sweden</span>
          </div>

          <h1
            className={`${cooper.className} text-5xl sm:text-6xl md:text-7xl font-normal tracking-tight text-pine-800 dark:text-crimson-100 transition-colors duration-300`}
          >
            Work & Experience
          </h1>

          <p className="max-w-2xl text-base sm:text-lg text-pine-700/80 dark:text-pine-200/80 leading-relaxed font-sans">
            A decade-long journey leading product design, complex enterprise workflows, tactile interaction, and design systems across SaaS, fintech, and digital studios.
          </p>

          <div className="pt-2">
            <Button asChild variant="outline" size="default">
              <a
                href="https://linkedin.com/in/henrikkohl"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>View Full Profile on LinkedIn</span>
                <ArrowUpRight className="size-3.5" />
              </a>
            </Button>
          </div>
        </div>

        {/* Experience Timeline */}
        <div className="w-full space-y-6 border-t border-pine-800/10 dark:border-[#3B7D6F]/25 pt-8">
          {CAREER_EXPERIENCES.map((exp) => (
            <div
              key={exp.company}
              className="p-6 sm:p-8 rounded-[var(--radius)] border border-pine-800/10 dark:border-[#3B7D6F]/30 bg-white/60 dark:bg-black/20 backdrop-blur-sm space-y-6 shadow-2xs hover:border-primary/40 dark:hover:border-[#A8E3D2]/40 transition-colors"
            >
              {/* Company Header */}
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pb-4 border-b border-pine-800/10 dark:border-[#3B7D6F]/20">
                <div>
                  <h2 className={`${cooper.className} text-2xl sm:text-3xl font-normal text-pine-900 dark:text-white tracking-tight`}>
                    {exp.company}
                  </h2>
                  {exp.overview && (
                    <p className="text-xs text-muted-foreground mt-1 max-w-xl">
                      {exp.overview}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-2 text-xs text-muted-foreground shrink-0 font-medium">
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="size-3 text-muted-foreground/70" />
                    {exp.location}
                  </span>
                  {exp.totalDuration && (
                    <>
                      <span>·</span>
                      <span className="text-pine-800 dark:text-[#A8E3D2] font-semibold">
                        {exp.totalDuration}
                      </span>
                    </>
                  )}
                </div>
              </div>

              {/* Roles Inside Company */}
              <div className="space-y-6">
                {exp.roles.map((role, idx) => (
                  <div
                    key={role.title}
                    className={`relative ${
                      exp.roles.length > 1 && idx !== exp.roles.length - 1
                        ? "pb-6 border-b border-dashed border-pine-800/10 dark:border-[#3B7D6F]/20"
                        : ""
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1.5 mb-2">
                      <div className="flex items-center gap-2.5 flex-wrap">
                        <h3 className="text-base sm:text-lg font-semibold text-pine-900 dark:text-[#FCD3D6]">
                          {role.title}
                        </h3>
                        {role.isCurrent && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-primary/10 text-primary dark:bg-[#A8E3D2]/15 dark:text-[#A8E3D2]">
                            Current Role
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium">
                        <span>{role.period}</span>
                        {role.type && (
                          <>
                            <span>·</span>
                            <span className="text-muted-foreground/75 font-normal">{role.type}</span>
                          </>
                        )}
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground dark:text-neutral-300 leading-relaxed font-sans mb-3">
                      {role.description}
                    </p>

                    {role.tags && role.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {role.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 rounded-[4px] text-[11px] font-medium bg-pine-50/70 text-pine-800 dark:bg-white/[0.04] dark:text-[#A8E3D2] border border-pine-100 dark:border-white/[0.06]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Contact Call to Action */}
        <div className="p-6 sm:p-8 rounded-[var(--radius)] border border-primary/20 dark:border-[#3B7D6F]/40 bg-pine-50/50 dark:bg-[#011D18]/50 backdrop-blur-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h3 className={`${cooper.className} text-xl font-normal text-pine-900 dark:text-white`}>
              Let&apos;s build something great.
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Interested in collaborating, design leadership, or advisory?
            </p>
          </div>

          <Button asChild variant="default" size="lg" className="shrink-0">
            <a
              href="https://linkedin.com/in/henrikkohl"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>Slide into my LinkedIn DMs</span>
              <ArrowUpRight className="size-4" />
            </a>
          </Button>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full pt-6 text-xs text-pine-600/70 dark:text-pine-400/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <span>kohl.design · 2026</span>
        <div className="flex items-center gap-4">
          <Link href="/" className="hover:text-primary dark:hover:text-[#A8E3D2] transition-colors">
            Home
          </Link>
          <Link href="/skills" className="hover:text-primary dark:hover:text-[#A8E3D2] transition-colors">
            Skills
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
