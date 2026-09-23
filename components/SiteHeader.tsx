"use client";

import * as React from "react";
import Link from "next/link";
import { BrandFlower } from "@/components/BrandFlower";
import { ThemeToggle } from "@/components/theme-toggle";
import { ExploreSheet } from "@/components/ExploreSheet";

export function SiteHeader({ className = "" }: { className?: string }) {
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 12);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ease-out ${
        isScrolled ? "py-2 sm:py-2.5" : "py-4 sm:py-5"
      } ${className}`}
    >
      {/* Soft gradient mask backdrop:
          Only applied/visible when scrolling starts (isScrolled).
          Extends below the header with a vertical mask gradient so both blur and background
          dissolve gracefully into transparency. */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 -bottom-8 sm:-bottom-10 bg-background/80 dark:bg-background/85 backdrop-blur-md transition-opacity duration-300 [mask-image:linear-gradient(to_bottom,black_0%,black_55%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,black_0%,black_55%,transparent_100%)] ${
          isScrolled ? "opacity-100" : "opacity-0"
        }`}
      />

      <div className="relative z-10 w-full px-6 sm:px-8 md:px-12 lg:px-14 flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center group transition-transform duration-300 hover:scale-105"
          aria-label="kohl.design home"
        >
          <BrandFlower
            className={`text-pine-800 dark:text-crimson-100 transition-all duration-300 ${
              isScrolled
                ? "size-8 sm:size-9 md:size-9"
                : "size-10 sm:size-11 md:size-12"
            }`}
          />
        </Link>
        <div className="flex items-center gap-3">
          <ExploreSheet />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
