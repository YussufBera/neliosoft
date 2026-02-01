"use client";

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Language } from '@/lib/translations';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Globe } from 'lucide-react';

export default function LanguageSwitcher() {
    const { language, setLanguage } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);

    // Removed flags, keeping a clean list
    const languages: { code: Language; label: string }[] = [
        { code: 'DE', label: 'Deutsch' },
        { code: 'EN', label: 'English' },
        { code: 'TR', label: 'Türkçe' },
        { code: 'KU', label: 'Kurdî' },
    ];

    return (
        <div className="relative" style={{ zIndex: 50 }}>
            {/* Trigger Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="group flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 outline-none hover:border-white/20 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]"
            >
                <Globe size={16} className="text-gray-300 group-hover:text-white transition-colors" />
                <span className="font-outfit font-medium text-sm text-gray-200 group-hover:text-white tracking-wide">
                    {language}
                </span>
                <ChevronDown
                    size={14}
                    className={`text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                />
            </button>

            {/* Dropdown Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95, filter: "blur(10px)" }}
                        animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                        exit={{ opacity: 0, y: 10, scale: 0.95, filter: "blur(10px)" }}
                        transition={{ duration: 0.2, ease: "circOut" }}
                        className="absolute right-0 top-full mt-3 w-36 bg-[#0f0e24]/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
                    >
                        <div className="flex flex-col p-1.5 gap-0.5">
                            {languages.map((lang) => (
                                <button
                                    key={lang.code}
                                    onClick={() => {
                                        setLanguage(lang.code);
                                        setIsOpen(false);
                                    }}
                                    className={`relative w-full flex items-center justify-between px-3 py-2 rounded-xl transition-all duration-200 group ${language === lang.code
                                            ? 'bg-white/10 text-white shadow-inner'
                                            : 'text-gray-400 hover:text-white hover:bg-white/5'
                                        }`}
                                >
                                    <span className="text-xs font-semibold tracking-wider font-outfit">{lang.label}</span>
                                    <span className="text-[10px] opacity-50 font-mono uppercase">{lang.code}</span>

                                    {/* Active Indicator Dot */}
                                    {language === lang.code && (
                                        <motion.div
                                            layoutId="activeLang"
                                            className="absolute left-1 w-1 h-3 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]"
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
