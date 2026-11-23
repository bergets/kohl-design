"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BrandFlower } from "@/components/BrandFlower";
import { Button } from "@/components/ui/button";

/* ============================================================================
   1 & 4. ANIMATED SIGN-OFF PHRASES + TACTILE BRANDFLOWER STAMP
   ============================================================================ */

const SIGN_OFF_PHRASES = [
  "All the best from Stockholm,",
  "Warmly, Henrik",
  "Make something nice today,",
  "Stay curious,",
  "Until next time,",
  "Fika soon?",
] as const;

export function SignatureStamp() {
  const [stampCount, setStampCount] = React.useState(0);
  const currentPhrase = SIGN_OFF_PHRASES[stampCount % SIGN_OFF_PHRASES.length];

  const handleStamp = () => {
    setStampCount((c) => c + 1);
  };

  return (
    <div className="pt-5 flex items-center justify-between gap-4 border-t border-border/60">
      <div className="min-w-0 flex flex-col items-start gap-1.5">
        <AnimatePresence mode="wait">
          <motion.div
            key={stampCount}
            exit={{ opacity: 0, transition: { duration: 0.12 } }}
            className="relative inline-block max-w-full pb-3"
          >
            <motion.p
              initial={{ clipPath: "inset(-15% 100% -15% -4%)", opacity: 0.35 }}
              animate={{ clipPath: "inset(-15% -12% -15% -4%)", opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="font-cooper italic text-lg sm:text-2xl text-pine-900 dark:text-white leading-snug"
            >
              {currentPhrase}
            </motion.p>

            <motion.svg
              viewBox="0 0 180 10"
              preserveAspectRatio="none"
              fill="none"
              aria-hidden="true"
              initial={{ clipPath: "inset(-20% 100% -20% -5%)", opacity: 0 }}
              animate={{ clipPath: "inset(-20% -5% -20% -5%)", opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="pointer-events-none absolute left-0 right-0 bottom-0 w-full h-2.5 text-emblem/80 overflow-visible"
            >
              <path
                d="M0 4 C52 8, 128 7, 180 3"
                stroke="currentColor"
                strokeWidth="1.5"
                vectorEffect="non-scaling-stroke"
                strokeLinecap="round"
              />
            </motion.svg>
          </motion.div>
        </AnimatePresence>

        <span className="font-mono text-[11px] text-muted-foreground">
          Stockholm · Nov 2026
        </span>
      </div>

      <Button
        type="button"
        variant="tactile"
        shape="pill"
        size="icon-xl"
        onClick={handleStamp}
        aria-label="Cycle sign-off phrase"
        title="Click for another sign-off"
        className="relative"
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
              className="pointer-events-none absolute inset-0 rounded-full border border-emblem"
            />
          )}
        </AnimatePresence>

        <motion.span
          animate={{ rotate: stampCount * 45 }}
          transition={{ type: "spring", stiffness: 320, damping: 20 }}
          className="inline-flex items-center justify-center"
        >
          <BrandFlower className="size-5 text-emblem" />
        </motion.span>
      </Button>
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
