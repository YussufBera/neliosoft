"use client";

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Language } from '@/lib/translations';
import { motion, AnimatePresence } from 'framer-motion';

export default function LanguageSwitcher() {
    const { language, setLanguage } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);

    const languages: { code: Language; label: string; flag: string }[] = [
        { code: 'DE', label: 'Deutsch', flag: '🇩🇪' },
        { code: 'EN', label: 'English', flag: '🇬🇧' },
        { code: 'TR', label: 'Türkçe', flag: '🇹🇷' },
        { code: 'KU', label: 'Kurdî', flag: '☀️' }, // Kurdish flag often represented with sun or generic flag if not available
    ];

    const currentLang = languages.find(l => l.code === language);

    return (
        <div className="relative" style={{ zIndex: 50 }}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all border border-white/10"
            >
                <span className="text-lg">{currentLang?.flag}</span>
                <span className="font-medium text-white text-sm">{language}</span>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.1 }}
                        className="absolute right-0 top-full mt-2 w-32 bg-[#1e1b4b]/90 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden shadow-xl"
                    >
                        {languages.map((lang) => (
                            <button
                                key={lang.code}
                                onClick={() => {
                                    setLanguage(lang.code);
                                    setIsOpen(false);
                                }}
                                className={`w-full flex items-center gap-3 px-4 py-2 hover:bg-white/10 transition-colors text-left ${language === lang.code ? 'bg-white/10 text-white' : 'text-gray-300'
                                    }`}
                            >
                                <span className="text-lg">{lang.flag}</span>
                                <span className="text-sm font-medium">{lang.label}</span>
                            </button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
