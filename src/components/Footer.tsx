import React from "react";
import styles from "./Footer.module.css";

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <p className={styles.text}>
                &copy; {new Date().getFullYear()} <span className={styles.logo}>NelioSoft</span>. All rights reserved.
            </p>
        </footer>
    );
}
