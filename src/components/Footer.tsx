"use client";

import React from "react";
import styles from "./Footer.module.css";
import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
    const { t } = useLanguage();

    return (
        <footer className={styles.footer}>
            <p className={styles.text}>
                &copy; {new Date().getFullYear()} <span className={styles.logo}>NelioSoft</span>. {t.footer.rights}
            </p>
        </footer>
    );
}
