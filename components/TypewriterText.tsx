"use client";

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useState } from "react";

interface TypewriterTextProps {
    text: string;
    className?: string;
    delay?: number;
}

export function TypewriterText({ text, className, delay = 0 }: TypewriterTextProps) {
    const count = useMotionValue(0);
    const rounded = useTransform(count, (latest) => Math.round(latest));
    const displayText = useTransform(rounded, (latest) => text.slice(0, latest));
    const [isDone, setIsDone] = useState(false);

    useEffect(() => {
        const controls = animate(count, text.length, {
            type: "tween",
            duration: text.length * 0.05, // Adjust speed here
            ease: "linear",
            delay: delay,
            onComplete: () => setIsDone(true),
        });
        return controls.stop;
    }, [count, text.length, delay]);

    return (
        <span className={className}>
            <span className="mr-2 text-primary/100">&gt;</span>
            <motion.span>{displayText}</motion.span>
            <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    ease: "linear",
                }}
                className="inline-block w-[3px] h-[1em] bg-current ml-1 align-middle"
                style={{ opacity: 1 }}
            />
        </span>
    );
}
