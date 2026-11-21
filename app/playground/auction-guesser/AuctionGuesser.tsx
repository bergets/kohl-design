"use client";

import * as React from "react";
import { ArrowDown, ArrowUp, Check, Copy, RotateCcw } from "lucide-react";
import { toast } from "sonner";
import { cooper } from "@/app/fonts";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ThemeToggle } from "@/components/theme-toggle";
import { AUCTION_LOTS, type AuctionLot } from "./lots";
import {
  getLotRulerConfig,
  PriceRulerInput,
  snapAuctionPrice,
} from "./PriceRulerInput";
import {
  bandLabel,
  DAILY_MAX_GUESSES,
  evaluateDailyGuess,
  formatSek,
  getDailyLotIndex,
  getTodayKey,
  scoreDailyGame,
  scoreEndlessGuess,
  type DailyGuessEvaluation,
  type ProximityBand,
} from "./scoring";

type GameMode = "daily" | "endless";

interface EndlessResult {
  lot: AuctionLot;
  guess: number;
  score: number;
  errorRatio: number;
  band: ProximityBand;
}

const DAILY_STORAGE_PREFIX = "kohl-auction-daily-";

function badgeVariantForBand(
  band: ProximityBand
): "success" | "default" | "warning" | "secondary" {
  switch (band) {
    case "hammered":
      return "success";
    case "very-close":
      return "default";
    case "warm":
      return "warning";
    case "cold":
      return "secondary";
  }
}

export function AuctionGuesser() {
  const [mode, setMode] = React.useState<GameMode>("daily");
  const [todayKey, setTodayKey] = React.useState<string>("2026-11-20");

  const dailyLot = AUCTION_LOTS[getDailyLotIndex(todayKey, AUCTION_LOTS.length)];
  const dailyRuler = getLotRulerConfig(dailyLot.hammerPriceSek);

  // Daily state
  const [dailyGuesses, setDailyGuesses] = React.useState<DailyGuessEvaluation[]>([]);
  const [dailyBid, setDailyBid] = React.useState<number>(dailyRuler.defaultBid);

  // Endless state
  const [endlessIndex, setEndlessIndex] = React.useState<number>(0);
  const endlessLot = AUCTION_LOTS[endlessIndex % AUCTION_LOTS.length];
  const endlessRuler = getLotRulerConfig(endlessLot.hammerPriceSek);

  const [endlessBid, setEndlessBid] = React.useState<number>(endlessRuler.defaultBid);
  const [endlessHistory, setEndlessHistory] = React.useState<EndlessResult[]>([]);
  const [currentEndlessResult, setCurrentEndlessResult] =
    React.useState<EndlessResult | null>(null);

  React.useEffect(() => {
    const root = document.documentElement;
    const prevVariant = root.getAttribute("data-theme-variant");
    root.setAttribute("data-theme-variant", "neutral");

    return () => {
      if (prevVariant) {
        root.setAttribute("data-theme-variant", prevVariant);
      } else {
        root.removeAttribute("data-theme-variant");
      }
    };
  }, []);

  React.useEffect(() => {
    const key = getTodayKey();
    setTodayKey(key);
    const lot = AUCTION_LOTS[getDailyLotIndex(key, AUCTION_LOTS.length)];
    const ruler = getLotRulerConfig(lot.hammerPriceSek);
    setDailyBid(ruler.defaultBid);
    try {
      const saved = window.localStorage.getItem(`${DAILY_STORAGE_PREFIX}${key}`);
      if (saved) {
        const parsed = JSON.parse(saved) as { guesses?: number[] };
        if (Array.isArray(parsed.guesses)) {
          setDailyGuesses(
            parsed.guesses.map((g) => evaluateDailyGuess(g, lot.hammerPriceSek))
          );
        }
      }
    } catch {
      // Ignore storage errors
    }
  }, []);

  const dailyWon = dailyGuesses.some((g) => g.isWin);
  const dailyLost = !dailyWon && dailyGuesses.length >= DAILY_MAX_GUESSES;
  const dailyFinished = dailyWon || dailyLost;
  const bestDailyError =
    dailyGuesses.length > 0
      ? Math.min(...dailyGuesses.map((g) => g.errorRatio))
      : 1;
  const dailyScore = dailyFinished
    ? scoreDailyGame(dailyWon, dailyGuesses.length, bestDailyError)
    : 0;

  // Narrowing ruler bounds from Higher/Lower hints in Daily mode
  const dailyMinBound = React.useMemo(() => {
    const higherGuesses = dailyGuesses
      .filter((g) => g.direction === "higher")
      .map((g) => g.guess);
    return higherGuesses.length > 0 ? Math.max(...higherGuesses) : null;
  }, [dailyGuesses]);

  const dailyMaxBound = React.useMemo(() => {
    const lowerGuesses = dailyGuesses
      .filter((g) => g.direction === "lower")
      .map((g) => g.guess);
    return lowerGuesses.length > 0 ? Math.min(...lowerGuesses) : null;
  }, [dailyGuesses]);

  // Keep dailyBid centered inside the narrowed bracket after each guess
  React.useEffect(() => {
    const low =
      dailyMinBound !== null ? Math.max(dailyRuler.min, dailyMinBound) : dailyRuler.min;
    const high =
      dailyMaxBound !== null ? Math.min(dailyRuler.max, dailyMaxBound) : dailyRuler.max;
    setDailyBid((prev) => {
      if (prev >= low && prev <= high) return prev;
      return snapAuctionPrice(Math.sqrt(low * high), dailyRuler.min, dailyRuler.max);
    });
  }, [dailyMinBound, dailyMaxBound, dailyRuler.min, dailyRuler.max]);

  const endlessTotalScore = endlessHistory.reduce((sum, item) => sum + item.score, 0);

  const activeLot = mode === "daily" ? dailyLot : endlessLot;

  function handleDailySubmit() {
    if (dailyFinished) return;
    const evaluation = evaluateDailyGuess(dailyBid, dailyLot.hammerPriceSek);
    const nextGuesses = [...dailyGuesses, evaluation];
    setDailyGuesses(nextGuesses);

    try {
      window.localStorage.setItem(
        `${DAILY_STORAGE_PREFIX}${todayKey}`,
        JSON.stringify({ guesses: nextGuesses.map((g) => g.guess) })
      );
    } catch {
      // Ignore storage errors
    }
  }

  function handleEndlessSubmit() {
    if (currentEndlessResult) return;
    const scored = scoreEndlessGuess(endlessBid, endlessLot.hammerPriceSek);
    const result: EndlessResult = {
      lot: endlessLot,
      guess: endlessBid,
      score: scored.score,
      errorRatio: scored.errorRatio,
      band: scored.band,
    };
    setCurrentEndlessResult(result);
    setEndlessHistory((prev) => [...prev, result]);
  }

  function handleNextEndlessLot() {
    const nextIndex = (endlessIndex + 1) % AUCTION_LOTS.length;
    const nextRuler = getLotRulerConfig(AUCTION_LOTS[nextIndex].hammerPriceSek);
    setCurrentEndlessResult(null);
    setEndlessIndex(nextIndex);
    setEndlessBid(nextRuler.defaultBid);
  }

  function handleResetEndless() {
    const firstRuler = getLotRulerConfig(AUCTION_LOTS[0].hammerPriceSek);
    setCurrentEndlessResult(null);
    setEndlessHistory([]);
    setEndlessIndex(0);
    setEndlessBid(firstRuler.defaultBid);
  }

  async function handleCopyDailyResult() {
    const markers = dailyGuesses
      .map((g) => {
        if (g.isWin) return "✓";
        return g.direction === "higher" ? "↑" : "↓";
      })
      .join(" ");
    const text = `Auction price guesser · ${todayKey}\n${dailyLot.title}\n${
      dailyWon ? `${dailyGuesses.length}/${DAILY_MAX_GUESSES}` : `X/${DAILY_MAX_GUESSES}`
    } · ${dailyScore} pts (${markers})`;

    try {
      await navigator.clipboard.writeText(text);
      toast.success("Result copied to clipboard.");
    } catch {
      toast.error("Could not copy result.");
    }
  }

  return (
    <div className="space-y-6 flex-1 flex flex-col">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="space-y-1.5">
          <h1
            className={`${cooper.className} text-3xl sm:text-4xl font-normal tracking-tight text-foreground`}
          >
            Auction price guesser
          </h1>
          <p className="text-sm text-muted-foreground font-sans">
            {mode === "daily" ? (
              dailyFinished ? (
                <>
                  Daily lot finished with{" "}
                  <span className="font-semibold text-foreground">{dailyScore} points</span>{" "}
                  ·{" "}
                  <span className="text-muted-foreground">
                    Hammer price {formatSek(dailyLot.hammerPriceSek)}
                  </span>
                </>
              ) : (
                <>
                  Guess within <span className="font-semibold text-foreground">5%</span> of
                  the hammer price ·{" "}
                  <span className="text-muted-foreground">
                    Attempt {dailyGuesses.length + 1} of {DAILY_MAX_GUESSES}
                  </span>
                </>
              )
            ) : (
              <>
                One guess per lot ·{" "}
                <span className="font-semibold text-foreground">
                  {endlessTotalScore} points
                </span>{" "}
                <span className="text-muted-foreground">
                  across {endlessHistory.length}{" "}
                  {endlessHistory.length === 1 ? "lot" : "lots"}
                </span>
              </>
            )}
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <Tabs
            value={mode}
            onValueChange={(value) => setMode(value as GameMode)}
          >
            <TabsList size="default">
              <TabsTrigger value="daily">Daily challenge</TabsTrigger>
              <TabsTrigger value="endless">Endless mode</TabsTrigger>
            </TabsList>
          </Tabs>
          <ThemeToggle className="size-9" />
        </div>
      </div>

      <div className="divide-y divide-border/60">
        {activeLot.imageSrc && (
          <div className="pb-6">
            <div className="relative aspect-[4/3] w-full rounded-[var(--radius)] bg-muted/40 overflow-hidden">
              <img
                src={activeLot.imageSrc}
                alt={activeLot.title}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        )}

        {/* Lot Header */}
        <div className="py-6 space-y-3 first:pt-0">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div className="flex items-center gap-2">
              <Badge variant="default" size="default">
                {activeLot.category}
              </Badge>
              <Badge variant="secondary" size="default">
                {activeLot.era}
              </Badge>
            </div>
            <span className="text-xs text-muted-foreground">
              {activeLot.auctionHouse}
            </span>
          </div>

          <div className="space-y-1">
            <h2
              className={`${cooper.className} text-2xl sm:text-3xl font-normal text-foreground`}
            >
              {activeLot.title}
            </h2>
            <p className="text-sm font-medium text-foreground/85">
              {activeLot.designer}
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {activeLot.materials}
            </p>
          </div>
        </div>

        {/* History Rows */}
        {mode === "daily" && dailyGuesses.length > 0 && (
          <div className="divide-y divide-border/60">
            {dailyGuesses.map((item, idx) => (
              <div
                key={`${item.guess}-${idx}`}
                className="py-3.5 flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground w-5 tabular-nums">
                    #{idx + 1}
                  </span>
                  <span className="text-sm font-medium text-foreground tabular-nums">
                    {formatSek(item.guess)}
                  </span>
                </div>

                <div className="flex items-center gap-2.5">
                  <Badge variant={badgeVariantForBand(item.band)} size="sm">
                    {bandLabel(item.band)}
                  </Badge>
                  {item.isWin ? (
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-foreground">
                      <Icon icon={Check} size="xs" intent="primary" />
                      Hammered
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                      <Icon
                        icon={item.direction === "higher" ? ArrowUp : ArrowDown}
                        size="xs"
                        intent="muted"
                      />
                      {item.direction === "higher" ? "Higher" : "Lower"}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {mode === "endless" && endlessHistory.length > 0 && (
          <div className="divide-y divide-border/60">
            {endlessHistory
              .slice()
              .reverse()
              .slice(0, 5)
              .map((item, idx) => (
                <div
                  key={`${item.lot.id}-${idx}`}
                  className="py-3.5 flex items-center justify-between gap-3"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {item.lot.title}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Guess {formatSek(item.guess)} · Hammer{" "}
                      {formatSek(item.lot.hammerPriceSek)}
                    </p>
                  </div>
                  <div className="flex items-center gap-2.5 shrink-0">
                    <Badge variant={badgeVariantForBand(item.band)} size="sm">
                      {bandLabel(item.band)}
                    </Badge>
                    <span className="text-sm font-semibold text-foreground tabular-nums">
                      {item.score} pts
                    </span>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>

      {/* Sticky Bottom Control Bar: Price, Thumbwheel & Submit Always in View */}
      <div className="sticky bottom-0 z-30 mt-auto -mx-6 sm:-mx-8 md:-mx-12 lg:-mx-14 px-6 sm:px-8 md:px-12 lg:px-14 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] bg-background/85 backdrop-blur-md border-t border-border/60">
        <div className="mx-auto w-full max-w-3xl">
          {mode === "daily" ? (
            !dailyFinished ? (
              <div className="space-y-2.5">
                {dailyGuesses.length > 0 && (() => {
                  const latest = dailyGuesses[dailyGuesses.length - 1];
                  return (
                    <div className="flex items-center justify-between gap-2 pb-2 border-b border-border/60 text-xs">
                      <span className="text-muted-foreground tabular-nums">
                        Last: <span className="font-medium text-foreground">{formatSek(latest.guess)}</span>
                      </span>
                      <div className="flex items-center gap-2">
                        <Badge variant={badgeVariantForBand(latest.band)} size="sm">
                          {bandLabel(latest.band)}
                        </Badge>
                        <span className="inline-flex items-center gap-1 font-medium text-foreground">
                          <Icon
                            icon={latest.direction === "higher" ? ArrowUp : ArrowDown}
                            size="xs"
                          />
                          {latest.direction === "higher" ? "Higher" : "Lower"}
                        </span>
                      </div>
                    </div>
                  );
                })()}
                <PriceRulerInput
                  value={dailyBid}
                  onChange={setDailyBid}
                  onSubmit={handleDailySubmit}
                  submitLabel="Place bid"
                  minPrice={dailyRuler.min}
                  maxPrice={dailyRuler.max}
                  ticks={dailyRuler.ticks}
                  minBound={dailyMinBound}
                  maxBound={dailyMaxBound}
                  previousGuesses={dailyGuesses.map((g) => g.guess)}
                />
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-foreground">
                    {dailyWon ? (
                      <>
                        Hammered in{" "}
                        <span className="font-semibold">
                          {dailyGuesses.length}{" "}
                          {dailyGuesses.length === 1 ? "guess" : "guesses"}
                        </span>{" "}
                        for{" "}
                        <span className="font-semibold">{dailyScore} points</span>.
                      </>
                    ) : (
                      <>
                        Out of guesses. Actual hammer price was{" "}
                        <span className="font-semibold">
                          {formatSek(dailyLot.hammerPriceSek)}
                        </span>{" "}
                        ({dailyScore} points).
                      </>
                    )}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Final hammer price: {formatSek(dailyLot.hammerPriceSek)}
                  </p>
                </div>
                <Button
                  type="button"
                  variant="secondary"
                  size="lg"
                  onClick={handleCopyDailyResult}
                  className="min-h-[44px]"
                >
                  <Icon icon={Copy} size="sm" />
                  Copy result
                </Button>
              </div>
            )
          ) : !currentEndlessResult ? (
            <PriceRulerInput
              value={endlessBid}
              onChange={setEndlessBid}
              onSubmit={handleEndlessSubmit}
              submitLabel="Submit guess"
              minPrice={endlessRuler.min}
              maxPrice={endlessRuler.max}
              ticks={endlessRuler.ticks}
            />
          ) : (
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge
                    variant={badgeVariantForBand(currentEndlessResult.band)}
                    size="default"
                  >
                    {bandLabel(currentEndlessResult.band)}
                  </Badge>
                  <span className="text-sm text-foreground">
                    Earned{" "}
                    <span className="font-semibold">
                      {currentEndlessResult.score} points
                    </span>{" "}
                    ({Math.round(currentEndlessResult.errorRatio * 100)}% off)
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  You guessed {formatSek(currentEndlessResult.guess)} · Hammer price{" "}
                  {formatSek(currentEndlessResult.lot.hammerPriceSek)}
                </p>
              </div>
              <div className="flex items-center gap-2.5">
                <Button
                  type="button"
                  variant="default"
                  size="lg"
                  onClick={handleNextEndlessLot}
                  className="min-h-[44px]"
                >
                  Next lot
                </Button>
                {endlessHistory.length > 0 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="lg"
                    onClick={handleResetEndless}
                    className="min-h-[44px]"
                  >
                    <Icon icon={RotateCcw} size="sm" />
                    Reset
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
