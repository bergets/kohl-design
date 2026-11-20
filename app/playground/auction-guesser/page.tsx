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
      className="min-h-dvh bg-background text-foreground flex flex-col justify-center relative z-10 px-6 sm:px-8 md:px-12 lg:px-14 py-10 sm:py-16"
    >
      <main className="mx-auto w-full max-w-3xl">
        <AuctionGuesser />
      </main>
    </div>
  );
}
