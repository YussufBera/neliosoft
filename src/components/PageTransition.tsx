"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export default function PageTransition() {
    const { language } = useLanguage();
    const [isTransitioning, setIsTransitioning] = useState(false);

    // Trigger transition when language changes
    useEffect(() => {
        setIsTransitioning(true);
        const timer = setTimeout(() => setIsTransitioning(false), 1000); // Increased to 1s for visibility
        return () => clearTimeout(timer);
    }, [language]);

    return (
        <AnimatePresence mode="wait">
            {isTransitioning && (
                <motion.div
                    key="page-transition-overlay"
                    className="fixed inset-0 z-[9999] bg-white flex items-center justify-center pointer-events-auto"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 1.1, opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="flex flex-col items-center gap-4"
                    >
                        {/* Spinner matching Brand Blue for consistency */}
                        <div className="w-12 h-12 rounded-full border-4 border-[#2563eb] border-t-transparent animate-spin" />
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
