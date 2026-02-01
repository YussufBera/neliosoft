"use client";

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Language } from '@/lib/translations';
import { motion } from 'framer-motion';

export default function LanguageSwitcher() {
    const { language, setLanguage } = useLanguage();
    const languages: Language[] = ['DE', 'EN', 'TR', 'KU'];

    return (
        <div className="flex items-center gap-4 ml-4">
            {/* Vertical Divider */}
            <div className="w-[1px] h-4 bg-white/20" />

            {/* Language Codes */}
            <div className="flex items-center gap-3">
                {languages.map((lang) => (
                    <button
                        key={lang}
                        onClick={() => setLanguage(lang)}
                        className={`relative text-xs font-bold tracking-wider transition-colors duration-200 outline-none
              ${language === lang ? 'text-[#00e0ff]' : 'text-gray-500 hover:text-gray-300'}
            `}
                    >
                        {lang}

                        {/* Subtle glow for active state */}
                        {language === lang && (
                            <motion.div
                                layoutId="active-glow"
                                className="absolute inset-0 blur-lg bg-[#00e0ff]/40"
                                transition={{ duration: 0.3 }}
                            />
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
}
