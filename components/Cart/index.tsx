import React from 'react';
import Link from "next/link";

import {useAppSelector} from '../../redux/hooks';
import {cartSelectors} from '../../redux/cartSlice';

import {CartItemComponent} from "../CartItemComponent";
import {Count} from "../Count";
import {Order} from "../Order";

import EmptyCartSVG from './clipart924544.png'

import styles from './Cart.module.scss'
import Image from "next/image";


export const CartComponent:React.FC = () => {
    const {data} = useAppSelector(cartSelectors)

    //TODO: МБ тут будет ошибка
    const totalPrice = data.items.map((m) => m.subTotalPrice ? m.subTotalPrice : 0).reduce((sum, price) => sum + price, 0)
    const totalCount = data.items.map((m) => m.quantity).reduce((sum, price) => sum + price, 0)

    return (
        <div className={styles.cart}>

            <div className={styles.itemInfo}>
                <div className={styles.title}>
                    <h2>Your cart.</h2>
                    <p>{totalCount} items</p>
                </div>
                {data.items.length !== 0 ?
                    <div>
                        <ul className={styles.details}>
                            <li className={styles.detailsFirst}>PRODUCT DETAILS</li>
                            <li>AMOUNT</li>
                            <li>PRICE</li>
                            <li>TOTAL</li>
                        </ul>
                        {data.items.map(i =>
                            <div key={i.title} className={styles.cartPrice}>
                                <CartItemComponent
                                    productId={i.productId}
                                    imageUrl={i.imageUrl}
                                    title={i.title}
                                />

                                <div className={styles.count}>
                                    <Count id={i.productId} count={i.quantity}/>
                                </div>
                                <p className={styles.text}>$ {i.price}</p>
                                <p className={styles.text}>$ {i.subTotalPrice}</p>
                            </div>)}
                    </div>
                    :
                    <div className={styles.emptyCart}>
                        <img src="https://dodopizza-a.akamaihd.net/site-static/dist/121df529925b0f43cc73.svg"
                             alt="Dog"/>
                        <h2>Oh it's empty!</h2>
                        <p>Your shopping cart is empty, add your favorite products to the cart.</p>
                    </div>
                }
                <Link href={'/'}>
                    <button>
                        Continue shopping
                    </button>
                </Link>
            </div>
            <Order
                totalCount={totalCount}
                totalPrice={totalPrice}
            />
        </div>
    );
};

