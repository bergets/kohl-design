"use client";

import * as React from "react";
import { ArrowDown, ArrowLeft, ArrowUp, ArrowUpRight, Check, Copy, RotateCcw } from "lucide-react";
import { toast } from "sonner";
import { cooper } from "@/app/fonts";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
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
  getDailyLotIndices,
  getTodayKey,
  scoreDailyGame,
  scoreEndlessGuess,
  type DailyGuessEvaluation,
  type ProximityBand,
} from "./scoring";

type GameMode = "daily" | "endless";
type DailySlot = 0 | 1;

interface DailyDayRecord {
  date: string;
  lotGuesses: [number[], number[]];
  completed: boolean;
  totalScore: number;
  wonCount: number;
}

interface EndlessResult {
  lot: AuctionLot;
  guess: number;
  score: number;
  errorRatio: number;
  band: ProximityBand;
}

const DAILY_LOG_STORAGE_KEY = "kohl-auction-daily-log";
const LEGACY_DAILY_STORAGE_PREFIX = "kohl-auction-daily-";

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

function evaluateSlot(guesses: number[], lot: AuctionLot) {
  const evaluations: DailyGuessEvaluation[] = guesses.map((g) =>
    evaluateDailyGuess(g, lot.hammerPriceSek)
  );
  const won = evaluations.some((g) => g.isWin);
  const lost = !won && evaluations.length >= DAILY_MAX_GUESSES;
  const finished = won || lost;
  const bestError =
    evaluations.length > 0
      ? Math.min(...evaluations.map((g) => g.errorRatio))
      : 1;
  const score = finished ? scoreDailyGame(won, evaluations.length, bestError) : 0;
  return { evaluations, won, lost, finished, score };
}

function computeDailyStreak(log: Record<string, DailyDayRecord>, todayKey: string): number {
  const completedDates = Object.values(log)
    .filter((d) => d.completed)
    .map((d) => d.date)
    .sort()
    .reverse();

  if (completedDates.length === 0) return 0;

  // Check if streak starts today or yesterday
  const todayDate = new Date(`${todayKey}T12:00:00`);
  const yesterdayDate = new Date(todayDate);
  yesterdayDate.setDate(yesterdayDate.getDate() - 1);
  const yesterdayKey = yesterdayDate.toISOString().slice(0, 10);

  if (completedDates[0] !== todayKey && completedDates[0] !== yesterdayKey) {
    return 0;
  }

  let streak = 0;
  let expected = new Date(`${completedDates[0]}T12:00:00`);
  for (const dateStr of completedDates) {
    const expectedKey = expected.toISOString().slice(0, 10);
    if (dateStr === expectedKey) {
      streak += 1;
      expected.setDate(expected.getDate() - 1);
    } else if (dateStr < expectedKey) {
      break;
    }
  }
  return streak;
}

export function AuctionGuesser() {
  const [mode, setMode] = React.useState<GameMode | null>(null);
  const [todayKey, setTodayKey] = React.useState<string>("2026-11-21");
  const [dailySlot, setDailySlot] = React.useState<DailySlot>(0);
  const [dailyLog, setDailyLog] = React.useState<Record<string, DailyDayRecord>>({});
  const [dailySlotGuesses, setDailySlotGuesses] = React.useState<[number[], number[]]>([
    [],
    [],
  ]);

  const [lotIdx1, lotIdx2] = getDailyLotIndices(todayKey, AUCTION_LOTS.length);
  const dailyLots: [AuctionLot, AuctionLot] = [
    AUCTION_LOTS[lotIdx1],
    AUCTION_LOTS[lotIdx2],
  ];
  const currentDailyLot = dailyLots[dailySlot];
  const dailyRuler = getLotRulerConfig(currentDailyLot.hammerPriceSek);

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
    const [i1, i2] = getDailyLotIndices(key, AUCTION_LOTS.length);
    const lotsForToday: [AuctionLot, AuctionLot] = [AUCTION_LOTS[i1], AUCTION_LOTS[i2]];

    try {
      const rawLog = window.localStorage.getItem(DAILY_LOG_STORAGE_KEY);
      const parsedLog: Record<string, DailyDayRecord> = rawLog ? JSON.parse(rawLog) : {};

      // Migrate legacy single-lot key if present
      if (!parsedLog[key]) {
        const legacyRaw = window.localStorage.getItem(
          `${LEGACY_DAILY_STORAGE_PREFIX}${key}`
        );
        if (legacyRaw) {
          const legacyParsed = JSON.parse(legacyRaw) as { guesses?: number[] };
          if (Array.isArray(legacyParsed.guesses) && legacyParsed.guesses.length > 0) {
            const s1 = evaluateSlot(legacyParsed.guesses, lotsForToday[0]);
            parsedLog[key] = {
              date: key,
              lotGuesses: [legacyParsed.guesses, []],
              completed: false,
              totalScore: s1.score,
              wonCount: s1.won ? 1 : 0,
            };
          }
        }
      }

      setDailyLog(parsedLog);

      const todayRecord = parsedLog[key];
      if (todayRecord) {
        setDailySlotGuesses(todayRecord.lotGuesses);
        const slot0 = evaluateSlot(todayRecord.lotGuesses[0], lotsForToday[0]);
        const slot1 = evaluateSlot(todayRecord.lotGuesses[1], lotsForToday[1]);
        const initialSlot: DailySlot = slot0.finished && !slot1.finished ? 1 : 0;
        setDailySlot(initialSlot);
        const ruler = getLotRulerConfig(lotsForToday[initialSlot].hammerPriceSek);
        setDailyBid(ruler.defaultBid);
      } else {
        const ruler = getLotRulerConfig(lotsForToday[0].hammerPriceSek);
        setDailyBid(ruler.defaultBid);
      }
    } catch {
      // Ignore storage errors
    }
  }, []);

  const slot0State = evaluateSlot(dailySlotGuesses[0], dailyLots[0]);
  const slot1State = evaluateSlot(dailySlotGuesses[1], dailyLots[1]);
  const activeDailyState = dailySlot === 0 ? slot0State : slot1State;
  const bothDailyFinished = slot0State.finished && slot1State.finished;
  const dailyTotalScore = slot0State.score + slot1State.score;

  // Narrowing ruler bounds from Higher/Lower hints in active Daily slot
  const dailyMinBound = React.useMemo(() => {
    const higherGuesses = activeDailyState.evaluations
      .filter((g) => g.direction === "higher")
      .map((g) => g.guess);
    return higherGuesses.length > 0 ? Math.max(...higherGuesses) : null;
  }, [activeDailyState.evaluations]);

  const dailyMaxBound = React.useMemo(() => {
    const lowerGuesses = activeDailyState.evaluations
      .filter((g) => g.direction === "lower")
      .map((g) => g.guess);
    return lowerGuesses.length > 0 ? Math.min(...lowerGuesses) : null;
  }, [activeDailyState.evaluations]);

  // Keep dailyBid centered inside the narrowed bracket after each guess or slot switch
  React.useEffect(() => {
    const low =
      dailyMinBound !== null ? Math.max(dailyRuler.min, dailyMinBound) : dailyRuler.min;
    const high =
      dailyMaxBound !== null ? Math.min(dailyRuler.max, dailyMaxBound) : dailyRuler.max;
    setDailyBid((prev) => {
      if (prev >= low && prev <= high) return prev;
      return snapAuctionPrice(Math.sqrt(low * high), dailyRuler.min, dailyRuler.max);
    });
  }, [dailyMinBound, dailyMaxBound, dailyRuler.min, dailyRuler.max, dailySlot]);

  const endlessTotalScore = endlessHistory.reduce((sum, item) => sum + item.score, 0);
  const activeLot = mode === "daily" ? currentDailyLot : endlessLot;

  const recentDailyHistory = React.useMemo(() => {
    return Object.values(dailyLog)
      .filter((d) => d.lotGuesses[0].length > 0 || d.lotGuesses[1].length > 0)
      .sort((a, b) => b.date.localeCompare(a.date))
      .slice(0, 7);
  }, [dailyLog]);

  const dailyStreak = React.useMemo(
    () => computeDailyStreak(dailyLog, todayKey),
    [dailyLog, todayKey]
  );

  function persistDailyGuesses(nextPair: [number[], number[]]) {
    const s0 = evaluateSlot(nextPair[0], dailyLots[0]);
    const s1 = evaluateSlot(nextPair[1], dailyLots[1]);
    const record: DailyDayRecord = {
      date: todayKey,
      lotGuesses: nextPair,
      completed: s0.finished && s1.finished,
      totalScore: s0.score + s1.score,
      wonCount: (s0.won ? 1 : 0) + (s1.won ? 1 : 0),
    };
    const nextLog = { ...dailyLog, [todayKey]: record };
    setDailyLog(nextLog);
    try {
      window.localStorage.setItem(DAILY_LOG_STORAGE_KEY, JSON.stringify(nextLog));
    } catch {
      // Ignore storage errors
    }
  }

  function handleDailySubmit() {
    if (activeDailyState.finished) return;
    const nextPair: [number[], number[]] = [
      dailySlot === 0 ? [...dailySlotGuesses[0], dailyBid] : dailySlotGuesses[0],
      dailySlot === 1 ? [...dailySlotGuesses[1], dailyBid] : dailySlotGuesses[1],
    ];
    setDailySlotGuesses(nextPair);
    persistDailyGuesses(nextPair);
  }

  function handleSelectDailySlot(slot: DailySlot) {
    setDailySlot(slot);
    const ruler = getLotRulerConfig(dailyLots[slot].hammerPriceSek);
    setDailyBid(ruler.defaultBid);
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
    const formatMarkers = (evals: DailyGuessEvaluation[], won: boolean) => {
      const marks = evals
        .map((g) => (g.isWin ? "✓" : g.direction === "higher" ? "↑" : "↓"))
        .join("");
      return `${won ? evals.length : "X"}/${DAILY_MAX_GUESSES} ${marks}`;
    };

    const text = [
      `Auction price guesser · ${todayKey}`,
      `Lot 1: ${dailyLots[0].title} (${formatMarkers(slot0State.evaluations, slot0State.won)})`,
      `Lot 2: ${dailyLots[1].title} (${formatMarkers(slot1State.evaluations, slot1State.won)})`,
      `Score: ${dailyTotalScore} / 2 000 pts${dailyStreak > 1 ? ` · ${dailyStreak}-day streak` : ""}`,
    ].join("\n");

    try {
      await navigator.clipboard.writeText(text);
      toast.success("Daily result copied to clipboard.");
    } catch {
      toast.error("Could not copy result.");
    }
  }

  if (mode === null) {
    const todayRecord = dailyLog[todayKey];
    const dailyStatusLabel = bothDailyFinished
      ? `${dailyTotalScore} / 2 000 pts`
      : todayRecord
        ? "In progress"
        : "2 lots today";

    return (
      <div className="space-y-8 py-4 sm:py-6">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1.5">
            <h1
              className={`${cooper.className} text-3xl sm:text-4xl font-normal tracking-tight text-foreground`}
            >
              Auction price guesser
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground font-sans">
              Guess the hammer price of classic Scandinavian furniture, lamps, and decor.
            </p>
          </div>
          <ThemeToggle className="size-9 shrink-0" />
        </div>

        <div className="divide-y divide-border/60 border-y border-border/60">
          <button
            type="button"
            onClick={() => setMode("daily")}
            className="group w-full py-5 flex items-start justify-between gap-4 text-left transition-colors hover:bg-muted/30 px-2 -mx-2 rounded-[var(--radius)] cursor-pointer"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2.5 flex-wrap">
                <span className="text-base font-semibold text-foreground group-hover:text-primary transition-colors">
                  Daily challenge
                </span>
                <Badge variant={bothDailyFinished ? "success" : "default"} size="sm">
                  {dailyStatusLabel}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Two curated lots each day. Up to 6 guesses per lot with Higher/Lower hints.
              </p>
            </div>
            <Icon
              icon={ArrowUpRight}
              size="sm"
              intent="muted"
              className="mt-1 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground"
            />
          </button>

          <button
            type="button"
            onClick={() => setMode("endless")}
            className="group w-full py-5 flex items-start justify-between gap-4 text-left transition-colors hover:bg-muted/30 px-2 -mx-2 rounded-[var(--radius)] cursor-pointer"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2.5 flex-wrap">
                <span className="text-base font-semibold text-foreground group-hover:text-primary transition-colors">
                  Endless mode
                </span>
                <Badge variant="secondary" size="sm">
                  {AUCTION_LOTS.length} lots
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                One shot per lot across the full catalog, scored by how close you get.
              </p>
            </div>
            <Icon
              icon={ArrowUpRight}
              size="sm"
              intent="muted"
              className="mt-1 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground"
            />
          </button>
        </div>

        {recentDailyHistory.length > 0 && (
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium text-muted-foreground">
                Daily log
              </p>
              {dailyStreak > 0 && (
                <p className="text-xs text-muted-foreground tabular-nums">
                  {dailyStreak}-day streak
                </p>
              )}
            </div>
            <div className="divide-y divide-border/60 border-t border-border/60">
              {recentDailyHistory.map((day) => (
                <div
                  key={day.date}
                  className="py-2.5 flex items-center justify-between gap-3 text-xs"
                >
                  <span className="font-medium text-foreground tabular-nums">
                    {day.date === todayKey ? `${day.date} (Today)` : day.date}
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="text-muted-foreground">
                      {day.completed ? `${day.wonCount}/2 hammered` : "In progress"}
                    </span>
                    <span className="font-semibold text-foreground tabular-nums">
                      {day.totalScore} pts
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6 flex-1 flex flex-col">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="space-y-1.5">
          <button
            type="button"
            onClick={() => setMode(null)}
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            <Icon icon={ArrowLeft} size="xs" />
            <span>Change mode</span>
          </button>
          <h1
            className={`${cooper.className} text-3xl sm:text-4xl font-normal tracking-tight text-foreground`}
          >
            Auction price guesser
          </h1>
          <p className="text-sm text-muted-foreground font-sans">
            {mode === "daily" ? (
              bothDailyFinished ? (
                <>
                  Today finished with{" "}
                  <span className="font-semibold text-foreground">
                    {dailyTotalScore} / 2 000 points
                  </span>
                  {dailyStreak > 0 && (
                    <>
                      {" "}
                      · <span className="text-muted-foreground">{dailyStreak}-day streak</span>
                    </>
                  )}
                </>
              ) : (
                <>
                  Lot {dailySlot + 1} of 2 · Guess within{" "}
                  <span className="font-semibold text-foreground">5%</span> ·{" "}
                  <span className="text-muted-foreground">
                    Attempt {Math.min(activeDailyState.evaluations.length + 1, DAILY_MAX_GUESSES)} of{" "}
                    {DAILY_MAX_GUESSES}
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

        <div className="flex items-center gap-2.5 shrink-0 flex-wrap">
          {mode === "daily" && (
            <div className="inline-flex items-center rounded-[var(--radius)] border border-border bg-muted/50 p-0.5">
              {([0, 1] as DailySlot[]).map((slot) => {
                const state = slot === 0 ? slot0State : slot1State;
                const active = dailySlot === slot;
                return (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => handleSelectDailySlot(slot)}
                    className={`px-2.5 h-8 rounded-[calc(var(--radius)-2px)] text-xs font-medium transition-colors cursor-pointer ${
                      active
                        ? "bg-background text-foreground shadow-2xs"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    Lot {slot + 1}
                    {state.finished ? (state.won ? " ✓" : " ·") : ""}
                  </button>
                );
              })}
            </div>
          )}

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

        {/* History Rows for Active Mode */}
        {mode === "daily" && activeDailyState.evaluations.length > 0 && (
          <div className="divide-y divide-border/60">
            {activeDailyState.evaluations.map((item, idx) => (
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

        {/* Daily Log (Day-by-Day Tracker) */}
        {mode === "daily" && recentDailyHistory.length > 0 && (
          <div className="py-5 space-y-2.5">
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium text-muted-foreground">
                Daily log
              </p>
              {dailyStreak > 0 && (
                <p className="text-xs text-muted-foreground tabular-nums">
                  {dailyStreak}-day streak
                </p>
              )}
            </div>
            <div className="divide-y divide-border/60">
              {recentDailyHistory.map((day) => (
                <div
                  key={day.date}
                  className="py-2.5 flex items-center justify-between gap-3 text-xs"
                >
                  <span className="font-medium text-foreground tabular-nums">
                    {day.date === todayKey ? `${day.date} (Today)` : day.date}
                  </span>
                  <div className="flex items-center gap-3 text-muted-nums">
                    <span className="text-muted-foreground">
                      {day.completed ? `${day.wonCount}/2 hammered` : "In progress"}
                    </span>
                    <span className="font-semibold text-foreground tabular-nums">
                      {day.totalScore} pts
                    </span>
                  </div>
                </div>
              ))}
            </div>
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

      {/* Sticky Bottom Control Bar: Price, Tuning Wheel & Submit Always in View */}
      <div className="sticky bottom-0 z-30 mt-auto -mx-6 sm:-mx-8 md:-mx-12 lg:-mx-14 px-6 sm:px-8 md:px-12 lg:px-14 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] bg-background/85 backdrop-blur-md border-t border-border/60">
        <div className="mx-auto w-full max-w-3xl">
          {mode === "daily" ? (
            !activeDailyState.finished ? (
              <div className="space-y-2.5">
                {activeDailyState.evaluations.length > 0 &&
                  (() => {
                    const latest =
                      activeDailyState.evaluations[
                        activeDailyState.evaluations.length - 1
                      ];
                    return (
                      <div className="flex items-center justify-between gap-2 pb-2 border-b border-border/60 text-xs">
                        <span className="text-muted-foreground tabular-nums">
                          Last:{" "}
                          <span className="font-medium text-foreground">
                            {formatSek(latest.guess)}
                          </span>
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
                  previousGuesses={activeDailyState.evaluations.map((g) => g.guess)}
                />
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <p className="text-sm text-foreground">
                    {activeDailyState.won ? (
                      <>
                        Lot {dailySlot + 1} hammered in{" "}
                        <span className="font-semibold">
                          {activeDailyState.evaluations.length}{" "}
                          {activeDailyState.evaluations.length === 1
                            ? "guess"
                            : "guesses"}
                        </span>{" "}
                        for{" "}
                        <span className="font-semibold">
                          {activeDailyState.score} points
                        </span>
                        .
                      </>
                    ) : (
                      <>
                        Lot {dailySlot + 1}: Hammer price was{" "}
                        <span className="font-semibold">
                          {formatSek(currentDailyLot.hammerPriceSek)}
                        </span>{" "}
                        ({activeDailyState.score} points).
                      </>
                    )}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Hammer price: {formatSek(currentDailyLot.hammerPriceSek)} · Daily
                    total: {dailyTotalScore} / 2 000 pts
                  </p>
                </div>

                <div className="flex items-center gap-2.5 shrink-0">
                  {!bothDailyFinished ? (
                    <Button
                      type="button"
                      variant="default"
                      size="lg"
                      onClick={() =>
                        handleSelectDailySlot(dailySlot === 0 ? 1 : 0)
                      }
                      className="min-h-[44px]"
                    >
                      {dailySlot === 0 ? "Next daily lot (2/2)" : "Play lot 1/2"}
                    </Button>
                  ) : (
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
                  )}
                </div>
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
