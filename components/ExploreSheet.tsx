"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { X, ArrowUpRight } from "lucide-react";
import { cooper } from "@/app/fonts";

interface NavDestination {
  num: string;
  name: string;
  href: string;
  sub: string;
  badge?: string;
}

const DESTINATIONS: NavDestination[] = [
  {
    num: "01",
    name: "Work",
    href: "/work",
    sub: "Career timeline, UX leadership & product design",
  },
  {
    num: "02",
    name: "Side Projects",
    href: "/projects",
    sub: "Experiments, tools & design system",
  },
  {
    num: "03",
    name: "Skills",
    href: "/skills",
    sub: "Favourite LLM prompts & design engineering skills",
    badge: "LIVE",
  },
  {
    num: "04",
    name: "Notes",
    href: "/notes",
    sub: "Writing, design observations & micro-essays",
  },
  {
    num: "05",
    name: "About",
    href: "/about",
    sub: "Bio, design ethos & colophon",
  },
];

export function ExploreSheet() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(false);
  const pathname = usePathname();

  // Detect mobile viewport for directional detached animation
  React.useEffect(() => {
    const mql = window.matchMedia("(max-width: 639px)");
    setIsMobile(mql.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

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
      {/* Tactile Trigger Button with Destination Count */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-expanded={isOpen}
        aria-label="Open Explore Navigation"
        className="group inline-flex items-center gap-2 h-10 px-3.5 rounded-[var(--radius)] border border-border/80 bg-background/80 hover:bg-muted/60 backdrop-blur-sm transition-all duration-200 cursor-pointer active:scale-95 shadow-2xs"
      >
        <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
          Explore
        </span>
        <span className="text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 transition-colors">
          5
        </span>
      </button>

      {/* Drawer Overlay & Detached Island Panel */}
      <AnimatePresence>
        {isOpen && (
          <div
            className="fixed inset-0 z-50 flex items-end sm:items-stretch sm:justify-end p-3 sm:p-5 lg:p-6 pointer-events-none"
            role="dialog"
            aria-modal="true"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/45 dark:bg-black/65 backdrop-blur-xs cursor-pointer pointer-events-auto"
            />

            {/* Detached Floating Island Panel */}
            <motion.div
              initial={isMobile ? { y: 40, opacity: 0, scale: 0.98 } : { x: 50, opacity: 0, scale: 0.98 }}
              animate={isMobile ? { y: 0, opacity: 1, scale: 1 } : { x: 0, opacity: 1, scale: 1 }}
              exit={isMobile ? { y: 40, opacity: 0, scale: 0.98 } : { x: 50, opacity: 0, scale: 0.98 }}
              transition={{
                type: "spring",
                damping: 28,
                stiffness: 320,
                mass: 0.8,
              }}
              className="explore-sheet-panel pointer-events-auto relative z-10 w-full sm:w-[440px] max-w-full max-h-[calc(100dvh-1.5rem)] sm:max-h-[calc(100dvh-2.5rem)] lg:max-h-[calc(100dvh-3rem)] sm:h-[calc(100dvh-2.5rem)] lg:h-[calc(100dvh-3rem)] flex flex-col justify-between p-5 sm:p-7 bg-white/95 dark:bg-[#011D18]/95 backdrop-blur-xl border border-border/80 dark:border-border shadow-2xl rounded-3xl sm:rounded-2xl lg:rounded-3xl overflow-y-auto"
            >
              {/* Mobile Drag Indicator Handle */}
              <div className="sm:hidden w-10 h-1 rounded-full bg-foreground/20 dark:bg-white/20 mx-auto -mt-1 mb-3 shrink-0" />

              {/* Header Row */}
              <div className="flex items-center justify-between pb-5 border-b border-border/60 shrink-0">
                <div className="flex items-center gap-2.5">
                  <span className={`${cooper.className} text-2xl sm:text-3xl font-normal text-foreground`}>
                    Explore
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 font-semibold">
                    5 Destinations
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close menu"
                  className="group inline-flex items-center gap-1.5 h-8 px-2.5 rounded-[var(--radius-sm)] border border-border/80 bg-transparent hover:bg-muted/70 transition-all cursor-pointer text-xs font-medium text-muted-foreground hover:text-foreground active:scale-95"
                >
                  <X className="size-3.5 transition-transform group-hover:rotate-90" />
                  <span className="hidden sm:inline">Close</span>
                </button>
              </div>

              {/* Navigation List */}
              <nav className="my-auto py-4 sm:py-6 space-y-1 sm:space-y-1.5" aria-label="Explore Destinations">
                {DESTINATIONS.map((dest) => {
                  const isActive = pathname === dest.href;

                  return (
                    <Link
                      key={dest.href}
                      href={dest.href}
                      className={`group block w-full p-3 sm:p-3.5 rounded-[var(--radius)] border transition-all duration-200 ${
                        isActive
                          ? "bg-primary/10 border-primary/30 shadow-2xs"
                          : "border-transparent hover:bg-muted/50 hover:border-border/60"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-0.5">
                        <div className="flex items-center gap-2.5">
                          <span className="text-xs font-mono text-muted-foreground/70 w-5 shrink-0">
                            {dest.num}
                          </span>
                          <span
                            className={`${cooper.className} text-xl sm:text-2xl font-normal tracking-tight transition-colors ${
                              isActive
                                ? "text-primary"
                                : "text-foreground group-hover:text-primary"
                            }`}
                          >
                            {dest.name}
                          </span>
                          {dest.badge && (
                            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-crimson-100 text-crimson-700 dark:bg-crimson-900/60 dark:text-crimson-200 uppercase tracking-wider">
                              {dest.badge}
                            </span>
                          )}
                        </div>

                        <ArrowUpRight
                          className="size-4 text-muted-foreground/80 group-hover:text-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200 shrink-0"
                        />
                      </div>

                      <p className="text-xs text-muted-foreground pl-7.5 line-clamp-1">
                        {dest.sub}
                      </p>
                    </Link>
                  );
                })}
              </nav>

              {/* Footer Row */}
              <div className="pt-4 sm:pt-5 border-t border-border/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs shrink-0">
                <span className="text-muted-foreground font-mono text-[11px]">
                  kohl.design · 2026
                </span>

                <div className="flex items-center gap-4 text-muted-foreground">
                  <a
                    href="https://linkedin.com/in/henrikkohl"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary transition-colors"
                  >
                    LinkedIn ↗
                  </a>
                  <a
                    href="https://github.com/bergets"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary transition-colors"
                  >
                    GitHub ↗
                  </a>
                  <Link
                    href="/design-system"
                    className="hover:text-primary transition-colors"
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
