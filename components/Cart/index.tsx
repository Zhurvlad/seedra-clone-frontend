import React from 'react';
import styles from './Cart.module.scss'
import {CartItemComponent} from "../CartItemComponent";
import {Count} from "../Count";
import {useAppSelector} from '../../redux/hooks';
import {cartSelectors} from '../../redux/cartSlice';

interface CartComponentProps {
    items: any
}

export const CartComponent: React.FC<CartComponentProps> = ({items}) => {
    console.log(items, 0)

    const {data} = useAppSelector(cartSelectors)


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
                    {data.items?.map(i =>
                        <div key={i.title} className={styles.cartPrice}>
                            <CartItemComponent productId={i.productId} imageUrl={i.imageUrl} title={i.title}/>
                            <div className={styles.count}>
                                <Count count = {i.quantity}/>
                            </div>
                            <p className={styles.text}>$ {i.price}</p>
                            <p className={styles.text}>$ {i.subTotalPrice}</p>
                        </div>)}
                </div>
                <button>
                    Continue shopping
                </button>
            </div>
            <div className={styles.orderInfo}>
                <p className={styles.orderTitle}>Order summary</p>
                <div className={styles.subtitle}>
                    <p className={styles.subtitleLeft}>3 ITEMS</p>
                    <p className={styles.subtitleRight}>$ {data.totalPrice}</p>
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
                    <p className={styles.subtitleRight}>$ {data.totalPrice}</p>
                </div>
                <div className={styles.continues}>
                    Continue
                </div>
            </div>
        </div>
    );
};

