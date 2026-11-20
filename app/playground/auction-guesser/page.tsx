import type { Metadata } from "next";
import { AuctionGuesser } from "./AuctionGuesser";

export const metadata: Metadata = {
  title: "Auction Price Guesser",
  description:
    "Guess the hammer price of classic Scandinavian furniture, lamps, and interior decoration.",
};

export default function AuctionGuesserPage() {
  return (
    <div
      data-theme-variant="neutral"
      className="min-h-dvh bg-background text-foreground flex flex-col relative z-10 px-6 sm:px-8 md:px-12 lg:px-14 pt-6 sm:pt-12 pb-0"
    >
      <main className="mx-auto w-full max-w-3xl flex-1 flex flex-col">
        <AuctionGuesser />
      </main>
    </div>
  );
}
