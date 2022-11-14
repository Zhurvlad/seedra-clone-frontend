import React from 'react';
import styles from './Header.module.scss'
import {Count} from "../Count";
import {CartItemComponent} from "../CartItemComponent";

export const Header: React.FC = () => {
    const [notNullCart, setNotNullCart] = React.useState(false)
    const [notNullFavorite, setNotNullFavorite] = React.useState(false)

    return (
        <div className={styles.header}>
            <div className={styles.headerTop}>
                <div className={styles.headerLogo}>
                    <img src='headerIcon/mainLogo.svg' alt="Logo"/>
                </div>
                <nav className={styles.menu}>
                    <ul className={styles.menuList}>
                        <li>
                            <a href="">ALL PRODUCTS</a>
                        </li>
                        <li>
                            <a href="">ABOUT SEEDRA</a>
                        </li>
                        <li>
                            <a href="">OUR BLOG</a>
                        </li>
                        <li>
                            <a href="">CONTACTS</a>
                        </li>
                    </ul>
                </nav>
                <div className={styles.headerRight}>
                    <li className={styles.headerSocial}>
                        <img src="headerIcon/facebook.svg" alt="search"/>
                        <img src="headerIcon/instagram.svg" alt="search"/>
                    </li>
                    <li className={styles.headerSearch}>
                        <input type="text" placeholder={'Search'}/>
                        <img src="headerIcon/headerSearch.svg" alt="search"/>
                    </li>
                    <li className={styles.headerCartFav}>
                        <img onClick={() => setNotNullFavorite(!notNullFavorite)}
                             src={notNullFavorite ? 'headerIcon/addedHeart.svg' : "headerIcon/nullFavorite.svg"}
                             alt="search"/>
                        <img onClick={() => setNotNullCart(!notNullCart)} className={styles.headerCart}
                             src={notNullCart ? 'headerIcon/addedCart.svg' : "headerIcon/nullCart.svg"} alt="search"/>
                    </li>
                </div>
                {notNullCart &&
                <div className={styles.windowCart}>
                    <img className={styles.closed} src="headerIcon/closed.svg" alt="closed"/>
                    <div className={styles.windowItems}>
                        <div className={styles.windowCartItem}>
                            <CartItemComponent>
                                <div className={styles.price}>
                                    <p className={styles.pack}>1 pack</p>
                                    <p className={styles.priceText}>$24.56</p>
                                </div>
                            </CartItemComponent>
                            <Count/>
                        </div>
                    </div>
                    <div className={styles.payment}>
                        <p className={styles.clear}>Clear</p>
                        <p className={styles.pay}>Proceed to payment</p>
                    </div>
                </div>
                }

            </div>
        </div>
    );
};

