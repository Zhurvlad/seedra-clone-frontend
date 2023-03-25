import React from "react";

import styles from "../Cart/Cart.module.scss";

import ArrowBSVG from "./arrowB.svg";


interface OrderProps {
    totalCount: number,
    totalPrice: number

}

export const Order:React.FC<OrderProps> = ({totalPrice, totalCount}) => {

    return (
        <div className={styles.orderInfo}>
            <p className={styles.orderTitle}>Order summary</p>
            <div className={styles.subtitle}>
                <p className={styles.subtitleLeft}>{totalCount} ITEMS</p>
                <p className={styles.subtitleRight}>$ {totalPrice}</p>
            </div>
            <div className={styles.shipping}>
                <div>
                    <p >Type of delivery</p>
                    <p className={styles.shippingText}>Shipping</p>
                </div>
                <ArrowBSVG className={styles.arrowB}/>

            </div>
            <div className={styles.promoCodes}>
                <p>Promocode</p>
                <input type="text" placeholder={'Promocode'}/>
            </div>
            <div className={styles.subtitle}>
                <p className={styles.subtitleLeft}>Total amount</p>
                <p className={styles.subtitleRight}>$ {totalPrice}</p>
            </div>
            <div className={styles.continues}>
                Continue
            </div>
        </div>
    )
}