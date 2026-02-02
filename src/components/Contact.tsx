"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./Contact.module.css";
import { Mail, Instagram, CheckCircle } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function Contact() {
    const { t } = useLanguage();
    // Default form data
    const [formData, setFormData] = useState({ name: "", email: "", phone: "", countryCode: "+90", message: "" });
    const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState("");

    const countryCodes = [
        { code: "+90", label: "TR (+90)" },
        { code: "+49", label: "DE (+49)" },
        { code: "+44", label: "UK (+44)" },
        { code: "+1", label: "US (+1)" },
        { code: "+33", label: "FR (+33)" },
        { code: "+31", label: "NL (+31)" },
        { code: "+964", label: "IQ (+964)" },
    ];

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
                setFormData({ name: "", email: "", phone: "", countryCode: "+90", message: "" });
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
                                transition={{ type: "spring", bounce: 0.5 }}
                                className="w-full flex flex-col items-center justify-center p-12 bg-white rounded-3xl shadow-xl min-h-[400px] border border-slate-100"
                            >
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 260,
                                        damping: 20,
                                        delay: 0.1
                                    }}
                                    className="relative mb-8"
                                >
                                    {/* Ripple Effect */}
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.5 }}
                                        animate={{ opacity: 0, scale: 2 }}
                                        transition={{
                                            duration: 1.5,
                                            repeat: Infinity,
                                            delay: 0.5
                                        }}
                                        className="absolute inset-0 bg-blue-500 rounded-full blur-xl opacity-20"
                                    />

                                    {/* Modern Gradient Checkmark */}
                                    <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
                                        <CheckCircle className="text-white w-12 h-12" strokeWidth={3} />
                                    </div>
                                </motion.div>

                                <motion.h3
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                    className="text-3xl font-bold text-slate-800 mb-3 text-center"
                                >
                                    {t.contact.success_title}
                                </motion.h3>

                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.4 }}
                                    className="text-slate-500 text-center max-w-sm leading-relaxed mb-8"
                                >
                                    {t.contact.success_message}
                                </motion.p>

                                <motion.button
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 }}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setStatus('idle')}
                                    className={styles.submitButton}
                                    style={{ alignSelf: 'center', marginTop: '10px' }}
                                >
                                    {t.contact.send_new}
                                </motion.button>
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

                                <div className={styles.inputGroup} style={{ gridTemplateColumns: "1fr 2fr" }}>
                                    <select
                                        className={styles.input}
                                        value={formData.countryCode}
                                        onChange={(e) => setFormData({ ...formData, countryCode: e.target.value })}
                                    >
                                        {countryCodes.map((c) => (
                                            <option key={c.code} value={c.code}>{c.label}</option>
                                        ))}
                                    </select>
                                    <input type="tel" placeholder={t.contact.phone} className={styles.input} required value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
                                </div>

                                <textarea placeholder={t.contact.message} className={styles.textarea} required value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })}></textarea>

                                <div className="flex flex-col gap-2 w-full">
                                    <button
                                        type="submit"
                                        className={`${styles.submitButton} flex items-center justify-center gap-3`}
                                        disabled={status === 'sending'}
                                        style={{
                                            opacity: status === 'sending' ? 0.9 : 1,
                                            cursor: status === 'sending' ? 'wait' : 'pointer',
                                            paddingRight: status === 'sending' ? '40px' : '32px', // Slight expansion visualisation
                                            minWidth: '180px' // Prevent shrinking
                                        }}
                                    >
                                        {status === 'sending' ? (
                                            <>
                                                <span>{t.contact.sending}</span>
                                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            </>
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
