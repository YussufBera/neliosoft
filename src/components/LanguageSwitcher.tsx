"use client";

import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Language } from '@/lib/translations';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Check, ChevronDown } from 'lucide-react';

export default function LanguageSwitcher() {
    const { language, setLanguage } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Close when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const languages: { code: Language; label: string; sub: string }[] = [
        { code: 'EN', label: 'English', sub: 'United Kingdom' },
        { code: 'DE', label: 'Deutsch', sub: 'Deutschland' },
        { code: 'TR', label: 'Türkçe', sub: 'Türkiye' },
        { code: 'KU', label: 'Kurdî', sub: 'Kurdistan' },
    ];

    const currentLang = languages.find(l => l.code === language);

    return (
        <div className="relative z-50" ref={containerRef}>
            {/* Trigger Button - Clean, light aesthetic */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`flex items-center gap-3 px-4 py-2 rounded-xl border transition-all duration-300 outline-none
          ${isOpen
                        ? 'bg-white border-blue-200 shadow-md ring-2 ring-blue-100'
                        : 'bg-white/80 border-transparent hover:bg-white hover:shadow-sm'
                    }`}
            >
                <Globe size={18} className="text-slate-600" />
                <span className="font-outfit font-medium text-slate-700 text-sm">
                    {currentLang?.label}
                </span>
                <ChevronDown
                    size={14}
                    className={`text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                />
            </button>

            {/* Dropdown Menu - Detached card style often seen in modern UIs (Photo 3 vibe) */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.98 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute right-0 top-full mt-2 w-64 bg-white rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] border border-slate-100 p-2 overflow-hidden"
                    >
                        <div className="flex flex-col gap-1">
                            {languages.map((lang) => (
                                <button
                                    key={lang.code}
                                    onClick={() => {
                                        setLanguage(lang.code);
                                        setIsOpen(false);
                                    }}
                                    className={`group flex items-center justify-between px-3 py-3 rounded-xl transition-all duration-200 text-left
                    ${language === lang.code
                                            ? 'bg-blue-50 text-blue-700'
                                            : 'hover:bg-slate-50 text-slate-700'
                                        }`}
                                >
                                    <div className="flex flex-col">
                                        <span className="text-sm font-semibold font-outfit">
                                            {lang.label}
                                        </span>
                                        <span className={`text-xs ${language === lang.code ? 'text-blue-500' : 'text-slate-400'}`}>
                                            {lang.sub}
                                        </span>
                                    </div>

                                    {language === lang.code && (
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            className="text-blue-600"
                                        >
                                            <Check size={16} strokeWidth={3} />
                                        </motion.div>
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
