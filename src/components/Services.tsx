"use client";

import React from "react";
import { motion } from "framer-motion";
import styles from "./Services.module.css";
import { Monitor, Briefcase, Code } from "lucide-react";

const services = [
    {
        title: "Website Design & Development",
        description: "Custom-built websites that look great on any device. We focus on speed, design, and user experience.",
        icon: <Monitor size={32} />
    },
    {
        title: "Business Websites",
        description: "Professional digital presence for small and medium businesses to attract customers and build trust.",
        icon: <Briefcase size={32} />
    },
    {
        title: "Custom Online Solutions",
        description: "From simple landing pages to complex web applications, we build solutions tailored to your unique needs.",
        icon: <Code size={32} />
    }
];

export default function Services() {
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
                        What We Do
                    </motion.h2>
                    <motion.p
                        className={styles.subtitle}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        Comprehensive digital services for forward-thinking businesses.
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
