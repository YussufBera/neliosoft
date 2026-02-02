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
    const [debugLog, setDebugLog] = useState<string[]>([]);

    const addLog = (msg: string) => setDebugLog(prev => [...prev, msg]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('sending');
        setDebugLog([]);

        try {
            addLog("Step 1: Starting submit");

            const payload = JSON.stringify(formData);
            addLog("Step 2: Payload created");

            addLog("Step 3: Initiating Fetch");
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: payload,
            });

            addLog(`Step 4: Response received (Status: ${res.status})`);

            addLog("Step 5: Parsing JSON");
            // Clone response to try text if json fails
            const resClone = res.clone();
            let data;
            try {
                data = await res.json();
                addLog("Step 6: JSON Parsed");
            } catch (jsonErr) {
                const text = await resClone.text();
                addLog(`Step 6 Error: JSON Parse Failed. Raw Text: ${text.substring(0, 50)}...`);
                throw new Error("Invalid JSON response from server");
            }

            if (res.ok) {
                setStatus('success');
                setFormData({ name: "", email: "", message: "" });
                addLog("Success!");
                setTimeout(() => setStatus('idle'), 5000);
            } else {
                setStatus('error');
                addLog(`Server Error: ${data.details || data.error}`);
            }
        } catch (error: any) {
            console.error(error);
            setStatus('error');
            addLog(`[Client Exception] ${error.message} (Name: ${error.name})`);
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

                    <motion.form className={styles.form} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }} onSubmit={handleSubmit}>
                        <div className={styles.inputGroup}>
                            <input type="text" placeholder={t.contact.name} className={styles.input} required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                            <input type="email" placeholder={t.contact.email} className={styles.input} required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                        </div>
                        <textarea placeholder={t.contact.message} className={styles.textarea} required value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })}></textarea>

                        <div className="flex flex-col gap-2 w-full">
                            <button type="submit" className={styles.submitButton} disabled={status === 'sending'} style={{ opacity: status === 'sending' ? 0.7 : 1, cursor: status === 'sending' ? 'wait' : 'pointer' }}>
                                {status === 'sending' ? "Checking..." : status === 'success' ? "Success!" : status === 'error' ? "Error" : t.contact.send}
                            </button>
                            {/* Detailed Debug Log */}
                            {debugLog.length > 0 && (
                                <div className="text-xs mt-2 p-2 bg-black/80 text-green-400 font-mono rounded border border-green-500/20 w-full overflow-hidden">
                                    <p className="font-bold border-b border-green-500/30 mb-1 pb-1">Debug Output:</p>
                                    {debugLog.map((log, i) => (
                                        <div key={i}>{log}</div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </motion.form>
                </div>
            </div>
        </section>
    );
}
