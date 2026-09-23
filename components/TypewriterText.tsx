"use client";

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useState } from "react";

interface TypewriterTextProps {
    lines: { text: string; className?: string; content?: React.ReactNode }[];
    containerClassName?: string;
    delay?: number;
    showPrompt?: boolean;
    cursorClassName?: string;
    onSequenceComplete?: () => void;
}

function TypewriterLineItem({
    text,
    className,
    onComplete,
    keepCursor,
    content,
    showPrompt = false,
    cursorClassName = "inline-block w-[3px] h-[1em] bg-primary dark:bg-accent ml-1.5 align-middle",
}: {
    text: string;
    className?: string;
    onComplete: () => void;
    keepCursor: boolean;
    content?: React.ReactNode;
    showPrompt?: boolean;
    cursorClassName?: string;
}) {
    const count = useMotionValue(0);
    const rounded = useTransform(count, (latest) => Math.round(latest));
    const displayText = useTransform(rounded, (latest) => text.slice(0, latest));
    const [isDone, setIsDone] = useState(false);

    useEffect(() => {
        const controls = animate(count, text.length, {
            type: "tween",
            duration: text.length * 0.045,
            ease: "linear",
            onComplete: () => {
                setIsDone(true);
                onComplete();
            },
        });
        return controls.stop;
    }, [count, text.length, onComplete]);

    return (
        <div className={`flex items-start ${className || ""}`}>
            {showPrompt && (
                <span className="mr-2 text-primary/100 shrink-0 select-none">&gt;</span>
            )}
            <span className="flex-1 min-w-0">
                {!isDone || !content ? (
                    <motion.span>{displayText}</motion.span>
                ) : (
                    <span>{content}</span>
                )}
                {(!isDone || keepCursor) && (
                    <motion.span
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{
                            duration: 0.8,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                        className={cursorClassName}
                    />
                )}
            </span>
        </div>
    );
}

export function TypewriterText({
    lines,
    containerClassName,
    delay = 0,
    showPrompt = false,
    cursorClassName,
    onSequenceComplete,
}: TypewriterTextProps) {
    const [activeLineIndex, setActiveLineIndex] = useState(0);
    const [startSequence, setStartSequence] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setStartSequence(true);
        }, delay * 1000);
        return () => clearTimeout(timeout);
    }, [delay]);

    return (
        <span className={`block ${containerClassName || ""}`}>
            {lines.map((line, index) => {
                if (!startSequence) return null;
                if (index > activeLineIndex) return null;

                return (
                    <TypewriterLineItem
                        key={index}
                        text={line.text}
                        className={line.className}
                        content={line.content}
                        showPrompt={showPrompt}
                        cursorClassName={cursorClassName}
                        onComplete={() => {
                            if (index === activeLineIndex) {
                                setActiveLineIndex(prev => prev + 1);
                            }
                            if (index === lines.length - 1) {
                                onSequenceComplete?.();
                            }
                        }}
                        keepCursor={index === lines.length - 1}
                    />
                );
            })}
        </span>
    );
}
