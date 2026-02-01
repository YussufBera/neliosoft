"use client";

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Language } from '@/lib/translations';

export default function LanguageSwitcher() {
    const { language, setLanguage } = useLanguage();
    const languages: Language[] = ['DE', 'EN', 'TR', 'KU'];

    return (
        <div className="flex items-center gap-1.5 ml-2">
            {languages.map((lang, index) => (
                <React.Fragment key={lang}>
                    <button
                        onClick={() => setLanguage(lang)}
                        className={`text-sm font-bold tracking-wide transition-all duration-200 outline-none
              ${language === lang
                                ? 'text-[#2563eb] scale-105' /* Active: Blue & slightly larger */
                                : 'text-gray-400 hover:text-gray-600'
                            }
            `}
                    >
                        {lang}
                    </button>

                    {/* Separator, but not after the last item */}
                    {index < languages.length - 1 && (
                        <span className="text-gray-300 font-light select-none">|</span>
                    )}
                </React.Fragment>
            ))}
        </div>
    );
}
