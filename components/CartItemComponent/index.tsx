import React, {ReactNode} from 'react';
import styles from "./CartItemComponent.module.scss";
import {Api} from '../../utils/api';

type CartItemComponent = {
    children: ReactNode,
    title: string,
    imageUrl: string,
    productId: number
}

export const CartItemComponent:React.FC<CartItemComponent> = ({children, title, imageUrl, productId}) => {

    const removeCartItem = async () => {
        try {

            await Api().cart.remove(productId)
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div className={styles.windowItem}>
            <img onClick={removeCartItem} className={styles.closedRed} src="headerIcon/closedRed.svg" alt=""/>
            <img  className={styles.img} src={imageUrl} alt=""/>
            <div>
                <p>{title}</p>
                {children}
            </div>
        </div>
    );
};

