"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { ChevronRight, ChevronLeft, Check, Calendar, Users, Wallet, CreditCard, Scissors, Activity, Heart, Stethoscope, MoreHorizontal, Building, Store } from 'lucide-react';
import styles from './page.module.css';

// Define steps
type Step = 'business_type' | 'business_name' | 'team_size' | 'daily_visitors' | 'budget' | 'contact';

export default function GetStartedPage() {
    const { t } = useLanguage();
    const [step, setStep] = useState<Step>('business_type');
    const [formData, setFormData] = useState({
        business_type: '',
        business_name: '',
        team_size: '',
        daily_visitors: '',
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

    // Options
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

    const visitorRanges = [
        { id: 'low', label: t.get_started.visitor_ranges.low },
        { id: 'medium', label: t.get_started.visitor_ranges.medium },
        { id: 'high', label: t.get_started.visitor_ranges.high },
    ];

    const budgetRanges = [
        { id: 'basic', label: t.get_started.budget_ranges.basic },
        { id: 'standard', label: t.get_started.budget_ranges.standard },
        { id: 'premium', label: t.get_started.budget_ranges.premium },
    ];

    const handleSelection = (field: keyof typeof formData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));

        // Auto-advance logic
        setTimeout(() => {
            if (field === 'business_type') setStep('business_name');
            else if (field === 'team_size') setStep('daily_visitors');
            else if (field === 'daily_visitors') setStep('budget');
            else if (field === 'budget') setStep('contact');
        }, 300);
    };

    const handleBusinessNameSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.business_name.trim()) {
            setStep('team_size');
        }
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

    const styles_progressBar = {
        width: step === 'business_type' ? '16%' :
            step === 'business_name' ? '33%' :
                step === 'team_size' ? '50%' :
                    step === 'daily_visitors' ? '66%' :
                        step === 'budget' ? '83%' : '100%'
    };

    return (
        <div className={styles.container}>
            <div className={styles.wizardCard}>

                {/* Progress Bar */}
                <div className={styles.progressContainer}>
                    <div className={styles.progressBar}>
                        <div className={styles.progressFill} style={styles_progressBar} />
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

                            {/* Step 2: Business Name */}
                            {step === 'business_name' && (
                                <motion.div
                                    key="step2"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    className={styles.stepWrapper}
                                >
                                    <h1>{t.get_started.step2_title}</h1>
                                    <form onSubmit={handleBusinessNameSubmit} className={styles.form}>
                                        <div className={styles.inputIconWrapper}>
                                            <Store className={styles.inputIcon} size={20} />
                                            <input
                                                type="text"
                                                placeholder={t.get_started.business_name_placeholder}
                                                autoFocus
                                                required
                                                value={formData.business_name}
                                                onChange={e => setFormData({ ...formData, business_name: e.target.value })}
                                                className={styles.inputWithIcon}
                                            />
                                        </div>
                                        <button type="submit" className={styles.submitButton}>
                                            Next <ChevronRight size={16} />
                                        </button>
                                    </form>
                                    <button onClick={() => setStep('business_type')} className={styles.backButton}>
                                        <ChevronLeft size={16} /> Back
                                    </button>
                                </motion.div>
                            )}

                            {/* Step 3: Team Size */}
                            {step === 'team_size' && (
                                <motion.div
                                    key="step3"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    className={styles.stepWrapper}
                                >
                                    <h1>{t.get_started.step3_title}</h1>
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
                                    <button onClick={() => setStep('business_name')} className={styles.backButton}>
                                        <ChevronLeft size={16} /> Back
                                    </button>
                                </motion.div>
                            )}

                            {/* Step 4: Daily Visitors */}
                            {step === 'daily_visitors' && (
                                <motion.div
                                    key="step4"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    className={styles.stepWrapper}
                                >
                                    <h1>{t.get_started.step4_title}</h1>
                                    <div className={styles.list}>
                                        {visitorRanges.map((range) => (
                                            <button
                                                key={range.id}
                                                onClick={() => handleSelection('daily_visitors', range.id)}
                                                className={`${styles.listOption} ${formData.daily_visitors === range.id ? styles.selected : ''}`}
                                            >
                                                <Activity size={24} />
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

                            {/* Step 5: Budget */}
                            {step === 'budget' && (
                                <motion.div
                                    key="step5"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    className={styles.stepWrapper}
                                >
                                    <h1>{t.get_started.step5_title}</h1>
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
                                    <button onClick={() => setStep('daily_visitors')} className={styles.backButton}>
                                        <ChevronLeft size={16} /> Back
                                    </button>
                                </motion.div>
                            )}

                            {/* Step 6: Contact */}
                            {step === 'contact' && (
                                <motion.div
                                    key="step6"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    className={styles.stepWrapper}
                                >
                                    <h1>{t.get_started.step6_title}</h1>
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
                                        {status === 'error' && (
                                            <p className={styles.errorMessage}>
                                                Something went wrong. Please try again or contact us directly.
                                            </p>
                                        )}
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
