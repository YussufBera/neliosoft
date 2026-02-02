import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export default function PageTransition() {
    const { isTransitioning } = useLanguage();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    // Organic cloud shapes (blurred circles) positions
    const clouds = [
        { id: 1, x: "20%", y: "30%", scale: 1.5, delay: 0 },
        { id: 2, x: "80%", y: "20%", scale: 1.8, delay: 0.1 },
        { id: 3, x: "50%", y: "70%", scale: 2.0, delay: 0.05 },
        { id: 4, x: "10%", y: "80%", scale: 1.6, delay: 0.15 },
        { id: 5, x: "90%", y: "80%", scale: 1.4, delay: 0.2 },
        { id: 6, x: "50%", y: "50%", scale: 2.5, delay: 0 }, // Center core
    ];

    return (
        <AnimatePresence mode="wait">
            {isTransitioning && (
                <motion.div
                    key="language-transition"
                    className="fixed inset-0 z-[100000] pointer-events-none overflow-hidden flex items-center justify-center"
                >
                    {/* Background Fade */}
                    <motion.div
                        className="absolute inset-0 bg-white/50 backdrop-blur-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    />

                    {/* Cloud Bloom Effect */}
                    {clouds.map((cloud) => (
                        <motion.div
                            key={cloud.id}
                            className="absolute rounded-full bg-white opacity-90 blur-3xl"
                            style={{
                                left: cloud.x,
                                top: cloud.y,
                                width: "40vw",
                                height: "40vw",
                                transform: "translate(-50%, -50%)",
                            }}
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: [0, cloud.scale, cloud.scale * 1.2], opacity: [0, 1, 1] }}
                            exit={{ scale: cloud.scale * 1.5, opacity: 0 }}
                            transition={{
                                duration: 0.8,
                                ease: [0.22, 1, 0.36, 1], // Custom bloom ease
                                delay: cloud.delay
                            }}
                        />
                    ))}

                    {/* Spinner Center */}
                    <motion.div
                        className="relative z-10"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.2 }}
                        transition={{ delay: 0.2 }}
                    >
                        <div className="w-12 h-12 border-4 border-blue-100 border-t-blue-500 rounded-full animate-spin shadow-xl" />
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
