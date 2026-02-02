"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader({ onComplete }: { onComplete: () => void }) {
    const [show, setShow] = useState(true);

    useEffect(() => {
        // Much faster transition (0.8s total)
        const timer = setTimeout(() => {
            setShow(false);
        }, 800);

        const completeTimer = setTimeout(() => {
            onComplete();
        }, 1200);

        return () => {
            clearTimeout(timer);
            clearTimeout(completeTimer);
        };
    }, [onComplete]);

    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100vh",
                        background: "#ffffff", // Clean white background
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        zIndex: 9999,
                    }}
                >
                    {/* Minimal Modern Loader */}
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-12 h-12 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin" />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
