import React from 'react';
import styles from './Cart.module.scss'
import {CartItemComponent} from "../CartItemComponent";
import {Count} from "../Count";

export const Cart:React.FC = () => {
    return (
        <div className={styles.cart}>
            <div  className={styles.itemInfo}>
                <div className={styles.title}>
                    <h2>Your cart.</h2>
                    <p>3 items</p>
                </div>
                <div >
                    <ul className={styles.details}>
                        <li className={styles.detailsFirst}>PRODUCT DETAILS</li>
                        <li>AMOUNT</li>
                        <li>PRICE</li>
                        <li>TOTAL</li>
                    </ul>

                    <div>
                        <CartItemComponent/>
                        <Count/>
                        <p>$12.56</p>
                        <p>$24.56</p>
                    </div>
                </div>
            </div>
            <div className={styles.orderInfo}>

            </div>
        </div>
    );
};

