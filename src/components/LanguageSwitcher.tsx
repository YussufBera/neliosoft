"use client";

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Language } from '@/lib/translations';

export default function LanguageSwitcher() {
    const { language, setLanguage } = useLanguage();
    const languages: Language[] = ['DE', 'EN', 'TR', 'KU'];

    return (
        <div className="flex items-center gap-6 ml-4">
            {languages.map((lang) => (
                <button
                    key={lang}
                    onClick={() => setLanguage(lang)}
                    className={`text-sm font-bold tracking-widest transition-colors duration-200 outline-none
            ${language === lang
                            ? 'text-[#06b6d4]' /* Cyan-500: Closest readable match to reference on light bg */
                            : 'text-gray-400 hover:text-gray-600'
                        }
          `}
                >
                    {lang}
                </button>
            ))}
        </div>
    );
}
