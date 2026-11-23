"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BrandFlower } from "@/components/BrandFlower";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

/* ============================================================================
   1 & 4. ANIMATED SIGNATURE + TACTILE BRANDFLOWER STAMP
   ============================================================================ */

export function SignatureStamp() {
  const [stampCount, setStampCount] = React.useState(0);

  const handleStamp = () => {
    setStampCount((c) => c + 1);
  };

  return (
    <div className="pt-4 flex items-center justify-between gap-4 border-t border-border/60">
      <div className="flex flex-col gap-1">
        <svg
          key={stampCount}
          viewBox="0 0 210 52"
          fill="none"
          aria-label="Henrik Kohl signature"
          className="w-40 sm:w-44 h-11 text-pine-900 dark:text-white overflow-visible"
        >
          {/* Calligraphic H + flowing Henrik Kohl stroke */}
          <motion.path
            d="M12 40 C14 24, 18 10, 20 8 C19 18, 16 32, 15 41 M16 25 C24 23, 33 21, 38 19 M37 9 C35 20, 32 34, 31 42 C36 33, 44 26, 49 27 C52 28, 49 36, 54 36 C59 36, 65 27, 69 27 C72 27, 70 35, 75 35 C80 35, 86 24, 92 14 C94 10, 91 10, 89 15 C86 23, 84 32, 86 35 C89 38, 96 31, 102 28 C105 27, 104 35, 109 35 C115 35, 124 22, 130 11 M128 28 C135 23, 144 19, 149 20 C142 25, 134 31, 133 34 C133 37, 142 36, 151 33 C158 30, 165 27, 171 29 C175 30, 173 35, 178 35 C185 35, 194 29, 202 26"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0.2 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.35, ease: [0.22, 1, 0.36, 1] }}
          />
        </svg>
        <span className="font-mono text-[11px] text-muted-foreground">
          Stockholm · Nov 2026
        </span>
      </div>

      <button
        type="button"
        onClick={handleStamp}
        aria-label="Stamp Henrik's mark"
        title="Press to stamp"
        className="relative size-11 shrink-0 rounded-full bg-card border border-border/70 [box-shadow:var(--shadow-bezel)] flex items-center justify-center cursor-pointer outline-none transition-transform duration-150 active:scale-95 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        <AnimatePresence>
          {stampCount > 0 && (
            <motion.span
              key={stampCount}
              aria-hidden="true"
              initial={{ scale: 0.85, opacity: 0.7 }}
              animate={{ scale: 1.75, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.55, ease: "easeOut" }}
              className="pointer-events-none absolute inset-0 rounded-full border border-accent"
            />
          )}
        </AnimatePresence>

        <motion.span
          animate={{ rotate: stampCount * 45 }}
          transition={{ type: "spring", stiffness: 320, damping: 20 }}
          className="inline-flex items-center justify-center"
        >
          <BrandFlower className="size-5 text-accent" />
        </motion.span>
      </button>
    </div>
  );
}

/* ============================================================================
   2. STOCKHOLM DAYLIGHT HORIZON (ASTRONOMICAL MARGINALIA)
   ============================================================================ */

const STOCKHOLM_LAT = 59.3293;
const STOCKHOLM_LNG = 18.0686;

interface SolarState {
  timeLabel: string;
  sunriseLabel: string;
  sunsetLabel: string;
  daylightLabel: string;
  isDaylight: boolean;
  progress: number; // 0..1 across daylight arc, or 0..1 across night
}

function formatStockholmTime(date: Date): string {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Stockholm",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(date);
}

function computeStockholmSolar(now: Date): SolarState {
  const rad = Math.PI / 180;
  const startOfYear = new Date(Date.UTC(now.getUTCFullYear(), 0, 0));
  const dayOfYear = Math.floor((now.getTime() - startOfYear.getTime()) / 86400000);

  // Fractional year in radians
  const gamma = ((2 * Math.PI) / 365) * (dayOfYear - 1);
  // Equation of time (minutes)
  const eqTime =
    229.18 *
    (0.000075 +
      0.001868 * Math.cos(gamma) -
      0.032077 * Math.sin(gamma) -
      0.014615 * Math.cos(2 * gamma) -
      0.040849 * Math.sin(2 * gamma));

  // Solar declination (radians)
  const decl =
    0.006918 -
    0.399912 * Math.cos(gamma) +
    0.070257 * Math.sin(gamma) -
    0.006758 * Math.cos(2 * gamma) +
    0.000907 * Math.sin(2 * gamma) -
    0.002697 * Math.cos(3 * gamma) +
    0.00148 * Math.sin(3 * gamma);

  const latRad = STOCKHOLM_LAT * rad;
  const cosHa =
    (Math.cos(90.833 * rad) / (Math.cos(latRad) * Math.cos(decl))) -
    Math.tan(latRad) * Math.tan(decl);

  const clampedCosHa = Math.max(-1, Math.min(1, cosHa));
  const haDeg = Math.acos(clampedCosHa) / rad;

  const solarNoonUtcMin = 720 - 4 * STOCKHOLM_LNG - eqTime;
  const sunriseUtcMin = solarNoonUtcMin - 4 * haDeg;
  const sunsetUtcMin = solarNoonUtcMin + 4 * haDeg;

  const utcMidnight = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
  const sunriseDate = new Date(utcMidnight + sunriseUtcMin * 60000);
  const sunsetDate = new Date(utcMidnight + sunsetUtcMin * 60000);

  const nowMs = now.getTime();
  const srMs = sunriseDate.getTime();
  const ssMs = sunsetDate.getTime();
  const isDaylight = nowMs >= srMs && nowMs <= ssMs;

  let progress = 0.5;
  if (isDaylight) {
    progress = Math.max(0, Math.min(1, (nowMs - srMs) / (ssMs - srMs)));
  } else if (nowMs < srMs) {
    progress = 0.12;
  } else {
    progress = 0.88;
  }

  const daylightMinutes = Math.max(0, Math.round(sunsetUtcMin - sunriseUtcMin));
  const hours = Math.floor(daylightMinutes / 60);
  const mins = daylightMinutes % 60;

  return {
    timeLabel: formatStockholmTime(now),
    sunriseLabel: formatStockholmTime(sunriseDate),
    sunsetLabel: formatStockholmTime(sunsetDate),
    daylightLabel: `${hours}h ${mins}m`,
    isDaylight,
    progress,
  };
}

function pointOnQuadBezier(t: number) {
  // P0=(16, 48), P1=(120, -6), P2=(224, 48)
  const u = 1 - t;
  const x = u * u * 16 + 2 * u * t * 120 + t * t * 224;
  const y = u * u * 48 + 2 * u * t * -6 + t * t * 48;
  return { x, y };
}

export function StockholmHorizon() {
  const [solar, setSolar] = React.useState<SolarState | null>(null);

  React.useEffect(() => {
    const update = () => setSolar(computeStockholmSolar(new Date()));
    update();
    const id = setInterval(update, 30000);
    return () => clearInterval(id);
  }, []);

  const sunPoint = solar
    ? solar.isDaylight
      ? pointOnQuadBezier(solar.progress)
      : { x: solar.progress < 0.5 ? 28 : 212, y: 54 }
    : { x: 120, y: 21 };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span className="font-medium text-foreground">Stockholm daylight</span>
        <span className="font-mono">{solar ? solar.timeLabel : "—:—"} CET</span>
      </div>

      <svg
        viewBox="0 0 240 62"
        fill="none"
        aria-hidden="true"
        className="w-full h-14 overflow-visible"
      >
        {/* Horizon hairline */}
        <line
          x1="0"
          y1="48"
          x2="240"
          y2="48"
          className="stroke-border"
          strokeWidth="1"
        />

        {/* Daylight arc */}
        <path
          d="M 16 48 Q 120 -6 224 48"
          className="stroke-pine-400/70 dark:stroke-pine-400/50"
          strokeWidth="1.25"
          strokeDasharray="2 3"
        />

        {/* Elapsed daylight solid arc */}
        {solar?.isDaylight && (
          <path
            d="M 16 48 Q 120 -6 224 48"
            className="stroke-pine-700 dark:stroke-[#8AD0BE]"
            strokeWidth="1.5"
            pathLength={1}
            strokeDasharray={`${solar.progress} 1`}
          />
        )}

        {/* Sun dot */}
        <circle
          cx={sunPoint.x}
          cy={sunPoint.y}
          r="8"
          className={
            solar?.isDaylight
              ? "fill-accent/20"
              : "fill-muted-foreground/15"
          }
        />
        <circle
          cx={sunPoint.x}
          cy={sunPoint.y}
          r="3.5"
          className={
            solar?.isDaylight
              ? "fill-accent"
              : "fill-muted-foreground"
          }
        />
      </svg>

      <p className="text-xs leading-relaxed text-muted-foreground">
        {solar ? (
          solar.isDaylight ? (
            <>
              <span className="text-foreground font-medium">{solar.daylightLabel}</span>{" "}
              of daylight today · Sunset at{" "}
              <span className="font-mono text-foreground">{solar.sunsetLabel}</span>.
            </>
          ) : (
            <>
              Sun is below the horizon · Rises at{" "}
              <span className="font-mono text-foreground">{solar.sunriseLabel}</span>{" "}
              ({solar.daylightLabel} of light).
            </>
          )
        ) : (
          "Calculating Stockholm solar arc…"
        )}
      </p>
    </div>
  );
}

/* ============================================================================
   5. INTERACTIVE CRAFT LENS SPECIMEN
   ============================================================================ */

export function CraftLens() {
  const [lens, setLens] = React.useState<"raw" | "polished">("polished");
  const isPolished = lens === "polished";

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <span className="text-xs font-medium text-foreground">Craft lens</span>

        <Tabs
          value={lens}
          onValueChange={(v) => setLens(v as "raw" | "polished")}
        >
          <TabsList variant="tactile" size="xs">
            <TabsTrigger value="raw">Raw</TabsTrigger>
            <TabsTrigger value="polished">Polished</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Live UI specimen */}
      <div
        className={cn(
          "transition-all duration-300 ease-out",
          isPolished
            ? "rounded-[var(--radius-lg)] bg-card border border-border/70 p-4 [box-shadow:var(--shadow-bezel)]"
            : "rounded-none bg-background border border-border p-3 shadow-none"
        )}
      >
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p
              className={cn(
                "truncate transition-all duration-300",
                isPolished
                  ? "font-cooper text-base text-foreground leading-tight"
                  : "font-sans text-sm font-bold text-foreground"
              )}
            >
              Morning shift
            </p>
            <p
              className={cn(
                "transition-all duration-300 mt-0.5",
                isPolished
                  ? "text-xs text-muted-foreground"
                  : "text-[11px] text-muted-foreground font-mono"
              )}
            >
              08:00 – 16:30 · Stockholm
            </p>
          </div>

          <button
            type="button"
            onClick={() => setLens(isPolished ? "raw" : "polished")}
            className={cn(
              "shrink-0 cursor-pointer transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-ring",
              isPolished
                ? "h-8 px-3.5 rounded-full bg-primary text-primary-foreground text-xs font-medium [box-shadow:0_1px_2px_rgba(0,0,0,0.12),var(--specular-rim)] hover:-translate-y-0.5 active:translate-y-0"
                : "h-7 px-2.5 rounded-none bg-foreground text-background text-xs font-normal"
            )}
          >
            Confirm
          </button>
        </div>
      </div>

      <p className="text-xs leading-relaxed text-muted-foreground">
        {isPolished
          ? "Specular rim, optical radius, Cooper + DM Sans hierarchy, and spring lift."
          : "Unstyled box, sharp corners, flat contrast, and zero surface depth."}
      </p>
    </div>
  );
}
