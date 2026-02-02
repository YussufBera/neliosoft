"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./Contact.module.css";
import { Mail, Instagram, CheckCircle } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function Contact() {
    const { t } = useLanguage();
    // Default form data
    const [formData, setFormData] = useState({ name: "", email: "", phone: "", domain: "", message: "" });
    const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('sending');
        setErrorMessage("");

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (res.ok) {
                setStatus('success');
                setFormData({ name: "", email: "", phone: "", domain: "", message: "" });
            } else {
                setStatus('error');
                setErrorMessage(data.details || "[Server] Unknown Error");
            }
        } catch (error: any) {
            console.error(error);
            setStatus('error');
            setErrorMessage(`[Client] ${error.message || "Network Error"}`);
        }
    };

    return (
        <section className={styles.contact} id="contact">
            <div className={styles.container}>
                <div className={styles.header}>
                    <motion.h2 className={styles.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>{t.contact.title}</motion.h2>
                    <motion.p className={styles.subtitle} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}>{t.contact.subtitle}</motion.p>
                </div>

                <div className={styles.content}>
                    <motion.div className={styles.info} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}>
                        <div className={styles.infoItem}><Mail className={styles.icon} /><a href="mailto:bera@neliosoft.com">bera@neliosoft.com</a></div>
                        <div className={styles.infoItem}><Instagram className={styles.icon} /><a href="https://instagram.com/neliosoft" target="_blank" rel="noopener noreferrer">@neliosoft</a></div>
                    </motion.div>

                    <AnimatePresence mode="wait">
                        {status === 'success' ? (
                            <motion.div
                                key="success"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                className="w-full flex flex-col items-center justify-center p-10 bg-white/50 backdrop-blur-lg rounded-2xl border border-white/20 shadow-xl"
                            >
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: "spring", stiffness: 200, damping: 10, delay: 0.2 }}
                                >
                                    <CheckCircle size={80} className="text-green-500 mb-6" />
                                </motion.div>
                                <h3 className="text-2xl font-bold text-gray-800 mb-2 text-center">{t.contact.success_title}</h3>
                                <p className="text-gray-600 text-center">{t.contact.success_message}</p>
                                <button
                                    onClick={() => setStatus('idle')}
                                    className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-300"
                                >
                                    Done
                                </button>
                            </motion.div>
                        ) : (
                            <motion.form
                                key="form"
                                className={styles.form}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.5 }}
                                onSubmit={handleSubmit}
                            >
                                <div className={styles.inputGroup}>
                                    <input type="text" placeholder={t.contact.name} className={styles.input} required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                                    <input type="email" placeholder={t.contact.email} className={styles.input} required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                                </div>

                                <div className={styles.inputGroup}>
                                    <input type="tel" placeholder={t.contact.phone} className={styles.input} required value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
                                    <input type="text" placeholder={t.contact.domain} className={styles.input} value={formData.domain} onChange={(e) => setFormData({ ...formData, domain: e.target.value })} />
                                </div>

                                <textarea placeholder={t.contact.message} className={styles.textarea} required value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })}></textarea>

                                <div className="flex flex-col gap-2 w-full">
                                    <button type="submit" className={styles.submitButton} disabled={status === 'sending'} style={{ opacity: status === 'sending' ? 0.7 : 1, cursor: status === 'sending' ? 'wait' : 'pointer' }}>
                                        {status === 'sending' ? (
                                            <span className="flex items-center gap-2 justify-center">
                                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Sending...
                                            </span>
                                        ) : t.contact.send}
                                    </button>
                                    {errorMessage && (
                                        <div className="text-red-500 text-sm mt-2 p-2 bg-red-100/10 rounded border border-red-500/20">
                                            Error: {errorMessage}
                                        </div>
                                    )}
                                </div>
                            </motion.form>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}
