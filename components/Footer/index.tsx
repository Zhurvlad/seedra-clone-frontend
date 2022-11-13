import React from 'react';
import styles from "./Footer.module.scss";

export const Footer = () => {
    return (
        <div className={styles.footer}>
            <nav className={styles.menu}>
                <ul className={styles.menuList}>
                    <li>ALL PRODUCTS</li>
                    <li>ABOUT SEEDRA</li>
                    <li>OUR BLOG</li>

                </ul>
            </nav>
            <div className={styles.headerLogo}>
                <img src='headerIcon/mainLogo.svg' alt="Logo"/>
            </div>
            <nav className={styles.menu}>
                <ul className={styles.menuList}>
                    <li>Terms&Conditions</li>
                    <li>Privacy Policy</li>
                </ul>
            </nav>
        </div>
    );
};

