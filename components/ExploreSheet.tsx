"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { X, ArrowUpRight, Compass } from "lucide-react";
import { cooper } from "@/app/fonts";

interface NavDestination {
  name: string;
  href: string;
  sub: string;
  live?: boolean;
}

const DESTINATIONS: NavDestination[] = [
  {
    name: "Work",
    href: "/work",
    sub: "Selected craft, commercial engineering & CV",
  },
  {
    name: "Side Projects",
    href: "/projects",
    sub: "Experiments, tools & design system",
  },
  {
    name: "Skills",
    href: "/skills",
    sub: "Favourite LLM prompts & design engineering skills",
    live: true,
  },
  {
    name: "Notes",
    href: "/notes",
    sub: "Writing, design observations & micro-essays",
  },
  {
    name: "About",
    href: "/about",
    sub: "Bio, design ethos & colophon",
  },
];

export function ExploreSheet() {
  const [isOpen, setIsOpen] = React.useState(false);
  const pathname = usePathname();

  // Close on route change
  React.useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Keyboard shortcut listener (Esc to close, ⌘K or 'e' to toggle)
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger shortcuts if user is typing in an input/textarea
      const activeTag = document.activeElement?.tagName.toLowerCase();
      if (activeTag === "input" || activeTag === "textarea") return;

      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      } else if (
        (e.key === "k" && (e.metaKey || e.ctrlKey)) ||
        (e.key.toLowerCase() === "e" && !e.metaKey && !e.ctrlKey && !e.altKey && !isOpen)
      ) {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Lock body scroll when drawer is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      {/* Tactile Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-expanded={isOpen}
        aria-label="Open Explore Navigation"
        className="group inline-flex items-center gap-2 h-10 px-3.5 rounded-[var(--radius)] border border-border/80 dark:border-[#3B7D6F]/60 bg-white/70 dark:bg-black/30 hover:bg-white dark:hover:bg-black/50 backdrop-blur-sm transition-all duration-200 cursor-pointer active:scale-95 shadow-2xs"
      >
        <span className="text-sm font-medium text-pine-900 dark:text-[#FCD3D6] group-hover:text-primary dark:group-hover:text-white transition-colors">
          Explore
        </span>
      </button>

      {/* Drawer Overlay & Content */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex justify-end" role="dialog" aria-modal="true">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-xs cursor-pointer"
            />

            {/* Slide Panel: Desktop right-slide, Mobile bottom-sheet */}
            <motion.div
              initial={{ x: "100%", y: 0 }}
              animate={{ x: 0, y: 0 }}
              exit={{ x: "100%", y: 0 }}
              transition={{
                type: "spring",
                damping: 30,
                stiffness: 300,
                mass: 0.8,
              }}
              className="relative z-10 w-full sm:max-w-md lg:max-w-lg h-full flex flex-col justify-between p-6 sm:p-8 bg-white/95 dark:bg-[#011D18]/95 backdrop-blur-xl border-l border-border dark:border-[#3B7D6F]/50 shadow-2xl overflow-y-auto"
            >
              {/* Header Row */}
              <div className="flex items-center justify-between pb-6 border-b border-pine-800/10 dark:border-[#3B7D6F]/30">
                <span className={`${cooper.className} text-3xl font-normal text-pine-900 dark:text-[#FCD3D6]`}>
                  Explore
                </span>

                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close menu"
                  className="group inline-flex items-center gap-1.5 h-8 px-2.5 rounded-[var(--radius-sm)] border border-border/80 dark:border-[#3B7D6F]/60 bg-transparent hover:bg-neutral-100 dark:hover:bg-black/30 transition-all cursor-pointer text-xs font-medium text-muted-foreground hover:text-foreground active:scale-95"
                >
                  <X className="size-3.5 transition-transform group-hover:rotate-90" />
                  <span>Close</span>
                </button>
              </div>

              {/* Navigation List */}
              <nav className="my-auto py-6 space-y-2" aria-label="Explore Destinations">
                {DESTINATIONS.map((dest) => {
                  const isActive = pathname === dest.href;

                  return (
                    <Link
                      key={dest.href}
                      href={dest.href}
                      className={`group block w-full p-4 rounded-[var(--radius)] border transition-all duration-200 ${
                        isActive
                          ? "bg-pine-50/80 dark:bg-[#A8E3D2]/10 border-primary/40 dark:border-[#A8E3D2]/40 shadow-2xs"
                          : dest.live
                          ? "bg-pine-50/40 dark:bg-white/[0.03] border-pine-200/60 dark:border-[#3B7D6F]/30 hover:border-primary/50 dark:hover:border-[#A8E3D2]/50 hover:bg-pine-50 dark:hover:bg-white/[0.06]"
                          : "border-transparent hover:bg-pine-50/50 dark:hover:bg-white/[0.04] hover:border-border/60 dark:hover:border-[#3B7D6F]/20"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-3">
                          <span
                            className={`${cooper.className} text-2xl font-normal tracking-tight transition-colors ${
                              isActive
                                ? "text-primary dark:text-[#FCD3D6]"
                                : dest.live
                                ? "text-pine-900 dark:text-white group-hover:text-primary dark:group-hover:text-[#A8E3D2]"
                                : "text-pine-900 dark:text-white group-hover:text-primary dark:group-hover:text-[#FCD3D6]"
                            }`}
                          >
                            {dest.name}
                          </span>
                          {dest.live && (
                            <span className="px-1.5 py-0.5 rounded-[4px] text-[9px] font-bold tracking-wider uppercase bg-accent text-white dark:bg-crimson-500 shadow-2xs">
                              Live
                            </span>
                          )}
                        </div>

                        <ArrowUpRight
                          className={`size-4 transition-all duration-200 ${
                            dest.live
                              ? "text-primary dark:text-[#A8E3D2] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                              : "text-muted-foreground group-hover:text-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                          }`}
                        />
                      </div>

                      <p className="text-xs text-muted-foreground dark:text-neutral-400 line-clamp-1">
                        {dest.sub}
                      </p>
                    </Link>
                  );
                })}
              </nav>

              {/* Footer Row */}
              <div className="pt-6 border-t border-pine-800/10 dark:border-[#3B7D6F]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
                <span className="text-muted-foreground font-mono text-[11px]">
                  kohl.design · 2026
                </span>

                <div className="flex items-center gap-4 text-muted-foreground">
                  <a
                    href="https://linkedin.com/in/henrikkohl"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary dark:hover:text-[#A8E3D2] transition-colors"
                  >
                    LinkedIn ↗
                  </a>
                  <a
                    href="https://github.com/bergets"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary dark:hover:text-[#A8E3D2] transition-colors"
                  >
                    GitHub ↗
                  </a>
                  <Link
                    href="/design-system"
                    className="hover:text-primary dark:hover:text-[#A8E3D2] transition-colors"
                  >
                    Design System ↗
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
