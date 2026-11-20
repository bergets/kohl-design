import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { Icon } from "@/components/ui/icon";
import { AuctionGuesser } from "./AuctionGuesser";

export const metadata: Metadata = {
  title: "Auction Price Guesser — Playground — kohl.design",
  description:
    "Guess the hammer price of classic Scandinavian furniture, lamps, and interior decoration.",
};

export default function AuctionGuesserPage() {
  return (
    <div className="min-h-dvh flex flex-col justify-between relative z-10">
      <SiteHeader />

      <main className="flex-1 w-full px-6 sm:px-8 md:px-12 lg:px-14 py-8 sm:py-12">
        <div className="mx-auto w-full max-w-3xl space-y-6">
          <Link
            href="/playground"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <Icon icon={ArrowLeft} size="xs" />
            <span>Back to playground</span>
          </Link>

          <AuctionGuesser />
        </div>
      </main>

      <footer className="w-full px-6 sm:px-8 md:px-12 lg:px-14 pb-6 sm:pb-8 text-xs text-muted-foreground">
        <span>kohl.design · Playground</span>
      </footer>
    </div>
  );
}
