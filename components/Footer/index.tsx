import React from 'react';
import styles from "./Footer.module.scss";

export const Footer = () => {
    return (
        <div className={styles.footer}>
            <div className={styles.footerTop}>
                <nav className={styles.menu}>
                    <ul className={styles.menuList}>
                        <li className={styles.mr}>
                            <a href="">ALL PRODUCTS</a>
                        </li>
                        <li className={styles.mr}>
                            <a href="">ABOUT SEEDRA</a>
                        </li>
                        <li>
                            <a href="">OUR BLOG</a>
                        </li>

                    </ul>
                </nav>
                <div className={styles.headerLogo}>
                    <img src='headerIcon/mainLogo.svg' alt="Logo"/>
                </div>
                <nav className={styles.menu}>
                    <ul className={styles.menuList}>
                        <li className={styles.mr}>
                            <a href="">Terms&Conditions</a>
                        </li>
                        <li >
                            <a href="">Privacy Policy</a>
                        </li>
                    </ul>
                </nav>
            </div>
            <div className={styles.footerBot}>
                <li className={styles.headerSocial}>
                    <img src="headerIcon/facebookGreen.svg" alt="search"/>
                    <img src="headerIcon/instaGreen.svg" alt="search"/>
                </li>
                <div className={styles.copyright}>
                    <div >
                        <p>All rights reserved</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

