"use client";

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Language } from '@/lib/translations';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe } from 'lucide-react';

export default function LanguageSwitcher() {
    const { language, setLanguage } = useLanguage();
    const [isHovered, setIsHovered] = useState(false);

    const languages: { code: Language; label: string }[] = [
        { code: 'DE', label: 'Deutsch' },
        { code: 'EN', label: 'English' },
        { code: 'TR', label: 'Türkçe' },
        { code: 'KU', label: 'Kurdî' },
    ];

    return (
        <div
            className="relative z-50 flex items-center justify-center p-2"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <motion.div
                layout
                className="relative flex items-center bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.12)] rounded-full overflow-hidden cursor-pointer"
                initial={{ borderRadius: 24 }}
                animate={{
                    borderRadius: 24,
                    width: isHovered ? 'auto' : 44,
                    transition: { type: "spring", stiffness: 350, damping: 25 }
                }}
            >
                {/* Collapsed State: Globe + Current Code */}
                <AnimatePresence mode='popLayout'>
                    {!isHovered && (
                        <motion.div
                            key="collapsed"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.2 }}
                            className="absolute inset-0 flex items-center justify-center pointer-events-none"
                        >
                            <span className="font-outfit font-bold text-sm bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                {language}
                            </span>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Expanded State: List of Languages */}
                <div className="flex items-center p-1.5 gap-1">
                    {/* Placeholder to keep height when collapsed */}
                    <div className={`w-[32px] h-[32px] flex items-center justify-center transition-opacity duration-200 ${isHovered ? 'opacity-0 w-0 overflow-hidden' : 'opacity-0'}`}>
                        <Globe size={18} />
                    </div>

                    <AnimatePresence mode='wait'>
                        {isHovered && languages.map((lang) => {
                            const isActive = language === lang.code;
                            return (
                                <motion.button
                                    key={lang.code}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setLanguage(lang.code);
                                        setIsHovered(false);
                                    }}
                                    className="relative px-4 py-2 text-sm font-medium rounded-full transition-colors z-10"
                                >
                                    {/* Background Highlight */}
                                    {isActive && (
                                        <motion.div
                                            layoutId="active-pill"
                                            className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full shadow-lg"
                                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                        />
                                    )}

                                    {/* Text/Label */}
                                    <span className={`relative z-10 font-outfit tracking-wide transition-colors duration-200 ${isActive ? 'text-white font-semibold' : 'text-slate-600 hover:text-slate-900'}`}>
                                        {lang.label}
                                    </span>
                                </motion.button>
                            )
                        })}
                    </AnimatePresence>
                </div>
            </motion.div>
        </div>
    );
}
