"use client";

import * as React from "react";
import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/utils";
import { formatSek } from "./scoring";

export interface RulerTick {
  value: number;
  label: string;
}

export interface LotRulerConfig {
  min: number;
  max: number;
  defaultBid: number;
  ticks: RulerTick[];
}

export function getLotRulerConfig(hammerPriceSek: number): LotRulerConfig {
  if (hammerPriceSek < 15000) {
    return {
      min: 1000,
      max: 50000,
      defaultBid: 7500,
      ticks: [
        { value: 1000, label: "1k" },
        { value: 2500, label: "2.5k" },
        { value: 5000, label: "5k" },
        { value: 10000, label: "10k" },
        { value: 25000, label: "25k" },
        { value: 50000, label: "50k" },
      ],
    };
  }

  if (hammerPriceSek <= 80000) {
    return {
      min: 5000,
      max: 200000,
      defaultBid: 32000,
      ticks: [
        { value: 5000, label: "5k" },
        { value: 10000, label: "10k" },
        { value: 25000, label: "25k" },
        { value: 50000, label: "50k" },
        { value: 100000, label: "100k" },
        { value: 200000, label: "200k" },
      ],
    };
  }

  return {
    min: 25000,
    max: 600000,
    defaultBid: 125000,
    ticks: [
      { value: 25000, label: "25k" },
      { value: 50000, label: "50k" },
      { value: 100000, label: "100k" },
      { value: 200000, label: "200k" },
      { value: 400000, label: "400k" },
      { value: 600000, label: "600k" },
    ],
  };
}

export function priceToPercent(price: number, min: number, max: number): number {
  const logMin = Math.log(min);
  const logMax = Math.log(max);
  const clamped = Math.max(min, Math.min(max, price));
  return ((Math.log(clamped) - logMin) / (logMax - logMin)) * 100;
}

export function percentToPrice(percent: number, min: number, max: number): number {
  const logMin = Math.log(min);
  const logMax = Math.log(max);
  const clamped = Math.max(0, Math.min(100, percent));
  return Math.exp(logMin + (clamped / 100) * (logMax - logMin));
}

export function snapAuctionPrice(raw: number, min: number, max: number): number {
  const clamped = Math.max(min, Math.min(max, raw));
  let step = 100;
  if (clamped >= 150000) step = 2500;
  else if (clamped >= 50000) step = 1000;
  else if (clamped >= 20000) step = 500;
  else if (clamped >= 5000) step = 250;
  return Math.max(min, Math.min(max, Math.round(clamped / step) * step));
}

function stepAuctionPrice(
  current: number,
  direction: -1 | 1,
  min: number,
  max: number
): number {
  let step = 100;
  if (direction === 1) {
    if (current >= 150000) step = 2500;
    else if (current >= 50000) step = 1000;
    else if (current >= 20000) step = 500;
    else if (current >= 5000) step = 250;
  } else {
    if (current > 150000) step = 2500;
    else if (current > 50000) step = 1000;
    else if (current > 20000) step = 500;
    else if (current > 5000) step = 250;
  }
  return snapAuctionPrice(current + direction * step, min, max);
}

const MINOR_TICK_POSITIONS = Array.from({ length: 21 }, (_, i) => i * 5);
const TRACK_INSET_PX = 22;

export interface PriceRulerInputProps {
  value: number;
  onChange: (value: number) => void;
  onSubmit: () => void;
  submitLabel: string;
  minPrice: number;
  maxPrice: number;
  ticks: RulerTick[];
  minBound?: number | null;
  maxBound?: number | null;
  previousGuesses?: number[];
}

export function PriceRulerInput({
  value,
  onChange,
  onSubmit,
  submitLabel,
  minPrice,
  maxPrice,
  ticks,
  minBound = null,
  maxBound = null,
  previousGuesses = [],
}: PriceRulerInputProps) {
  const trackRef = React.useRef<HTMLDivElement>(null);
  const lastValueRef = React.useRef<number>(value);
  const [isDragging, setIsDragging] = React.useState(false);

  const effectiveMin = minBound !== null ? Math.max(minPrice, minBound) : minPrice;
  const effectiveMax = maxBound !== null ? Math.min(maxPrice, maxBound) : maxPrice;

  const clampToBounds = React.useCallback(
    (price: number) => {
      const snapped = snapAuctionPrice(price, minPrice, maxPrice);
      return Math.max(effectiveMin, Math.min(effectiveMax, snapped));
    },
    [effectiveMin, effectiveMax, minPrice, maxPrice]
  );

  const commitValue = React.useCallback(
    (nextValue: number) => {
      if (nextValue !== lastValueRef.current) {
        lastValueRef.current = nextValue;
        if (typeof navigator !== "undefined" && "vibrate" in navigator) {
          navigator.vibrate(4);
        }
      }
      onChange(nextValue);
    },
    [onChange]
  );

  React.useEffect(() => {
    lastValueRef.current = value;
  }, [value]);

  const updateFromClientX = React.useCallback(
    (clientX: number) => {
      const el = trackRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const usableWidth = Math.max(1, rect.width - TRACK_INSET_PX * 2);
      const pct = ((clientX - rect.left - TRACK_INSET_PX) / usableWidth) * 100;
      const rawPrice = percentToPrice(pct, minPrice, maxPrice);
      commitValue(clampToBounds(rawPrice));
    },
    [clampToBounds, commitValue, minPrice, maxPrice]
  );

  function handlePointerDown(e: React.PointerEvent<HTMLDivElement>) {
    e.currentTarget.setPointerCapture(e.pointerId);
    setIsDragging(true);
    updateFromClientX(e.clientX);
  }

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (!isDragging) return;
    updateFromClientX(e.clientX);
  }

  function handlePointerUp(e: React.PointerEvent<HTMLDivElement>) {
    if (!isDragging) return;
    e.currentTarget.releasePointerCapture(e.pointerId);
    setIsDragging(false);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key === "ArrowRight" || e.key === "ArrowUp") {
      e.preventDefault();
      commitValue(clampToBounds(stepAuctionPrice(value, 1, minPrice, maxPrice)));
    } else if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
      e.preventDefault();
      commitValue(clampToBounds(stepAuctionPrice(value, -1, minPrice, maxPrice)));
    } else if (e.key === "Enter") {
      e.preventDefault();
      onSubmit();
    }
  }

  const thumbPercent = priceToPercent(value, minPrice, maxPrice);
  const minBoundPercent =
    minBound !== null ? priceToPercent(minBound, minPrice, maxPrice) : 0;
  const maxBoundPercent =
    maxBound !== null ? priceToPercent(maxBound, minPrice, maxPrice) : 100;

  const insetPos = (pct: number) =>
    `calc(${TRACK_INSET_PX}px + (100% - ${TRACK_INSET_PX * 2}px) * ${pct / 100})`;

  return (
    <div className="space-y-2.5">
      {/* Row 1: [-]  Centered Bid Readout  [+] */}
      <div className="flex items-center justify-between gap-3">
        <Button
          type="button"
          variant="outline"
          size="icon-lg"
          aria-label="Decrease bid"
          disabled={value <= effectiveMin}
          onClick={() =>
            commitValue(clampToBounds(stepAuctionPrice(value, -1, minPrice, maxPrice)))
          }
          className="size-11 shrink-0"
        >
          <Icon icon={Minus} size="sm" />
        </Button>

        <p className="text-xl sm:text-2xl font-semibold text-foreground tabular-nums tracking-tight text-center">
          {formatSek(value)}
        </p>

        <Button
          type="button"
          variant="outline"
          size="icon-lg"
          aria-label="Increase bid"
          disabled={value >= effectiveMax}
          onClick={() =>
            commitValue(clampToBounds(stepAuctionPrice(value, 1, minPrice, maxPrice)))
          }
          className="size-11 shrink-0"
        >
          <Icon icon={Plus} size="sm" />
        </Button>
      </div>

      {/* Braun / Dieter Rams Precision Fader */}
      <div className="space-y-1">
        <div
          ref={trackRef}
          role="slider"
          tabIndex={0}
          aria-label="Auction price slider in SEK"
          aria-valuemin={effectiveMin}
          aria-valuemax={effectiveMax}
          aria-valuenow={value}
          aria-valuetext={formatSek(value)}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          onKeyDown={handleKeyDown}
          className={cn(
            "group relative h-10 w-full rounded-[var(--radius-sm)] border bg-muted/70 touch-none select-none outline-none transition-colors duration-150",
            "shadow-[inset_0_1px_2px_rgba(0,0,0,0.08)] dark:shadow-[inset_0_1px_3px_rgba(0,0,0,0.5)]",
            "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
            isDragging
              ? "cursor-grabbing border-foreground/30"
              : "cursor-grab border-border hover:border-foreground/25"
          )}
        >
          {/* Ruled-out lower bound stop */}
          {minBound !== null && minBoundPercent > 0 && (
            <div
              aria-hidden="true"
              style={{ width: insetPos(minBoundPercent) }}
              className="absolute inset-y-0 left-0 rounded-l-[var(--radius-sm)] bg-background/75 border-r border-foreground/20 pointer-events-none"
            />
          )}

          {/* Ruled-out upper bound stop */}
          {maxBound !== null && maxBoundPercent < 100 && (
            <div
              aria-hidden="true"
              style={{ left: insetPos(maxBoundPercent), right: 0 }}
              className="absolute inset-y-0 rounded-r-[var(--radius-sm)] bg-background/75 border-l border-foreground/20 pointer-events-none"
            />
          )}

          {/* Printed Instrument Dial Ticks (Top Edge) */}
          {MINOR_TICK_POSITIONS.map((pct) => (
            <div
              key={pct}
              aria-hidden="true"
              style={{ left: insetPos(pct) }}
              className="absolute top-0 h-1.5 w-px bg-foreground/20 pointer-events-none"
            />
          ))}
          {ticks.map((tick) => {
            const pct = priceToPercent(tick.value, minPrice, maxPrice);
            return (
              <div
                key={tick.value}
                aria-hidden="true"
                style={{ left: insetPos(pct) }}
                className="absolute top-0 h-2 w-px bg-foreground/45 pointer-events-none"
              />
            );
          })}

          {/* Milled Center Channel */}
          <div
            aria-hidden="true"
            style={{ left: `${TRACK_INSET_PX}px`, right: `${TRACK_INSET_PX}px` }}
            className="absolute top-1/2 -translate-y-1/2 h-1.5 rounded-full bg-foreground/15 dark:bg-black/65 shadow-[inset_0_1px_1px_rgba(0,0,0,0.22)] pointer-events-none"
          />

          {/* Previous Guess Pins */}
          {previousGuesses.map((guess, idx) => {
            const pct = priceToPercent(guess, minPrice, maxPrice);
            return (
              <div
                key={`${guess}-${idx}`}
                aria-hidden="true"
                style={{ left: insetPos(pct) }}
                className="absolute bottom-1 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-foreground/40 pointer-events-none"
              />
            );
          })}

          {/* Braun Architectural Slider Cap */}
          <div
            aria-hidden="true"
            style={{ left: insetPos(thumbPercent) }}
            className={cn(
              "absolute top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-8 h-8 rounded-[3px] bg-card border pointer-events-none transition-[transform,box-shadow,border-color] duration-150",
              "shadow-[0_3px_6px_rgba(0,0,0,0.16),0_1px_2px_rgba(0,0,0,0.12),inset_0_1px_0_rgba(255,255,255,0.8),inset_0_-1px_0_rgba(0,0,0,0.08)]",
              "dark:shadow-[0_3px_8px_rgba(0,0,0,0.55),0_1px_2px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.12),inset_0_-1px_0_rgba(0,0,0,0.4)]",
              isDragging
                ? "-translate-y-[53%] border-foreground/40 shadow-[0_7px_14px_rgba(0,0,0,0.22),0_2px_4px_rgba(0,0,0,0.14),inset_0_1px_0_rgba(255,255,255,0.85)] dark:shadow-[0_8px_16px_rgba(0,0,0,0.65),inset_0_1px_0_rgba(255,255,255,0.16)]"
                : "border-border group-hover:border-foreground/30"
            )}
          >
            {/* Left Machined Grooves */}
            <div className="flex items-center gap-[2px]">
              <span className="h-4 w-px bg-foreground/20 shadow-[1px_0_0_rgba(255,255,255,0.55)] dark:shadow-[1px_0_0_rgba(255,255,255,0.06)]" />
              <span className="h-4 w-px bg-foreground/20 shadow-[1px_0_0_rgba(255,255,255,0.55)] dark:shadow-[1px_0_0_rgba(255,255,255,0.06)]" />
            </div>

            {/* Center Signal Index Hairline */}
            <span className="mx-1.5 h-full w-[2px] bg-accent" />

            {/* Right Machined Grooves */}
            <div className="flex items-center gap-[2px]">
              <span className="h-4 w-px bg-foreground/20 shadow-[1px_0_0_rgba(255,255,255,0.55)] dark:shadow-[1px_0_0_rgba(255,255,255,0.06)]" />
              <span className="h-4 w-px bg-foreground/20 shadow-[1px_0_0_rgba(255,255,255,0.55)] dark:shadow-[1px_0_0_rgba(255,255,255,0.06)]" />
            </div>
          </div>
        </div>
      </div>

      {/* Row 3: Full-Width Submit Button Below Slider */}
      <Button
        type="button"
        variant="default"
        size="lg"
        onClick={onSubmit}
        className="w-full h-11"
      >
        {submitLabel}
      </Button>
    </div>
  );
}
