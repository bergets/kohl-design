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

const RIB_SPACING_PX = 14;
const RIB_INDICES = Array.from({ length: 48 }, (_, i) => i);
const FULL_SWEEP_PX = 260;

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
  minBound = null,
  maxBound = null,
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
    const dx = e.clientX - dragStartXRef.current;
    const deltaPct = (dx / FULL_SWEEP_PX) * 100;
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

  // Scroll the drum ribs proportionally to logarithmic progress
  const drumOffsetPx = (currentPercent / 100) * FULL_SWEEP_PX;
  const modOffset = ((drumOffsetPx % RIB_SPACING_PX) + RIB_SPACING_PX) % RIB_SPACING_PX;

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

      {/* Row 2: Range Bar (Above Thumb) + Braun Cylindrical Edge-Thumbwheel */}
      <div className="space-y-1.5">
        {/* Range & Bracket Indicator Bar — always visible above your thumb */}
        <div
          aria-hidden="true"
          className="relative h-1.5 w-full rounded-full bg-muted overflow-hidden"
        >
          {/* Active bracket */}
          <div
            style={{
              left: `${minBoundPercent}%`,
              width: `${Math.max(0, maxBoundPercent - minBoundPercent)}%`,
            }}
            className="absolute inset-y-0 bg-foreground/20"
          />
          {/* Current position pip */}
          <div
            style={{ left: `${currentPercent}%` }}
            className="absolute top-0 bottom-0 w-2.5 -translate-x-1/2 rounded-full bg-foreground"
          />
        </div>

        <div className="relative flex flex-col items-center">
          {/* Fixed Braun Index Triangle */}
          <div
            aria-hidden="true"
            className="mb-1 h-0 w-0 border-x-[5px] border-x-transparent border-t-[6px] border-t-foreground"
          />

          {/* Recessed Thumbwheel Drum */}
          <div
            ref={wheelRef}
            role="slider"
            tabIndex={0}
            aria-label="Auction price thumbwheel in SEK"
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
              "relative h-11 w-full rounded-[var(--radius-sm)] border bg-card touch-none select-none overflow-hidden outline-none transition-colors duration-150",
              "shadow-[inset_0_2px_6px_rgba(0,0,0,0.16),inset_0_-1px_2px_rgba(0,0,0,0.08)]",
              "dark:shadow-[inset_0_2px_8px_rgba(0,0,0,0.65),inset_0_-1px_3px_rgba(0,0,0,0.45)]",
              "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
              isDragging
                ? "cursor-grabbing border-foreground/40"
                : "cursor-grab border-border hover:border-foreground/30"
            )}
          >
            {/* Scrolling Machined Drum Ribs */}
            <div
              aria-hidden="true"
              style={{ transform: `translate3d(${modOffset - RIB_SPACING_PX}px, 0, 0)` }}
              className="absolute inset-y-0 -left-4 -right-4 flex items-center pointer-events-none"
            >
              {RIB_INDICES.map((i) => (
                <div
                  key={i}
                  style={{ width: `${RIB_SPACING_PX}px` }}
                  className="shrink-0 h-full flex items-center justify-center"
                >
                  <span className="h-6 w-px bg-foreground/20 shadow-[1px_0_0_rgba(255,255,255,0.6)] dark:shadow-[1px_0_0_rgba(255,255,255,0.06)]" />
                </div>
              ))}
            </div>

            {/* Cylindrical Edge Vignette Shading */}
            <div
              aria-hidden="true"
              className="absolute inset-0 pointer-events-none bg-[linear-gradient(90deg,rgba(0,0,0,0.14)_0%,transparent_22%,transparent_78%,rgba(0,0,0,0.14)_100%)] dark:bg-[linear-gradient(90deg,rgba(0,0,0,0.55)_0%,transparent_22%,transparent_78%,rgba(0,0,0,0.55)_100%)]"
            />

            {/* Fixed Center Index Hairline */}
            <div
              aria-hidden="true"
              className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[2px] bg-accent/80 pointer-events-none"
            />
          </div>
        </div>
      </div>

      {/* Row 3: Full-Width Submit Button Below Thumbwheel */}
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
