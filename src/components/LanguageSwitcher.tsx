"use client";

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Language } from '@/lib/translations';

export default function LanguageSwitcher() {
    const { language, setLanguage } = useLanguage();
    const languages: Language[] = ['DE', 'EN', 'TR', 'KU'];

    return (
        <div className="flex items-center ml-6">
            {languages.map((lang, index) => (
                <button
                    key={lang}
                    onClick={() => setLanguage(lang)}
                    // Using explicit margins and a fixed width to ensure perfect alignment and spacing
                    className={`
            text-xs font-bold tracking-[0.15em] transition-all duration-300 outline-none
            ${index !== languages.length - 1 ? 'mr-6' : ''} /* explicit margin right for gap */
            ${language === lang
                            ? 'text-[#06b6d4] scale-110 drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]'
                            : 'text-slate-400 hover:text-slate-600'
                        }
          `}
                >
                    {lang}
                </button>
            ))}
        </div>
    );
}
