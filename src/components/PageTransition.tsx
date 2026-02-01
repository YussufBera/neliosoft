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
        const timer = setTimeout(() => setIsTransitioning(false), 800); // Duration of the "reload" effect
        return () => clearTimeout(timer);
    }, [language]);

    return (
        <AnimatePresence>
            {isTransitioning && (
                <motion.div
                    className="fixed inset-0 z-[9999] bg-white pointer-events-none flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                    {/* Optional: Add a subtle loading indicator or logo pulse here if desired */}
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 1.2, opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="flex flex-col items-center gap-4"
                    >
                        {/* We can use the small icon logo or just a spinner */}
                        <div className="w-12 h-12 rounded-full border-4 border-blue-500 border-t-transparent animate-spin" />
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
