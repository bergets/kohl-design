"use client";

import * as React from "react";
import { DocsSidebar } from "./DocsSidebar";
import { DocsHeader } from "./DocsHeader";
import { AgentViewOverlay } from "./AgentViewOverlay";
import { useDesignSystem } from "./DesignSystemContext";
import { cn } from "@/lib/utils";

export function DocsShell({ children }: { children: React.ReactNode }) {
  const { viewMode, mobileNavOpen, setMobileNavOpen } = useDesignSystem();

  return (
    <div className="min-h-screen bg-background text-foreground antialiased flex flex-col">
      <div className="flex flex-1">
        {/* Desktop Sidebar (Left Rail) */}
        <div className="hidden md:block w-64 shrink-0 fixed inset-y-0 left-0 z-20">
          <DocsSidebar className="h-full" />
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileNavOpen && (
          <div className="fixed inset-0 z-50 md:hidden flex">
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
              onClick={() => setMobileNavOpen(false)}
            />
            {/* Drawer Panel */}
            <div className="relative w-72 max-w-[80vw] h-full z-10 shadow-2xl">
              <DocsSidebar className="h-full" />
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <div className="flex-1 md:pl-64 flex flex-col min-w-0">
          <DocsHeader />

          <main className="flex-1 px-4 sm:px-8 py-8 max-w-6xl w-full mx-auto">
            {viewMode === "agent" ? (
              <AgentViewOverlay />
            ) : (
              <div className="transition-opacity duration-200">{children}</div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
