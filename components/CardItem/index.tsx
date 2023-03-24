import React from 'react';
import Link from 'next/link';

import {Api} from '../../utils/api';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {addToCart, cartSelectors, remove} from '../../redux/cartSlice';

import YellowStarSVG from './yellowStar.svg'

import styles from './CardItem.module.scss'
import {ICartDto} from "../../utils/api/types";

type CartItemProps = {
    imageUrl: string,
    price: string,
    title: string
    id: number,
}


export const CardItem= ({title, id, imageUrl, price}: CartItemProps): JSX.Element => {
    const {data} = useAppSelector(cartSelectors)
    const findItemFromCart = data.items?.some((obj) => obj.productId === id)
    const textReduction = title.length > 120 ? `${title.slice(0, 120)}  ...` : title


    const dispatch = useAppDispatch()

    const addItemToCart = async (id: number) => {
        if (!findItemFromCart) {
            const cartObj = {
                title: title,
                imageUrl: imageUrl,
                productId: id,
                price: Number(price),
                quantity: 1,

            }

            await Api().cart.addToCart(cartObj as ICartDto )
            dispatch(addToCart(cartObj as ICartDto))
        } else {
            await Api().cart.remove(id)
            dispatch(remove(id))

        }
    }

    return (
        <div  className={styles.card} >
            <div className={styles.cardItem}>
                <Link href={`/items/${id}`}>
                    <div>
                        <div className={styles.img}>
                            <img src={imageUrl} alt="Seedra Cilantro Seeds for Planting Indoor and Outdoor"/>
                        </div>
                        <h5 className={styles.text}>
                            {textReduction}
                        </h5>
                        {/*<div onClick={() => setAddedFavorite(!addedFavorite)} className={styles.heart}>
                            <img src={addedFavorite ? "headerIcon/yellowHeartAdded.svg" : "headerIcon/yellowHeart.svg"}
                                 alt=""/>
                        </div>*/}
                    </div>
                </Link>
                <div className={styles.rating}>
                    {Array(5).fill(<YellowStarSVG className={styles.yellowStar}/>)}
                    <p>(123)</p>
                </div>
                <div className={styles.p}>
                    <div className={styles.price}>
                        <p>${price}</p>
                        <div onClick={() => addItemToCart(id)} className={findItemFromCart  ? styles.active : styles.priceCart}>
                            <img src={findItemFromCart ? 'headerIcon/whiteCart.svg' : "headerIcon/cartSimple.svg"} alt="cart"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}