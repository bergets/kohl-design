"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue } from "framer-motion";
import Image from "next/image";

export default function CustomCursor() {
    const CURSOR_SIZE = 48; // Adjust based on your visual preference

    // Store the mouse X and Y coordinates in Framer Motion useMotionValues
    const mouseX = useMotionValue(-100);
    const mouseY = useMotionValue(-100);

    const [canHover, setCanHover] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia("(hover: hover)");

        const handleMouseMove = (e: MouseEvent) => {
            // Centering: Ensure the div is centered on the mouse coordinates
            // (subtract half the width/height of the cursor size from the x/y values)
            mouseX.set(e.clientX - CURSOR_SIZE / 2);
            mouseY.set(e.clientY - CURSOR_SIZE / 2);
        };

        const initCursor = () => {
            if (mediaQuery.matches) {
                setCanHover(true);
                // Crucial: On mount (if valid), hide the default system pointer
                document.body.style.cursor = "none";
                window.addEventListener("mousemove", handleMouseMove);
            } else {
                setCanHover(false);
                document.body.style.cursor = "auto";
                window.removeEventListener("mousemove", handleMouseMove);
            }
        };

        initCursor();

        // Listen for environment changes
        mediaQuery.addEventListener("change", initCursor);

        return () => {
            mediaQuery.removeEventListener("change", initCursor);
            window.removeEventListener("mousemove", handleMouseMove);
            // On unmount, reset it to 'auto'
            document.body.style.cursor = "auto";
        };
    }, [mouseX, mouseY]);

    // Accessibility Check: Only render this component if the device supports hover
    if (!canHover) return null;

    return (
        <motion.div
            className="fixed top-0 left-0 pointer-events-none z-[9999]"
            style={{
                width: CURSOR_SIZE,
                height: CURSOR_SIZE,
                x: mouseX,
                y: mouseY,
            }}
        >
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
                className="w-full h-full relative"
            >
                <Image
                    src="/cursor-graphic.svg"
                    alt="Custom Cursor"
                    fill
                    className="object-contain" // Preserves aspect ratio
                    priority
                />
            </motion.div>
        </motion.div>
    );
}
