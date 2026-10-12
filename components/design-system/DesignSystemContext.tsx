"use client";

import * as React from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

export type ViewMode = "human" | "agent";
export type BrandTheme = "pine" | "blush";

interface DesignSystemContextValue {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  brandTheme: BrandTheme;
  setBrandTheme: (theme: BrandTheme) => void;
  mobileNavOpen: boolean;
  setMobileNavOpen: (open: boolean) => void;
  toggleMobileNav: () => void;
}

const DesignSystemContext = React.createContext<DesignSystemContextValue | undefined>(undefined);

export function DesignSystemProvider({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // Read initial view mode from URL or localStorage
  const [viewMode, setViewModeState] = React.useState<ViewMode>("human");
  const [brandTheme, setBrandThemeState] = React.useState<BrandTheme>("pine");
  const [mobileNavOpen, setMobileNavOpen] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    // 1. Check URL param first
    const urlView = searchParams.get("view");
    if (urlView === "agent" || urlView === "human") {
      setViewModeState(urlView);
    } else {
      // 2. Check localStorage
      const savedView = localStorage.getItem("kohl:docs-view") as ViewMode | null;
      if (savedView === "agent" || savedView === "human") {
        setViewModeState(savedView);
      }
    }

    // Check brand theme
    const savedTheme = localStorage.getItem("kohl:brand-theme") as BrandTheme | null;
    if (savedTheme === "pine" || savedTheme === "blush") {
      setBrandThemeState(savedTheme);
      applyThemeToDom(savedTheme);
    }
  }, [searchParams]);

  const applyThemeToDom = (theme: BrandTheme) => {
    if (typeof document === "undefined") return;
    if (theme === "blush") {
      document.documentElement.setAttribute("data-theme-variant", "blush");
      document.body.classList.add("theme-blush");
    } else {
      document.documentElement.removeAttribute("data-theme-variant");
      document.body.classList.remove("theme-blush");
    }
  };

  const setViewMode = React.useCallback(
    (mode: ViewMode) => {
      setViewModeState(mode);
      if (typeof window !== "undefined") {
        localStorage.setItem("kohl:docs-view", mode);
        const params = new URLSearchParams(searchParams.toString());
        if (mode === "agent") {
          params.set("view", "agent");
        } else {
          params.delete("view");
        }
        const newUrl = params.toString() ? `${pathname}?${params.toString()}` : pathname;
        router.replace(newUrl, { scroll: false });
      }
    },
    [pathname, router, searchParams]
  );

  const setBrandTheme = React.useCallback((theme: BrandTheme) => {
    setBrandThemeState(theme);
    if (typeof window !== "undefined") {
      localStorage.setItem("kohl:brand-theme", theme);
      applyThemeToDom(theme);
    }
  }, []);

  const toggleMobileNav = React.useCallback(() => {
    setMobileNavOpen((prev) => !prev);
  }, []);

  return (
    <DesignSystemContext.Provider
      value={{
        viewMode,
        setViewMode,
        brandTheme,
        setBrandTheme,
        mobileNavOpen,
        setMobileNavOpen,
        toggleMobileNav,
      }}
    >
      <div
        data-brand-theme={brandTheme}
        data-docs-view={viewMode}
        className={brandTheme === "blush" ? "theme-blush" : ""}
      >
        {children}
      </div>
    </DesignSystemContext.Provider>
  );
}

export function useDesignSystem() {
  const context = React.useContext(DesignSystemContext);
  if (!context) {
    throw new Error("useDesignSystem must be used within a DesignSystemProvider");
  }
  return context;
}
