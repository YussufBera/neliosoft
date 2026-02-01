"use client";

import React from "react";
import { motion } from "framer-motion";
import styles from "./About.module.css";
import { Sparkles, Zap, DollarSign } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function About() {
    const { t } = useLanguage();

    const features = [
        { icon: <Sparkles size={28} />, label: t.about.creativity },
        { icon: <Zap size={28} />, label: t.about.innovation },
        { icon: <DollarSign size={28} />, label: t.about.affordability },
    ];

    return (
        <section className={styles.about} id="about">
            <div className={styles.container}>
                <motion.h2
                    className={styles.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    {t.about.title}
                </motion.h2>

                <motion.p
                    className={styles.description}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    {t.about.description}
                </motion.p>

                <div className={styles.features}>
                    {features.map((feature, index) => (
                        <motion.div
                            key={index} // Changed key to index as label changes
                            className={styles.feature}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: 0.3 + (index * 0.1) }}
                        >
                            <div className={styles.featureIcon}>
                                {feature.icon}
                            </div>
                            <h3 className={styles.featureTitle}>{feature.label}</h3>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
