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
            {/* Video Background */}
            <div className={styles.videoBackground}>
                <video autoPlay loop muted playsInline className={styles.video}>
                    {/* Using a placeholder video - User should replace this with their preferred Pexels/Stock video */}
                    <source src="https://videos.pexels.com/video-files/3196058/3196058-uhd_2560_1440_25fps.mp4" type="video/mp4" />
                </video>
                <div className={styles.videoOverlay} />
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
                        width={130}
                        height={136}
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
                    <button className={styles.buttonSecondary} onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}>
                        {t.hero.view_work}
                    </button>
                    <button className={styles.buttonPrimary} onClick={() => window.location.href = '/get-started'}>
                        {t.hero.contact_us}
                        {/* Shimmer effect for primary button */}
                        <div className={styles.shimmer} />
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
        </section >
    );
}
