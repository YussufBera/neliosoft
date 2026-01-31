"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import styles from "./Hero.module.css";
import { ArrowRight, Mail } from "lucide-react";
import Image from "next/image";

export default function Hero() {
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3
            }
        }
    };

    const itemVariants: Variants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };

    const blobVariants: Variants = {
        animate: {
            scale: [1, 1.1, 1],
            rotate: [0, 10, -10, 0],
            transition: {
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut"
            }
        }
    };

    return (
        <section className={styles.hero}>
            {/* Animated Background */}
            <div className={styles.background}>
                <motion.div
                    className={`${styles.blob} ${styles.blob1}`}
                    animate="animate"
                    variants={blobVariants}
                />
                <motion.div
                    className={`${styles.blob} ${styles.blob2}`}
                    animate="animate"
                    variants={blobVariants}
                    transition={{ duration: 12, repeat: Infinity, ease: [0, 0, 1, 1], delay: 1 }}
                />
            </div>

            <motion.div
                className={`${styles.container} ${styles.content}`}
                initial="hidden"
                animate="visible"
                variants={containerVariants}
            >
                <motion.div variants={itemVariants} className={styles.heroLogoWrapper}>
                    <Image
                        src="/icon-logo-transparent.png"
                        alt="NelioSoft Icon Logo"
                        width={120}
                        height={120}
                        className={styles.heroLogo}
                        priority
                    />
                </motion.div>

                <motion.h1 className={styles.title} variants={itemVariants}>
                    We Build <span className="gradient-text">Smart Digital Solutions</span> for Businesses
                </motion.h1>

                <motion.p className={styles.subtitle} variants={itemVariants}>
                    NelioSoft is a team of university students creating modern websites and online solutions for growing businesses.
                </motion.p>

                <motion.div className={styles.actions} variants={itemVariants}>
                    <button className={styles.buttonPrimary} onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}>
                        View Our Work
                    </button>
                    <button className={styles.buttonSecondary} onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
                        Contact Us
                    </button>
                </motion.div>

                <motion.div
                    className={styles.scrollIndicator}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, y: [0, 10, 0] }}
                    transition={{
                        opacity: { delay: 1, duration: 1 },
                        y: { repeat: Infinity, duration: 1.5, ease: "easeInOut" }
                    }}
                >
                    <span className={styles.scrollText}>Scroll Down</span>
                    <div className={styles.mouseIcon}>
                        <div className={styles.wheel}></div>
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
}
