"use client";

import React from "react";
import { motion } from "framer-motion";
import styles from "./WhyChooseUs.module.css";
import { CheckCircle, Clock, DollarSign, Code2, Smartphone, Search, Headphones, Shield } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function WhyChooseUs() {
    const { t } = useLanguage();

    const reasons = [
        { icon: <Code2 size={40} />, title: t.why_choose.modern_design, desc: t.why_choose.modern_desc },
        { icon: <Clock size={40} />, title: t.why_choose.fast_delivery, desc: t.why_choose.fast_desc },
        { icon: <DollarSign size={40} />, title: t.why_choose.affordable, desc: t.why_choose.affordable_desc },
        { icon: <CheckCircle size={40} />, title: t.why_choose.clean_code, desc: t.why_choose.clean_desc },
        { icon: <Smartphone size={40} />, title: t.why_choose.mobile_first, desc: t.why_choose.mobile_desc },
        { icon: <Search size={40} />, title: t.why_choose.seo_optimized, desc: t.why_choose.seo_desc },
        { icon: <Headphones size={40} />, title: t.why_choose.support, desc: t.why_choose.support_desc },
        { icon: <Shield size={40} />, title: t.why_choose.security, desc: t.why_choose.security_desc },
    ];

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
                    {t.why_choose.title}
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
