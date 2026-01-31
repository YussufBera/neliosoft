"use client";

import React from "react";
import { motion } from "framer-motion";
import styles from "./Portfolio.module.css";
import Image from "next/image";

const projects = [
    {
        title: "Transfer Services",
        category: "Tourism & Travel Application",
        link: "https://www.get4trip.com",
        image: "/get4trip-preview.png"
    },
    {
        title: "Barber Reservation System",
        category: "Online Appointment Platform",
        link: "https://berber-pi.vercel.app",
        image: "/barber-preview-v2.png"
    },
    {
        title: "Migration Consultancy Service",
        category: "Educational Consultancy Platform",
        link: "https://easygoc.com",
        image: "/easygoc-preview-v2.png"
    },
];

export default function Portfolio() {
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
                        Our Work
                    </motion.h2>
                    <motion.p
                        className={styles.subtitle}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        Recent projects we've crafted for our clients.
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
                    Click on the sites to visit them
                </motion.p>
            </div>
        </section>
    );
}
