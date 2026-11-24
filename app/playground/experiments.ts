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
  {
    slug: "type-sandbox",
    title: "Editorial type & rhythm",
    summary:
      "Test display and UI font pairings with real product copy, then export CSS tokens.",
    status: "Tool",
    href: "/playground/type-sandbox",
  },
  {
    slug: "branching-critique",
    title: "Branching critique canvas",
    summary:
      "Branch UI iterations on a 2D canvas, mark Keep or Reject, and extract AGENTS.md rules from the difference.",
    status: "Prototype",
    href: "/playground/branching-critique",
  },
  {
    slug: "research-artifacts",
    title: "Service design research artifacts",
    summary:
      "Turn raw qualitative interviews into Journey Maps, Service Blueprints, Stakeholder Maps, and Opportunity Trees.",
    status: "Prototype",
    href: "/playground/research-artifacts",
  },
];
