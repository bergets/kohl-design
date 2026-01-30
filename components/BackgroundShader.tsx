"use client";

import { MeshGradient } from "@paper-design/shaders-react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const DARK_COLORS = ["#000000", "#022c22", "#064e3b", "#065f46"];

const LIGHT_COLORS = ["#FFFFFF", "#F4F7F5", "#E2ECE9", "#CBDED9", "#A8C6BE"];

export default function BackgroundShader() {
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Use dark colors as default to match the previous dark mode preference until mounted
    // or checks resolvedTheme if mounted.
    const isDark = mounted ? resolvedTheme === "dark" : true;
    const currentColors = isDark ? DARK_COLORS : LIGHT_COLORS;

    return (
        <motion.div
            className="fixed inset-0 -z-10 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
        >
            <MeshGradient
                colors={currentColors}
                speed={1.0}
                height="100%"
                width="100%"
                grainOverlay={0.1}
            />
        </motion.div>
    );
}
