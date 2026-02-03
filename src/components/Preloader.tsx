"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function Preloader({ onComplete }: { onComplete: () => void }) {
    const [show, setShow] = useState(true);

    useEffect(() => {
        // Start exit animation slightly before calling onComplete
        const timer = setTimeout(() => {
            setShow(false);
        }, 2500); // 2.5s total duration for branding

        const completeTimer = setTimeout(() => {
            onComplete();
        }, 3500); // Allow time for exit animation

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
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100vh",
                        background: "linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)", // Deep indigo background
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        zIndex: 9999,
                    }}
                >
                    {/* Pulsing Glow Effect Behind Logo */}
                    <motion.div
                        animate={{
                            scale: [1, 1.5, 1],
                            opacity: [0.3, 0.6, 0.3],
                        }}
                        transition={{
                            duration: 2,
                            ease: "easeInOut",
                            repeat: Infinity,
                        }}
                        style={{
                            position: "absolute",
                            width: "200px",
                            height: "200px",
                            borderRadius: "50%",
                            background: "radial-gradient(circle, rgba(99, 102, 241, 0.4) 0%, transparent 70%)",
                        }}
                    />

                    {/* Logo Animation */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
                        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                        exit={{ scale: 20, opacity: 0, filter: "blur(20px)" }} // Explodes out smoothly
                        transition={{ duration: 1.2, ease: "easeOut" }}
                    >
                        <Image
                            src="/neliosoft-icon-only.png"
                            alt="NelioSoft N Logo"
                            width={154}
                            height={161}
                            priority
                            style={{ objectFit: "contain" }}
                        />
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
