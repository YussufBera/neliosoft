"use client";

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Language } from '@/lib/translations';
import { motion, AnimatePresence } from 'framer-motion';

export default function LanguageSwitcher() {
    const { language, setLanguage } = useLanguage();
    const [isHovered, setIsHovered] = useState(false);

    // Minimal 2-letter codes, sorted so current is first when collapsed? 
    // No, keep consistent order for muscle memory.
    const languages: Language[] = ['DE', 'EN', 'TR', 'KU'];

    return (
        <div
            className="relative flex items-center z-50 h-10"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <motion.div
                layout
                className="flex items-center bg-white/40 backdrop-blur-md border border-white/30 shadow-[0_4px_20px_rgba(0,0,0,0.05)] rounded-full overflow-hidden cursor-pointer"
                initial={{ width: 44 }} // Width for single item
                animate={{
                    width: isHovered ? 'auto' : 44,
                    backgroundColor: isHovered ? 'rgba(255, 255, 255, 0.6)' : 'rgba(255, 255, 255, 0.4)'
                }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
            >
                <AnimatePresence mode='popLayout'>
                    {!isHovered ? (
                        <motion.div
                            key="collapsed-view"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 flex items-center justify-center w-[44px]"
                        >
                            <span className="font-outfit font-bold text-sm text-[#334155]">{language}</span>
                        </motion.div>
                    ) : null}

                    <motion.div
                        className="flex items-center p-1"
                        style={{ opacity: isHovered ? 1 : 0, pointerEvents: isHovered ? 'auto' : 'none' }}
                    >
                        {languages.map((lang) => (
                            <button
                                key={lang}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setLanguage(lang);
                                    setIsHovered(false);
                                }}
                                className="relative px-3 py-1.5 text-sm font-medium transition-colors outline-none z-10"
                            >
                                <span className={`relative z-10 transition-colors duration-200 ${language === lang ? 'text-white' : 'text-[#475569] hover:text-[#2563eb]'}`}>
                                    {lang}
                                </span>

                                {language === lang && (
                                    <motion.div
                                        layoutId="active-lang-pill"
                                        className="absolute inset-0 bg-[#2563eb] rounded-full shadow-sm"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                            </button>
                        ))}
                    </motion.div>
                </AnimatePresence>
            </motion.div>
        </div>
    );
}
