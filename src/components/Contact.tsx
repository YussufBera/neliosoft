"use client";

import React from "react";
import { motion } from "framer-motion";
import styles from "./Contact.module.css";
import { useLanguage } from "@/context/LanguageContext";
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";

export default function Contact() {
    const { t } = useLanguage();

    return (
        <section id="contact" className={styles.contact}>
            <div className={styles.container}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className={styles.header}
                >
                    <h2 className={styles.title}>{t.contact.title}</h2>
                    <p className={styles.subtitle}>{t.contact.subtitle}</p>
                </motion.div>

                <div className={styles.content}>
                    <div className={styles.infoCard}>
                        <div className={styles.infoItem}>
                            <div className={styles.iconBox}>
                                <Mail size={24} />
                            </div>
                            <div>
                                <h3>Email</h3>
                                <a href="mailto:contact@neliosoft.com">contact@neliosoft.com</a>
                            </div>
                        </div>

                        <div className={styles.infoItem}>
                            <div className={styles.iconBox}>
                                <Phone size={24} />
                            </div>
                            <div>
                                <h3>Phone</h3>
                                <a href="tel:+49123456789">+49 123 456 789</a>
                            </div>
                        </div>

                        <div className={styles.infoItem}>
                            <div className={styles.iconBox}>
                                <MapPin size={24} />
                            </div>
                            <div>
                                <h3>Location</h3>
                                <p>Germany & Turkey</p>
                            </div>
                        </div>
                    </div>

                    <div className={styles.ctaBox}>
                        <h3>Ready to modernize your business?</h3>
                        <button className={styles.ctaButton} onClick={() => window.location.href = '/get-started'}>
                            {t.hero.contact_us} <ArrowRight size={20} />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
