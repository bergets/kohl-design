"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

const WORD_BASE = 0.06;
const PER_LETTER = 0.008;
const SENTENCE_PAUSE = 0.35;
const EMPHASIS_HOLD = 0.12;

type WordEntrance = {
  initial: { opacity: number; y?: number; x?: number; scale?: number; filter?: string };
  animate: { opacity: number; y?: number; x?: number; scale?: number; filter?: string };
  duration: number;
};

const WORD_ENTRANCES: WordEntrance[] = [
  {
    initial: { y: 18, opacity: 0, filter: "blur(6px)" },
    animate: { y: 0, opacity: 1, filter: "blur(0px)" },
    duration: 0.45,
  },
  {
    initial: { y: -12, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    duration: 0.38,
  },
  {
    initial: { scale: 0.86, opacity: 0, filter: "blur(4px)" },
    animate: { scale: 1, opacity: 1, filter: "blur(0px)" },
    duration: 0.45,
  },
  {
    initial: { x: -14, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    duration: 0.38,
  },
];

const normalize = (text: string) =>
  text.toLowerCase().replace(/[^\p{L}\p{N}]/gu, "");

export interface SpeakTextProps {
  text: string;
  emphasis?: string[];
  delay?: number;
  className?: string;
}

export function SpeakText({
  text,
  emphasis = [],
  delay = 0,
  className,
}: SpeakTextProps) {
  const shouldReduceMotion = useReducedMotion();
  const wanted = React.useMemo(
    () => new Set(emphasis.map(normalize)),
    [emphasis]
  );

  const tokens = React.useMemo(() => {
    const rawWords = text.trim().split(/\s+/);
    let t = delay;

    return rawWords.map((word, index) => {
      const clean = normalize(word);
      const isEmphasized = wanted.has(clean);
      const startTime = t;
      const entrance = WORD_ENTRANCES[index % WORD_ENTRANCES.length];

      t += WORD_BASE + PER_LETTER * clean.length + (isEmphasized ? EMPHASIS_HOLD : 0);
      if (/[.!?]$/.test(word) && index < rawWords.length - 1) {
        t += SENTENCE_PAUSE;
      }

      return {
        word,
        startTime,
        isEmphasized,
        entrance,
        chars: Array.from(word),
      };
    });
  }, [text, wanted, delay]);

  if (shouldReduceMotion) {
    return <span className={className}>{text}</span>;
  }

  return (
    <span className={cn("inline", className)} aria-label={text}>
      {tokens.map((token, wordIdx) => (
        <React.Fragment key={`${token.word}-${wordIdx}`}>
          {token.isEmphasized ? (
            <span
              aria-hidden="true"
              className="inline-block whitespace-nowrap"
            >
              {token.chars.map((char, charIdx) => (
                <motion.span
                  key={`${char}-${charIdx}`}
                  className="inline-block"
                  initial={{
                    y: 22,
                    rotate: -8,
                    opacity: 0,
                    filter: "blur(4px)",
                  }}
                  animate={{
                    y: 0,
                    rotate: 0,
                    opacity: 1,
                    filter: "blur(0px)",
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                    delay: token.startTime + charIdx * 0.032,
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </span>
          ) : (
            <motion.span
              aria-hidden="true"
              className="inline-block"
              initial={token.entrance.initial}
              animate={token.entrance.animate}
              transition={{
                duration: token.entrance.duration,
                delay: token.startTime,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {token.word}
            </motion.span>
          )}
          {wordIdx < tokens.length - 1 ? " " : null}
        </React.Fragment>
      ))}
    </span>
  );
}
