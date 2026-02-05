"use client";

import React from "react";
import { motion } from "framer-motion";
import styles from "./Services.module.css";
import { Calendar, Scissors, Sparkles } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function Services() {
    const { t } = useLanguage();

    const services = [
        {
            title: t.services.design_title,
            description: t.services.design_desc,
            icon: <Calendar size={32} />
        },
        {
            title: t.services.business_title,
            description: t.services.business_desc,
            icon: <Scissors size={32} />
        },
        {
            title: t.services.solutions_title,
            description: t.services.solutions_desc,
            icon: <Sparkles size={32} />
        }
    ];

    return (
        <section className={styles.services} id="services">
            <div className={styles.container}>
                <div className={styles.header}>
                    <motion.h2
                        className={styles.title}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        {t.services.title}
                    </motion.h2>
                    <motion.p
                        className={styles.subtitle}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        {t.services.subtitle}
                    </motion.p>
                </div>

                <div className={styles.grid}>
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            className={styles.card}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <div className={styles.iconWrapper}>
                                {service.icon}
                            </div>
                            <h3 className={styles.cardTitle}>{service.title}</h3>
                            <p className={styles.cardDescription}>{service.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
