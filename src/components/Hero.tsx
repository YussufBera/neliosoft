"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import styles from "./Hero.module.css";
import { ArrowRight, Mail } from "lucide-react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

export default function Hero() {
    const { t } = useLanguage();

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
                        src="/neliosoft-icon-only.png"
                        alt="NelioSoft Logo"
                        width={154}
                        height={161}
                        className={styles.heroLogo}
                        priority
                    />
                </motion.div>

                <motion.h1 className={styles.title} variants={itemVariants}>
                    {t.hero.title_prefix} <span className="gradient-text">{t.hero.title_highlight}</span> {t.hero.title_suffix}
                </motion.h1>

                <motion.p className={styles.subtitle} variants={itemVariants}>
                    {t.hero.subtitle}
                </motion.p>

                <motion.div className={styles.actions} variants={itemVariants}>
                    <button className={styles.buttonPrimary} onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}>
                        {t.hero.view_work}
                    </button>
                    <button className={styles.buttonSecondary} onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
                        {t.hero.contact_us}
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
                    <span className={styles.scrollText}>{t.hero.scroll_down}</span>
                    <div className={styles.mouseIcon}>
                        <div className={styles.wheel}></div>
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
}
