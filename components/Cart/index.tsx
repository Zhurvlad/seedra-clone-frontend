import React from 'react';
import styles from './Cart.module.scss'
import {CartItemComponent} from "../CartItemComponent";
import {Count} from "../Count";

export const CartComponent: React.FC = () => {
    return (
        <div className={styles.cart}>
            <div className={styles.itemInfo}>
                <div className={styles.title}>
                    <h2>Your cart.</h2>
                    <p>3 items</p>
                </div>
                <div>
                    <ul className={styles.details}>
                        <li className={styles.detailsFirst}>PRODUCT DETAILS</li>
                        <li>AMOUNT</li>
                        <li>PRICE</li>
                        <li>TOTAL</li>
                    </ul>
                    <div className={styles.cartPrice}>
                        <CartItemComponent/>
                        <div className={styles.count}>
                            <Count/>
                        </div>
                        <p className={styles.text}>$12.56</p>
                        <p className={styles.text}>$24.56</p>
                    </div>
                </div>
                <button>
                    Continue shopping
                </button>
            </div>
            <div className={styles.orderInfo}>
                <p className={styles.orderTitle}>Order summary</p>
                <div className={styles.subtitle}>
                    <p className={styles.subtitleLeft}>3 ITEMS</p>
                    <p className={styles.subtitleRight}>$12.56</p>
                </div>
                <div className={styles.shipping}>
                    <div>
                        <p >Type of delievery</p>
                        <p className={styles.shippingText}>Shipping</p>
                    </div>
                    <img src="headerIcon/arrowB.svg" alt=""/>
                </div>
                <div className={styles.promocode}>
                    <p>Promocode</p>
                    <input type="text" placeholder={'Promocode'}/>
                </div>
                <div className={styles.subtitle}>
                    <p className={styles.subtitleLeft}>Total amount</p>
                    <p className={styles.subtitleRight}>$12.56</p>
                </div>
                <div className={styles.continues}>
                    Continue
                </div>
            </div>
        </div>
    );
};

