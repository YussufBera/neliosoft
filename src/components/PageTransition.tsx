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
                <motion.div
                    key="language-transition"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="fixed inset-0 bg-white/80 backdrop-blur-sm z-[100000] pointer-events-none flex items-center justify-center"
                >
                    <div className="w-8 h-8 border-2 border-blue-600/30 border-t-blue-600 rounded-full animate-spin" />
                </motion.div>
            )}
        </AnimatePresence>
    );
}
