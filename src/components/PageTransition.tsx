"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

// Reliable "Blue Wipe" Page Transition
export default function PageTransition() {
    const { language } = useLanguage();
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Trigger transition when language changes
    useEffect(() => {
        if (!mounted) return; // Skip on initial hydration if desired, or keep it to show "loading"

        setIsTransitioning(true);
        const timer = setTimeout(() => setIsTransitioning(false), 1200); // 1.2s duration
        return () => clearTimeout(timer);
    }, [language, mounted]);

    if (!mounted) return null;

    return (
        <AnimatePresence mode="wait">
            {isTransitioning && (
                <motion.div
                    key="page-loader"
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    exit={{ scaleY: 0 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }} // Custom easing
                    style={{ originY: isTransitioning ? 0 : 1 }} // Expand from top, shrink to bottom
                    className="fixed inset-0 z-[100000] bg-[#2563eb] flex items-center justify-center pointer-events-auto"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        transition={{ delay: 0.1 }}
                        className="flex flex-col items-center gap-4"
                    >
                        {/* White logo/spinner for contrast on blue */}
                        <div className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                        <span className="text-white font-bold tracking-[0.2em] text-lg animate-pulse">LOADING</span>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
