import React from 'react';
import styles from "./CartItemComponent.module.scss";


export const CartItemComponent:React.FC = ({children}) => {
    return (
        <div className={styles.windowItem}>
            <img src="body/smalImg.png" alt=""/>
            <div>
                <p>SEEDRA Corn - Bodacious Hybrid Seeds for Indoor and Outdoor Planting</p>
                {children}
            </div>
        </div>
    );
};

