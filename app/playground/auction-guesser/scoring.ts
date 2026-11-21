export type ProximityBand = "hammered" | "very-close" | "warm" | "cold";
export type GuessDirection = "higher" | "lower" | "exact";

export interface DailyGuessEvaluation {
  guess: number;
  direction: GuessDirection;
  band: ProximityBand;
  errorRatio: number;
  isWin: boolean;
}

export const DAILY_MAX_GUESSES = 6;
export const WIN_TOLERANCE_RATIO = 0.05;

export function formatSek(amount: number): string {
  return `${new Intl.NumberFormat("sv-SE").format(Math.round(amount))} SEK`;
}

export function getTodayKey(): string {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function getDailyLotIndex(dateKey: string, totalLots: number): number {
  let hash = 0;
  for (let i = 0; i < dateKey.length; i += 1) {
    hash = (hash * 31 + dateKey.charCodeAt(i)) >>> 0;
  }
  return hash % totalLots;
}

export function getDailyLotIndices(
  dateKey: string,
  totalLots: number
): [number, number] {
  const first = getDailyLotIndex(dateKey, totalLots);
  let hash2 = 7;
  for (let i = 0; i < dateKey.length; i += 1) {
    hash2 = (hash2 * 37 + dateKey.charCodeAt(i)) >>> 0;
  }
  const offset = 1 + (hash2 % Math.max(1, totalLots - 1));
  const second = (first + offset) % totalLots;
  return [first, second];
}

export function getProximityBand(errorRatio: number): ProximityBand {
  if (errorRatio <= WIN_TOLERANCE_RATIO) return "hammered";
  if (errorRatio <= 0.15) return "very-close";
  if (errorRatio <= 0.3) return "warm";
  return "cold";
}

export function bandLabel(band: ProximityBand): string {
  switch (band) {
    case "hammered":
      return "Within 5%";
    case "very-close":
      return "Very close";
    case "warm":
      return "Warm";
    case "cold":
      return "Cold";
  }
}

export function evaluateDailyGuess(
  guess: number,
  hammerPrice: number
): DailyGuessEvaluation {
  const errorRatio = Math.abs(guess - hammerPrice) / hammerPrice;
  const band = getProximityBand(errorRatio);
  const isWin = errorRatio <= WIN_TOLERANCE_RATIO;
  const direction: GuessDirection =
    isWin || guess === hammerPrice
      ? "exact"
      : guess < hammerPrice
        ? "higher"
        : "lower";

  return {
    guess,
    direction,
    band,
    errorRatio,
    isWin,
  };
}

export function scoreDailyGame(
  won: boolean,
  guessesUsed: number,
  bestErrorRatio: number
): number {
  if (won) {
    const baseByAttempt = [1000, 880, 760, 640, 520, 400];
    return baseByAttempt[Math.max(0, Math.min(guessesUsed - 1, 5))] ?? 400;
  }
  if (bestErrorRatio >= 1) return 0;
  return Math.round(250 * Math.exp(-3.5 * bestErrorRatio));
}

export function scoreEndlessGuess(
  guess: number,
  hammerPrice: number
): { score: number; errorRatio: number; band: ProximityBand } {
  const errorRatio = Math.abs(guess - hammerPrice) / hammerPrice;
  const band = getProximityBand(errorRatio);
  if (errorRatio <= 0.01) {
    return { score: 1000, errorRatio, band };
  }
  if (errorRatio >= 1) {
    return { score: 0, errorRatio, band };
  }
  return {
    score: Math.round(1000 * Math.exp(-3.5 * errorRatio)),
    errorRatio,
    band,
  };
}
