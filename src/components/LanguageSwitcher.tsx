"use client";

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Language } from '@/lib/translations';

export default function LanguageSwitcher() {
    const { language, setLanguage } = useLanguage();
    const languages: Language[] = ['DE', 'EN', 'TR', 'KU'];

    return (
        // un-mashed text: using style gap to guarantee spacing regardless of tailwind build
        <div className="flex items-center" style={{ display: 'flex', gap: '24px', marginLeft: '20px' }}>
            {languages.map((lang) => (
                <button
                    key={lang}
                    onClick={() => setLanguage(lang)}
                    className={`
            text-sm font-bold tracking-widest transition-all duration-300 outline-none
            ${language === lang
                            ? 'text-[#06b6d4] scale-110 drop-shadow-[0_0_10px_rgba(6,182,212,0.4)]'
                            : 'text-gray-400 hover:text-gray-600'
                        }
          `}
                    style={{ letterSpacing: '0.1em' }}
                >
                    {lang}
                </button>
            ))}
        </div>
    );
}
