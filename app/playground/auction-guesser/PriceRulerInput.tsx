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

const TAPE_WIDTH_PX = 440;
const MINOR_TICK_COUNT = 40;
const MINOR_TICKS = Array.from({ length: MINOR_TICK_COUNT + 1 }, (_, i) => (i / MINOR_TICK_COUNT) * 100);

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
  const wheelRef = React.useRef<HTMLDivElement>(null);
  const lastValueRef = React.useRef<number>(value);
  const dragStartXRef = React.useRef<number>(0);
  const dragStartPercentRef = React.useRef<number>(0);
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

  function handlePointerDown(e: React.PointerEvent<HTMLDivElement>) {
    e.currentTarget.setPointerCapture(e.pointerId);
    dragStartXRef.current = e.clientX;
    dragStartPercentRef.current = priceToPercent(value, minPrice, maxPrice);
    setIsDragging(true);
  }

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (!isDragging) return;
    // Dragging the scale tape left brings higher numbers under the fixed center pointer
    const dx = e.clientX - dragStartXRef.current;
    const deltaPct = (-dx / TAPE_WIDTH_PX) * 100;
    const nextPct = Math.max(0, Math.min(100, dragStartPercentRef.current + deltaPct));
    const rawPrice = percentToPrice(nextPct, minPrice, maxPrice);
    commitValue(clampToBounds(rawPrice));
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

  const currentPercent = priceToPercent(value, minPrice, maxPrice);
  const minBoundPercent =
    minBound !== null ? priceToPercent(minBound, minPrice, maxPrice) : 0;
  const maxBoundPercent =
    maxBound !== null ? priceToPercent(maxBound, minPrice, maxPrice) : 100;

  const tapeShiftPx = -(currentPercent / 100) * TAPE_WIDTH_PX;

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

      {/* Row 2: Unified Braun Tuning-Tape Wheel */}
      <div className="relative flex flex-col items-center">
        {/* Fixed Center Braun Index Triangle */}
        <div
          aria-hidden="true"
          className="mb-1 h-0 w-0 border-x-[5px] border-x-transparent border-t-[6px] border-t-accent"
        />

        {/* Recessed Dial Window */}
        <div
          ref={wheelRef}
          role="slider"
          tabIndex={0}
          aria-label="Auction price tuning wheel in SEK"
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
            "relative h-12 w-full rounded-[var(--radius-sm)] border bg-card touch-none select-none overflow-hidden outline-none transition-colors duration-150",
            "shadow-[inset_0_2px_6px_rgba(0,0,0,0.16),inset_0_-1px_2px_rgba(0,0,0,0.08)]",
            "dark:shadow-[inset_0_2px_8px_rgba(0,0,0,0.65),inset_0_-1px_3px_rgba(0,0,0,0.45)]",
            "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
            isDragging
              ? "cursor-grabbing border-foreground/40"
              : "cursor-grab border-border hover:border-foreground/30"
          )}
        >
          {/* Scrolling Scale Tape Centered at Current Value */}
          <div
            aria-hidden="true"
            style={{
              left: "50%",
              width: `${TAPE_WIDTH_PX}px`,
              transform: `translate3d(${tapeShiftPx}px, 0, 0)`,
            }}
            className="absolute inset-y-0 pointer-events-none"
          >
            {/* Ruled-out lower section on the tape */}
            {minBound !== null && minBoundPercent > 0 && (
              <div
                style={{ width: `${minBoundPercent}%` }}
                className="absolute inset-y-0 left-0 bg-muted/80 border-r border-foreground/25"
              />
            )}

            {/* Ruled-out upper section on the tape */}
            {maxBound !== null && maxBoundPercent < 100 && (
              <div
                style={{ left: `${maxBoundPercent}%`, right: 0 }}
                className="absolute inset-y-0 bg-muted/80 border-l border-foreground/25"
              />
            )}

            {/* Minor Knurled Ticks */}
            {MINOR_TICKS.map((pct) => (
              <div
                key={pct}
                style={{ left: `${pct}%` }}
                className="absolute bottom-0 h-2.5 w-px bg-foreground/20"
              />
            ))}

            {/* Major Scale Ticks + Labels Directly on the Wheel */}
            {ticks.map((tick) => {
              const pct = priceToPercent(tick.value, minPrice, maxPrice);
              return (
                <div
                  key={tick.value}
                  style={{ left: `${pct}%` }}
                  className="absolute inset-y-0"
                >
                  <div className="absolute bottom-0 h-4 w-px bg-foreground/55" />
                  <span className="absolute top-1.5 -translate-x-1/2 text-[10px] font-medium text-foreground/75 tabular-nums whitespace-nowrap">
                    {tick.label}
                  </span>
                </div>
              );
            })}

            {/* Previous Guess Pins on the Tape */}
            {previousGuesses.map((guess, idx) => {
              const pct = priceToPercent(guess, minPrice, maxPrice);
              return (
                <div
                  key={`${guess}-${idx}`}
                  style={{ left: `${pct}%` }}
                  className="absolute bottom-4 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-foreground/60"
                />
              );
            })}
          </div>

          {/* Cylindrical Edge Vignette Shading */}
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none bg-[linear-gradient(90deg,rgba(0,0,0,0.16)_0%,transparent_24%,transparent_76%,rgba(0,0,0,0.16)_100%)] dark:bg-[linear-gradient(90deg,rgba(0,0,0,0.6)_0%,transparent_24%,transparent_76%,rgba(0,0,0,0.6)_100%)]"
          />

          {/* Fixed Center Index Hairline */}
          <div
            aria-hidden="true"
            className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[2px] bg-accent pointer-events-none"
          />
        </div>
      </div>

      {/* Row 3: Full-Width Submit Button Below Wheel */}
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
