"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { ChevronRight, ChevronLeft, Check, Calendar, Users, Wallet, CreditCard, Scissors, Activity, Heart, Stethoscope, MoreHorizontal } from 'lucide-react';
import styles from './page.module.css';

// Define steps
type Step = 'business_type' | 'team_size' | 'budget' | 'contact';

export default function GetStartedPage() {
    const { t } = useLanguage();
    const [step, setStep] = useState<Step>('business_type');
    const [formData, setFormData] = useState({
        business_type: '',
        team_size: '',
        budget: '',
        name: '',
        email: '',
        phone: '',
        message: ''
    });
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

    // Helper components
    const SparklesIcon = ({ size, className }: { size?: number, className?: string }) => (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" /><path d="M5 3v4" /><path d="M9 3v4" /><path d="M3 9h4" /></svg>
    );

    // Business types options
    const businessTypes = [
        { id: 'barber', icon: <Scissors size={28} />, label: t.get_started.business_types.barber },
        { id: 'nail', icon: <SparklesIcon size={28} />, label: t.get_started.business_types.nail },
        { id: 'hair', icon: <Scissors size={28} className="rotate-90" />, label: t.get_started.business_types.hair },
        { id: 'beauty', icon: <Heart size={28} />, label: t.get_started.business_types.beauty },
        { id: 'sports', icon: <Activity size={28} />, label: t.get_started.business_types.sports },
        { id: 'clinic', icon: <Stethoscope size={28} />, label: t.get_started.business_types.clinic },
        { id: 'other', icon: <MoreHorizontal size={28} />, label: t.get_started.business_types.other },
    ];

    const teamSizes = [
        { id: 'small', label: t.get_started.team_sizes.small },
        { id: 'medium', label: t.get_started.team_sizes.medium },
        { id: 'large', label: t.get_started.team_sizes.large },
    ];

    const budgetRanges = [
        { id: 'basic', label: t.get_started.budget_ranges.basic },
        { id: 'standard', label: t.get_started.budget_ranges.standard },
        { id: 'premium', label: t.get_started.budget_ranges.premium },
    ];

    const handleSelection = (field: keyof typeof formData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));

        // Auto-advance
        setTimeout(() => {
            if (step === 'business_type') setStep('team_size');
            else if (step === 'team_size') setStep('budget');
            else if (step === 'budget') setStep('contact');
        }, 300);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('submitting');

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                setStatus('success');
            } else {
                setStatus('error');
            }
        } catch (error) {
            setStatus('error');
        }
    };

    const variants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 50 : -50,
            opacity: 0
        }),
        center: {
            x: 0,
            opacity: 1
        },
        exit: (direction: number) => ({
            x: direction < 0 ? 50 : -50,
            opacity: 0
        })
    };

    return (
        <div className={styles.container}>
            <div className={styles.wizardCard}>

                {/* Progress Bar */}
                <div className={styles.progressContainer}>
                    <div className={styles.progressBar}>
                        <div
                            className={styles.progressFill}
                            style={{
                                width: step === 'business_type' ? '25%' :
                                    step === 'team_size' ? '50%' :
                                        step === 'budget' ? '75%' : '100%'
                            }}
                        />
                    </div>
                </div>

                <AnimatePresence mode="wait">
                    {status === 'success' ? (
                        <motion.div
                            key="success"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className={styles.successState}
                        >
                            <div className={styles.successIcon}>
                                <Check size={48} />
                            </div>
                            <h2>{t.get_started.success_title}</h2>
                            <p>{t.get_started.success_msg}</p>
                            <button onClick={() => window.location.href = '/'} className={styles.homeButton}>
                                {t.nav.home}
                            </button>
                        </motion.div>
                    ) : (
                        <div className={styles.stepContent}>
                            {/* Step 1: Business Type */}
                            {step === 'business_type' && (
                                <motion.div
                                    key="step1"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    className={styles.stepWrapper}
                                >
                                    <h1>{t.get_started.step1_title}</h1>
                                    <div className={styles.grid}>
                                        {businessTypes.map((type) => (
                                            <button
                                                key={type.id}
                                                onClick={() => handleSelection('business_type', type.id)}
                                                className={`${styles.optionCard} ${formData.business_type === type.id ? styles.selected : ''}`}
                                            >
                                                <div className={styles.iconWrapper}>{type.icon}</div>
                                                <span>{type.label}</span>
                                            </button>
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            {/* Step 2: Team Size */}
                            {step === 'team_size' && (
                                <motion.div
                                    key="step2"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    className={styles.stepWrapper}
                                >
                                    <h1>{t.get_started.step2_title}</h1>
                                    <div className={styles.list}>
                                        {teamSizes.map((size) => (
                                            <button
                                                key={size.id}
                                                onClick={() => handleSelection('team_size', size.id)}
                                                className={`${styles.listOption} ${formData.team_size === size.id ? styles.selected : ''}`}
                                            >
                                                <Users size={24} />
                                                <span>{size.label}</span>
                                                <ChevronRight className={styles.chevron} />
                                            </button>
                                        ))}
                                    </div>
                                    <button onClick={() => setStep('business_type')} className={styles.backButton}>
                                        <ChevronLeft size={16} /> Back
                                    </button>
                                </motion.div>
                            )}

                            {/* Step 3: Budget */}
                            {step === 'budget' && (
                                <motion.div
                                    key="step3"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    className={styles.stepWrapper}
                                >
                                    <h1>{t.get_started.step3_title}</h1>
                                    <div className={styles.list}>
                                        {budgetRanges.map((range) => (
                                            <button
                                                key={range.id}
                                                onClick={() => handleSelection('budget', range.id)}
                                                className={`${styles.listOption} ${formData.budget === range.id ? styles.selected : ''}`}
                                            >
                                                <CreditCard size={24} />
                                                <span>{range.label}</span>
                                                <ChevronRight className={styles.chevron} />
                                            </button>
                                        ))}
                                    </div>
                                    <button onClick={() => setStep('team_size')} className={styles.backButton}>
                                        <ChevronLeft size={16} /> Back
                                    </button>
                                </motion.div>
                            )}

                            {/* Step 4: Contact */}
                            {step === 'contact' && (
                                <motion.div
                                    key="step4"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    className={styles.stepWrapper}
                                >
                                    <h1>{t.get_started.step4_title}</h1>
                                    <form onSubmit={handleSubmit} className={styles.form}>
                                        <input
                                            type="text"
                                            placeholder={t.contact.name}
                                            required
                                            value={formData.name}
                                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                                            className={styles.input}
                                        />
                                        <input
                                            type="email"
                                            placeholder={t.contact.email}
                                            required
                                            value={formData.email}
                                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                                            className={styles.input}
                                        />
                                        <input
                                            type="tel"
                                            placeholder={t.contact.phone}
                                            value={formData.phone}
                                            onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                            className={styles.input}
                                        />
                                        <button
                                            type="submit"
                                            className={styles.submitButton}
                                            disabled={status === 'submitting'}
                                        >
                                            {status === 'submitting' ? t.contact.sending : t.get_started.submit}
                                        </button>
                                    </form>
                                    <button onClick={() => setStep('budget')} type="button" className={styles.backButton}>
                                        <ChevronLeft size={16} /> Back
                                    </button>
                                </motion.div>
                            )}
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
