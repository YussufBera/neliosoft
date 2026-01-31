"use client";

import React from "react";
import { motion } from "framer-motion";
import styles from "./About.module.css";
import { Sparkles, Zap, DollarSign } from "lucide-react";

export default function About() {
    const features = [
        { icon: <Sparkles size={28} />, label: "Creativity" },
        { icon: <Zap size={28} />, label: "Innovation" },
        { icon: <DollarSign size={28} />, label: "Affordability" },
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
                    Who We Are
                </motion.h2>

                <motion.p
                    className={styles.description}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    We are a group of passionate <span className={styles.highlight}>university students</span> focused on designing and developing modern, fast, and user-friendly websites for businesses. We bring fresh perspectives and the latest technologies to help you grow online.
                </motion.p>

                <div className={styles.features}>
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.label}
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
