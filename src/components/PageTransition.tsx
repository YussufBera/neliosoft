"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export default function PageTransition() {
    const { language } = useLanguage();
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        console.log("PageTransition mounted. Hydration complete.");
    }, []);

    // Trigger transition when language changes
    useEffect(() => {
        if (!mounted) {
            console.log("PageTransition skipping trigger: Not mounted yet.");
            return;
        }

        console.log(`PageTransition triggering! New language: ${language}`);
        setIsTransitioning(true);
        const timer = setTimeout(() => {
            console.log("PageTransition completing.");
            setIsTransitioning(false);
        }, 1400);
        return () => clearTimeout(timer);
    }, [language, mounted]);

    if (!mounted) return null;

    return (
        <AnimatePresence mode="wait">
            {isTransitioning && (
                <>
                    {/* Top Curtain */}
                    <motion.div
                        key="curtain-top"
                        initial={{ y: "-100%" }}
                        animate={{ y: "0%" }}
                        exit={{ y: "-100%" }}
                        transition={{ duration: 0.5, ease: [0.77, 0, 0.175, 1] }}
                        className="fixed top-0 left-0 w-full h-1/2 bg-[#2563eb] z-[100000] pointer-events-auto"
                        onAnimationStart={() => console.log("Top curtain animation started")}
                    />

                    {/* Bottom Curtain */}
                    <motion.div
                        key="curtain-bottom"
                        initial={{ y: "100%" }}
                        animate={{ y: "0%" }}
                        exit={{ y: "100%" }}
                        transition={{ duration: 0.5, ease: [0.77, 0, 0.175, 1] }}
                        className="fixed bottom-0 left-0 w-full h-1/2 bg-[#2563eb] z-[100000] pointer-events-auto"
                    />

                    {/* Loading Bar */}
                    <motion.div
                        key="loading-bar"
                        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-1 bg-white/30 rounded-full z-[100001] pointer-events-none overflow-hidden"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1, transition: { delay: 0.2 } }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            className="h-full bg-white"
                            initial={{ width: "0%" }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 0.8, ease: "easeInOut", delay: 0.3 }}
                        />
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
