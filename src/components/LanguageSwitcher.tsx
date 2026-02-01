"use client";

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Language } from '@/lib/translations';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, ChevronDown } from 'lucide-react';

export default function LanguageSwitcher() {
    const { language, setLanguage } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);

    const languages: { code: Language; label: string }[] = [
        { code: 'DE', label: 'Deutsch' },
        { code: 'EN', label: 'English' },
        { code: 'TR', label: 'Türkçe' },
        { code: 'KU', label: 'Kurdî' },
    ];

    return (
        <div className="relative z-50">
            {/* Trigger Button - Dark Glass Capsule (Makas Style Vibe) */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`flex items-center gap-2.5 px-5 py-2.5 rounded-full transition-all duration-300 outline-none
          ${isOpen
                        ? 'bg-[#1a1a1a] text-white shadow-2xl scale-105 ring-2 ring-white/10'
                        : 'bg-[#0f0f0f] text-gray-300 hover:bg-black hover:text-white hover:scale-105 hover:shadow-xl'
                    } border border-white/5 backdrop-blur-md`}
            >
                <Globe size={16} className={`${isOpen ? 'text-blue-400' : 'text-gray-400 group-hover:text-white'} transition-colors`} />

                <div className="flex flex-col items-start leading-none gap-0.5">
                    <span className="font-outfit font-bold text-sm tracking-wide">
                        {language}
                    </span>
                </div>

                <ChevronDown
                    size={14}
                    className={`text-gray-500 transition-transform duration-300 ${isOpen ? 'rotate-180 text-white' : ''}`}
                />
            </button>

            {/* Dropdown Menu - Premium Dark Glass Card */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95, filter: "blur(10px)" }}
                        animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                        exit={{ opacity: 0, y: 10, scale: 0.95, filter: "blur(10px)" }}
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        className="absolute right-0 top-full mt-3 w-40 bg-[#0a0a0a]/95 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-[0_20px_50px_-10px_rgba(0,0,0,0.5)] overflow-hidden p-1.5"
                    >
                        <div className="flex flex-col gap-0.5">
                            {languages.map((lang) => (
                                <button
                                    key={lang.code}
                                    onClick={() => {
                                        setLanguage(lang.code);
                                        setIsOpen(false);
                                    }}
                                    className={`relative flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-200 group w-full text-left
                    ${language === lang.code
                                            ? 'bg-white/10 text-white'
                                            : 'text-gray-400 hover:text-white hover:bg-white/5'
                                        }`}
                                >
                                    <span className="font-outfit font-medium text-sm z-10">{lang.label}</span>
                                    <span className="font-mono text-[10px] uppercase opacity-40 z-10">{lang.code}</span>

                                    {language === lang.code && (
                                        <motion.div
                                            layoutId="active-lang-glow"
                                            className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-xl"
                                            initial={false}
                                            transition={{ duration: 0.3 }}
                                        />
                                    )}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
