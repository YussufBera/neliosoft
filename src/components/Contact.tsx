"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import styles from "./Contact.module.css";
import { Mail, Instagram, Send } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function Contact() {
    const { t } = useLanguage();
    const [formData, setFormData] = useState({ name: "", email: "", message: "" });
    const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('sending');
        setErrorMessage("");

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (res.ok) {
                setStatus('success');
                setFormData({ name: "", email: "", message: "" });
                setTimeout(() => setStatus('idle'), 5000);
            } else {
                setStatus('error');
                setErrorMessage(data.details || data.error || "Something went wrong");
                setTimeout(() => setStatus('idle'), 5000);
            }
        } catch (error: any) {
            console.error(error);
            setStatus('error');
            setErrorMessage(error.message || "Network Error");
            setTimeout(() => setStatus('idle'), 5000);
        }
    };

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
                        {t.contact.title}
                    </motion.h2>
                    <motion.p
                        className={styles.subtitle}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        {t.contact.subtitle}
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
                        onSubmit={handleSubmit}
                    >
                        <div className={styles.inputGroup}>
                            <input
                                type="text"
                                placeholder={t.contact.name}
                                className={styles.input}
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                            <input
                                type="email"
                                placeholder={t.contact.email}
                                className={styles.input}
                                required
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>
                        <textarea
                            placeholder={t.contact.message}
                            className={styles.textarea}
                            required
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        ></textarea>

                        <div className="flex flex-col gap-2 w-full">
                            <button
                                type="submit"
                                className={styles.submitButton}
                                disabled={status === 'sending'}
                                style={{
                                    opacity: status === 'sending' ? 0.7 : 1,
                                    cursor: status === 'sending' ? 'wait' : 'pointer'
                                }}
                            >
                                {status === 'sending' ? (
                                    <span className="flex items-center gap-2">Creating Email...</span>
                                ) : status === 'success' ? (
                                    <span className="flex items-center gap-2 text-green-400">Sent Successfully!</span>
                                ) : status === 'error' ? (
                                    <span className="flex items-center gap-2 text-red-400">Error! Try Again</span>
                                ) : (
                                    t.contact.send
                                )}
                            </button>
                            {errorMessage && (
                                <div className="text-red-500 text-sm mt-2 p-2 bg-red-100/10 rounded border border-red-500/20">
                                    Debug Error: {errorMessage}
                                </div>
                            )}
                        </div>
                    </motion.form>
                </div>
            </div>
        </section>
    );
}
