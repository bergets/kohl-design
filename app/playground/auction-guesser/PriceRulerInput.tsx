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

  const updateFromClientX = React.useCallback(
    (clientX: number) => {
      const el = trackRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const pct = ((clientX - rect.left) / rect.width) * 100;
      const rawPrice = percentToPrice(pct, minPrice, maxPrice);
      onChange(clampToBounds(rawPrice));
    },
    [clampToBounds, minPrice, maxPrice, onChange]
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
      onChange(clampToBounds(stepAuctionPrice(value, 1, minPrice, maxPrice)));
    } else if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
      e.preventDefault();
      onChange(clampToBounds(stepAuctionPrice(value, -1, minPrice, maxPrice)));
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

  return (
    <div className="space-y-4">
      {/* Bid Readout + Step & Submit Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="space-y-0.5">
          <p className="text-xs text-muted-foreground">Your bid</p>
          <p className="text-xl sm:text-2xl font-semibold text-foreground tabular-nums tracking-tight">
            {formatSek(value)}
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            type="button"
            variant="outline"
            size="icon-lg"
            aria-label="Decrease bid"
            disabled={value <= effectiveMin}
            onClick={() =>
              onChange(clampToBounds(stepAuctionPrice(value, -1, minPrice, maxPrice)))
            }
            className="min-h-[44px] min-w-[44px]"
          >
            <Icon icon={Minus} size="sm" />
          </Button>
          <Button
            type="button"
            variant="outline"
            size="icon-lg"
            aria-label="Increase bid"
            disabled={value >= effectiveMax}
            onClick={() =>
              onChange(clampToBounds(stepAuctionPrice(value, 1, minPrice, maxPrice)))
            }
            className="min-h-[44px] min-w-[44px]"
          >
            <Icon icon={Plus} size="sm" />
          </Button>
          <Button
            type="button"
            variant="default"
            size="lg"
            onClick={onSubmit}
            className="flex-1 sm:flex-initial min-h-[44px]"
          >
            {submitLabel}
          </Button>
        </div>
      </div>

      {/* Logarithmic Ruler Track */}
      <div className="space-y-2 pt-1">
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
            "relative h-12 w-full rounded-[var(--radius)] border border-border bg-muted/50 touch-none select-none cursor-ew-resize overflow-hidden outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
            isDragging && "border-primary/60"
          )}
        >
          {/* Ruled-out lower bound */}
          {minBound !== null && minBoundPercent > 0 && (
            <div
              aria-hidden="true"
              style={{ width: `${minBoundPercent}%` }}
              className="absolute inset-y-0 left-0 bg-background/75 border-r border-border/80 pointer-events-none"
            />
          )}

          {/* Ruled-out upper bound */}
          {maxBound !== null && maxBoundPercent < 100 && (
            <div
              aria-hidden="true"
              style={{ width: `${100 - maxBoundPercent}%` }}
              className="absolute inset-y-0 right-0 bg-background/75 border-l border-border/80 pointer-events-none"
            />
          )}

          {/* Active bracket highlight */}
          <div
            aria-hidden="true"
            style={{
              left: `${minBoundPercent}%`,
              width: `${Math.max(0, maxBoundPercent - minBoundPercent)}%`,
            }}
            className="absolute inset-y-0 bg-primary/5 pointer-events-none"
          />

          {/* Scale Ticks */}
          {ticks.map((tick) => {
            const pct = priceToPercent(tick.value, minPrice, maxPrice);
            return (
              <div
                key={tick.value}
                aria-hidden="true"
                style={{ left: `${pct}%` }}
                className="absolute bottom-0 h-2.5 w-px bg-border pointer-events-none"
              />
            );
          })}

          {/* Previous Guess Markers */}
          {previousGuesses.map((guess, idx) => {
            const pct = priceToPercent(guess, minPrice, maxPrice);
            return (
              <div
                key={`${guess}-${idx}`}
                aria-hidden="true"
                style={{ left: `${pct}%` }}
                className="absolute top-1.5 h-2 w-2 -translate-x-1/2 rounded-full bg-muted-foreground/50 pointer-events-none"
              />
            );
          })}

          {/* Active Thumb Needle */}
          <div
            aria-hidden="true"
            style={{ left: `${thumbPercent}%` }}
            className={cn(
              "absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-8 rounded-full bg-primary shadow-sm transition-transform duration-100 pointer-events-none",
              isDragging && "scale-y-110"
            )}
          />
        </div>

        {/* Scale Labels */}
        <div className="relative h-4 w-full select-none">
          {ticks.map((tick, index) => {
            const pct = priceToPercent(tick.value, minPrice, maxPrice);
            const isFirst = index === 0;
            const isLast = index === ticks.length - 1;
            return (
              <span
                key={tick.value}
                style={{ left: `${pct}%` }}
                className={cn(
                  "absolute text-[11px] text-muted-foreground tabular-nums",
                  isFirst
                    ? "translate-x-0"
                    : isLast
                      ? "-translate-x-full"
                      : "-translate-x-1/2"
                )}
              >
                {tick.label}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}
