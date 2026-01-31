"use client";

import React, { useState, useEffect } from "react";
import styles from "./Navbar.module.css";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ""}`}>
            <div className={styles.container}>
                <Link href="/" className={styles.logo}>
                    <span className={styles.logoText}>NelioSoft</span>
                </Link>

                <ul className={styles.navLinks}>
                    <li><button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className={styles.navLink}>Home</button></li>
                    <li><button onClick={() => scrollToSection('about')} className={styles.navLink}>About</button></li>
                    <li><button onClick={() => scrollToSection('services')} className={styles.navLink}>Services</button></li>
                    <li><button onClick={() => scrollToSection('portfolio')} className={styles.navLink}>Portfolio</button></li>
                    <li><button onClick={() => scrollToSection('contact')} className={styles.navLink}>Contact</button></li>
                </ul>

                <button className={styles.mobileMenuBtn}>⋮</button>
            </div>
        </nav>
    );
}
