"use client";

import * as React from "react";
import { ArrowDown, ArrowUp, Check, Copy, RotateCcw } from "lucide-react";
import { toast } from "sonner";
import { cooper } from "@/app/fonts";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AUCTION_LOTS, type AuctionLot } from "./lots";
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

function parseGuessInput(raw: string): number | null {
  const digits = raw.replace(/[^\d]/g, "");
  if (!digits) return null;
  const value = Number.parseInt(digits, 10);
  if (!Number.isFinite(value) || value <= 0) return null;
  return value;
}

export function AuctionGuesser() {
  const [mode, setMode] = React.useState<GameMode>("daily");
  const [todayKey, setTodayKey] = React.useState<string>("2026-11-20");

  // Daily state
  const [dailyGuesses, setDailyGuesses] = React.useState<DailyGuessEvaluation[]>([]);
  const [dailyInput, setDailyInput] = React.useState<string>("");

  // Endless state
  const [endlessIndex, setEndlessIndex] = React.useState<number>(0);
  const [endlessInput, setEndlessInput] = React.useState<string>("");
  const [endlessHistory, setEndlessHistory] = React.useState<EndlessResult[]>([]);
  const [currentEndlessResult, setCurrentEndlessResult] =
    React.useState<EndlessResult | null>(null);

  React.useEffect(() => {
    const key = getTodayKey();
    setTodayKey(key);
    try {
      const saved = window.localStorage.getItem(`${DAILY_STORAGE_PREFIX}${key}`);
      if (saved) {
        const parsed = JSON.parse(saved) as { guesses?: number[] };
        if (Array.isArray(parsed.guesses)) {
          const lot = AUCTION_LOTS[getDailyLotIndex(key, AUCTION_LOTS.length)];
          setDailyGuesses(
            parsed.guesses.map((g) => evaluateDailyGuess(g, lot.hammerPriceSek))
          );
        }
      }
    } catch {
      // Ignore storage errors
    }
  }, []);

  const dailyLot = AUCTION_LOTS[getDailyLotIndex(todayKey, AUCTION_LOTS.length)];
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

  const endlessLot = AUCTION_LOTS[endlessIndex % AUCTION_LOTS.length];
  const endlessTotalScore = endlessHistory.reduce((sum, item) => sum + item.score, 0);

  const activeLot = mode === "daily" ? dailyLot : endlessLot;

  function handleDailySubmit(e: React.FormEvent) {
    e.preventDefault();
    if (dailyFinished) return;
    const guess = parseGuessInput(dailyInput);
    if (!guess) {
      toast.error("Enter a price in SEK to place a bid.");
      return;
    }

    const evaluation = evaluateDailyGuess(guess, dailyLot.hammerPriceSek);
    const nextGuesses = [...dailyGuesses, evaluation];
    setDailyGuesses(nextGuesses);
    setDailyInput("");

    try {
      window.localStorage.setItem(
        `${DAILY_STORAGE_PREFIX}${todayKey}`,
        JSON.stringify({ guesses: nextGuesses.map((g) => g.guess) })
      );
    } catch {
      // Ignore storage errors
    }
  }

  function handleEndlessSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (currentEndlessResult) return;
    const guess = parseGuessInput(endlessInput);
    if (!guess) {
      toast.error("Enter a price in SEK to place a bid.");
      return;
    }

    const scored = scoreEndlessGuess(guess, endlessLot.hammerPriceSek);
    const result: EndlessResult = {
      lot: endlessLot,
      guess,
      score: scored.score,
      errorRatio: scored.errorRatio,
      band: scored.band,
    };
    setCurrentEndlessResult(result);
    setEndlessHistory((prev) => [...prev, result]);
    setEndlessInput("");
  }

  function handleNextEndlessLot() {
    setCurrentEndlessResult(null);
    setEndlessIndex((prev) => (prev + 1) % AUCTION_LOTS.length);
  }

  function handleResetEndless() {
    setCurrentEndlessResult(null);
    setEndlessHistory([]);
    setEndlessIndex(0);
    setEndlessInput("");
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
    <div className="space-y-6">
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

        <Tabs
          value={mode}
          onValueChange={(value) => setMode(value as GameMode)}
          className="shrink-0"
        >
          <TabsList size="default">
            <TabsTrigger value="daily">Daily challenge</TabsTrigger>
            <TabsTrigger value="endless">Endless mode</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <Card variant="default" className="p-0 overflow-hidden gap-0">
        <div className="divide-y divide-border/60">
          {/* Lot Header */}
          <div className="p-5 sm:p-6 space-y-3">
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

          {/* Guess Input / Active Controls */}
          {mode === "daily" ? (
            <div className="p-5 sm:p-6 space-y-4">
              {!dailyFinished ? (
                <form
                  onSubmit={handleDailySubmit}
                  className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5"
                >
                  <div className="flex-1">
                    <Input
                      type="text"
                      inputMode="numeric"
                      size="lg"
                      value={dailyInput}
                      onChange={(e) => setDailyInput(e.target.value)}
                      placeholder="Enter your guess (e.g. 24000)"
                      endAdornment="SEK"
                      aria-label="Guess hammer price in SEK"
                      className="min-h-[44px] text-base sm:text-sm"
                    />
                  </div>
                  <Button type="submit" variant="default" size="lg" className="min-h-[44px]">
                    Place bid
                  </Button>
                </form>
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
              )}
            </div>
          ) : (
            <div className="p-5 sm:p-6 space-y-4">
              {!currentEndlessResult ? (
                <form
                  onSubmit={handleEndlessSubmit}
                  className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5"
                >
                  <div className="flex-1">
                    <Input
                      type="text"
                      inputMode="numeric"
                      size="lg"
                      value={endlessInput}
                      onChange={(e) => setEndlessInput(e.target.value)}
                      placeholder="One-shot price guess (e.g. 24000)"
                      endAdornment="SEK"
                      aria-label="Guess hammer price in SEK"
                      className="min-h-[44px] text-base sm:text-sm"
                    />
                  </div>
                  <Button type="submit" variant="default" size="lg" className="min-h-[44px]">
                    Submit guess
                  </Button>
                </form>
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
          )}

          {/* History Rows */}
          {mode === "daily" && dailyGuesses.length > 0 && (
            <div className="divide-y divide-border/60">
              {dailyGuesses.map((item, idx) => (
                <div
                  key={`${item.guess}-${idx}`}
                  className="px-5 sm:px-6 py-3.5 flex items-center justify-between gap-3"
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
                    className="px-5 sm:px-6 py-3.5 flex items-center justify-between gap-3"
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
      </Card>
    </div>
  );
}
