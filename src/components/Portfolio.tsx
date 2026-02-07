"use client";

import React from "react";
import { motion } from "framer-motion";
import styles from "./Portfolio.module.css";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

export default function Portfolio() {
    const { t } = useLanguage();

    const projects = [
        {
            title: t.portfolio.project_barber,
            category: t.portfolio.cat_appointment,
            link: "https://berber.neliosoft.com",
            image: "/barber-preview-v3.png"
        },
        {
            title: t.portfolio.project_nail,
            category: t.portfolio.cat_appointment,
            link: "https://nail.neliosoft.com",
            image: "/nail-refreshed.png"
        },
    ];

    return (
        <section className={styles.portfolio} id="portfolio">
            <div className={styles.container}>
                <div className={styles.header}>
                    <motion.h2
                        className={styles.title}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        {t.portfolio.title}
                    </motion.h2>
                    <motion.p
                        className={styles.subtitle}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        {t.portfolio.subtitle}
                    </motion.p>
                </div>

                <div className={styles.grid}>
                    {projects.map((project, index) => (
                        <motion.a
                            href={project.link}
                            target={project.link !== "#" ? "_blank" : "_self"}
                            rel="noopener noreferrer"
                            key={index}
                            className={styles.card}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                        >
                            <div className={styles.imageWrapper}>
                                {project.image ? (
                                    <Image
                                        src={project.image}
                                        alt={project.title}
                                        fill
                                        className={styles.projectImage}
                                    />
                                ) : (
                                    <div className={styles.imagePlaceholder}>
                                        {project.category}
                                    </div>
                                )}
                            </div>
                            <div className={styles.cardContent}>
                                <p className={styles.cardCategory}>{project.category}</p>
                                <h3 className={styles.cardTitle}>{project.title}</h3>
                            </div>
                        </motion.a>
                    ))}
                </div>

                <motion.p
                    className={styles.instruction}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                >
                    {t.portfolio.instruction}
                </motion.p>
            </div>
        </section>
    );
}
