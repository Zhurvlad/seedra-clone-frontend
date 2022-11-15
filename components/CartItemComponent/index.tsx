import React from 'react';
import styles from "./CartItemComponent.module.scss";

type CartItemComponent = {
    children: Element,

}

export const CartItemComponent:React.FC<CartItemComponent> = ({children}) => {
    return (
        <div className={styles.windowItem}>
            <img className={styles.closedRed} src="headerIcon/closedRed.svg" alt=""/>
            <img src="body/smalImg.png" alt=""/>
            <div>
                <p>SEEDRA Corn - Bodacious Hybrid Seeds for Indoor and Outdoor Planting</p>
                {children}
            </div>
        </div>
    );
};

