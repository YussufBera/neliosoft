"use client";

import React from "react";
import { motion } from "framer-motion";
import styles from "./Contact.module.css";
import { Mail, Instagram } from "lucide-react";

export default function Contact() {
    return (
        <section className={styles.contact} id="contact">
            <div className={styles.container}>
                <div className={styles.header}>
                    <motion.h2
                        className={styles.title}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        Get in Touch
                    </motion.h2>
                    <motion.p
                        className={styles.subtitle}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        Have a project in mind? Let's build something great together.
                    </motion.p>
                </div>

                <div className={styles.content}>
                    <motion.div
                        className={styles.info}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <div className={styles.infoItem}>
                            <Mail className={styles.icon} />
                            <a href="mailto:bera@neliosoft.com">bera@neliosoft.com</a>
                        </div>
                        <div className={styles.infoItem}>
                            <Instagram className={styles.icon} />
                            <a href="https://instagram.com/neliosoft" target="_blank" rel="noopener noreferrer">@neliosoft</a>
                        </div>
                    </motion.div>

                    <motion.form
                        className={styles.form}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        onSubmit={(e) => e.preventDefault()}
                    >
                        <div className={styles.inputGroup}>
                            <input type="text" placeholder="Name" className={styles.input} required />
                            <input type="email" placeholder="Email" className={styles.input} required />
                        </div>
                        <textarea placeholder="Message" className={styles.textarea} required></textarea>
                        <button type="submit" className={styles.submitButton}>Send Message</button>
                    </motion.form>
                </div>
            </div>
        </section>
    );
}
