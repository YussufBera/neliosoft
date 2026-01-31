"use client";

import React from "react";
import { motion } from "framer-motion";
import styles from "./WhyChooseUs.module.css";
import { CheckCircle, Clock, DollarSign, Code2, Smartphone } from "lucide-react";

const reasons = [
    { icon: <Code2 size={40} />, title: "Modern Design", desc: "Clean & Aesthetic" },
    { icon: <Clock size={40} />, title: "Fast Delivery", desc: "On time, every time" },
    { icon: <DollarSign size={40} />, title: "Affordable", desc: "Student-friendly rates" },
    { icon: <CheckCircle size={40} />, title: "Clean Code", desc: "Scalable & maintainable" },
    { icon: <Smartphone size={40} />, title: "Mobile First", desc: "Responsive everywhere" },
];

export default function WhyChooseUs() {
    return (
        <section className={styles.whyChooseUs}>
            <div className={styles.container}>
                <motion.h2
                    className={styles.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    Why Choose NelioSoft?
                </motion.h2>

                <div className={styles.grid}>
                    {reasons.map((item, index) => (
                        <motion.div
                            key={index}
                            className={styles.item}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                        >
                            <div className={styles.icon}>{item.icon}</div>
                            <h3 className={styles.itemTitle}>{item.title}</h3>
                            <p className={styles.itemDescription}>{item.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
