"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { translations, Language } from '@/lib/translations';

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: typeof translations['EN'];
    isTransitioning: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
    const [language, setLanguage] = useState<Language>('DE'); // Default to DE
    const [isTransitioning, setIsTransitioning] = useState(false);

    useEffect(() => {
        const savedLang = localStorage.getItem('language') as Language;
        if (savedLang && ['DE', 'EN', 'TR', 'KU'].includes(savedLang)) {
            setLanguage(savedLang);
        }
    }, []);

    const handleSetLanguage = (lang: Language) => {
        if (lang === language) return;

        // 1. Start transition immediately
        setIsTransitioning(true);

        // 2. Wait for cover to appear (300ms matches animation in PageTransition)
        setTimeout(() => {
            setLanguage(lang);
            localStorage.setItem('language', lang);

            // 3. Keep cover for a moment, then release (total 1000ms hold)
            setTimeout(() => {
                setIsTransitioning(false);
            }, 700);
        }, 300);
    };

    const value = {
        language,
        setLanguage: handleSetLanguage,
        t: translations[language],
        isTransitioning
    };

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};
