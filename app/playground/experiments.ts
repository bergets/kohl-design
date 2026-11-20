export interface PlaygroundExperiment {
  slug: string;
  title: string;
  summary: string;
  status: string;
  href: string;
}

export const PLAYGROUND_EXPERIMENTS: PlaygroundExperiment[] = [
  {
    slug: "auction-guesser",
    title: "Auction price guesser",
    summary:
      "Guess the hammer price of classic furniture, lamps, and interior decor from Scandinavian auctions.",
    status: "Playable",
    href: "/playground/auction-guesser",
  },
];
