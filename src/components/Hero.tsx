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

    const [currentVideo, setCurrentVideo] = React.useState(0);
    const videos = [
        "https://assets.mixkit.co/videos/24875/24875-720.mp4", // Barber/Hair
        "https://assets.mixkit.co/videos/15804/15804-720.mp4", // Salon/Spa
        "https://assets.mixkit.co/videos/39480/39480-720.mp4", // Office/Reservation
        "https://assets.mixkit.co/videos/16325/16325-720.mp4"  // Clinic/Doctor
    ];

    React.useEffect(() => {
        const timer = setInterval(() => {
            setCurrentVideo((prev) => (prev + 1) % videos.length);
        }, 8000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className={styles.hero}>
            {/* Video Background */}
            <div className={styles.videoBackground}>
                {videos.map((src, index) => (
                    <video
                        key={src}
                        src={src}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className={styles.video}
                        style={{
                            opacity: index === currentVideo ? 0.35 : 0,
                            transition: 'opacity 1.5s ease-in-out',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            zIndex: index === currentVideo ? 1 : 0
                        }}
                    />
                ))}
                <div className={styles.videoOverlay} style={{ zIndex: 2 }} />
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
