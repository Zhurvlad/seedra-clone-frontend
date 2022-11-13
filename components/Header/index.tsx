import React from 'react';
import styles from './Header.module.scss'

export const Header:React.FC = () => {
    return (
        <div className={styles.header}>
                <div className={styles.headerTop}>
                    <div className={styles.headerLogo}>
                        <img src='headerIcon/mainLogo.svg' alt="Logo"/>
                    </div>
                    <nav className={styles.menu}>
                        <ul className={styles.menuList}>
                            <li>ALL PRODUCTS</li>
                            <li>ABOUT SEEDRA</li>
                            <li>OUR BLOG</li>
                            <li>CONTACTS</li>
                        </ul>
                    </nav>
                    <div className={styles.headerRight}>
                        <li className={styles.headerSocial}>
                            <img src="headerIcon/facebook.svg" alt="search"/>
                            <img  src="headerIcon/instagram.svg" alt="search"/>
                        </li>
                        <li className={styles.headerSearch}>
                            <input type="text" placeholder={'Search'}/>
                            <img src="headerIcon/headerSearch.svg" alt="search"/>
                        </li>
                        <li className={styles.headerCartFav}>
                            <img  src="headerIcon/headerHeart.svg" alt="search"/>
                            <img className={styles.headerCart} src="headerIcon/headerCart.svg" alt="search"/>
                        </li>
                    </div>
                </div>
        </div>
    );
};

