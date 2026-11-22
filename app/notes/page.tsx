import type { Metadata } from "next";
import Link from "next/link";
import { cooper } from "@/app/fonts";
import { SiteHeader } from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "Notes & Writing — kohl.design",
  description: "Essays, design engineering observations, and thoughts on software craft.",
};

interface NoteItem {
  title: string;
  href: string;
  date: string;
  readingTime: string;
  snippet: string;
}

const NOTES: NoteItem[] = [
  {
    title: "Compound Design",
    href: "/notes/compound-design",
    date: "Nov 22, 2026",
    readingTime: "2 min read",
    snippet:
      "A small skill that pulls design rules and anti-patterns out of your LLM chats and saves them to your design system, so you stop repeating yourself.",
  },
];

export default function NotesPage() {
  return (
    <div className="min-h-dvh flex flex-col justify-between relative z-10">
      <SiteHeader />
      <main className="flex-1 w-full flex flex-col justify-between px-6 sm:px-8 md:px-12 lg:px-14 pb-6 sm:pb-8 md:pb-12 lg:pb-14">

      {/* Main Content Area */}
      <div className="my-auto py-10 sm:py-16 w-full max-w-4xl space-y-8 sm:space-y-12">
        <div className="space-y-4">
          <h1
            className={`${cooper.className} text-5xl sm:text-6xl md:text-7xl font-normal tracking-tight text-pine-800 dark:text-crimson-100 transition-colors duration-300`}
          >
            Notes
          </h1>
          <p className="max-w-2xl text-base sm:text-lg text-pine-700/80 dark:text-pine-200/80 leading-relaxed font-sans">
            Occasional writing on design, interfaces, and building for the web.
          </p>
        </div>

        {/* Notes List / Empty State */}
        <div className="w-full border-t border-pine-800/10 dark:border-[#3B7D6F]/25 divide-y divide-pine-800/10 dark:divide-[#3B7D6F]/25">
          {NOTES.length === 0 ? (
            <p className="py-8 text-sm sm:text-base text-muted-foreground">
              No notes published yet.
            </p>
          ) : (
            NOTES.map((note) => (
              <Link
                key={note.title}
                href={note.href}
                className="block group py-6 sm:py-8 space-y-2 transition-colors"
              >
                <article className="space-y-2">
                  <div className="flex items-center justify-between gap-4">
                    <h2 className={`${cooper.className} text-2xl sm:text-3xl font-normal text-pine-900 dark:text-white group-hover:text-primary dark:group-hover:text-[#A8E3D2] transition-colors`}>
                      {note.title}
                    </h2>
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
              </Link>
            ))
          )}
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
