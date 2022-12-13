import React from 'react';
import s from './body/sliderImage.png'
import styles from './CardItem.module.scss'
import axios from 'axios';
import {CartApi} from '../../utils/api/cart';
import {Api} from '../../utils/api';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {itemsSelectors} from '../../redux/itemsSlice';
import {addToCart, cartSelectors, remove} from '../../redux/cartSlice';
import Link from 'next/link';



type CartItemProps = {
    imageUrl: string,
    price: string,
    title: string
    id: number,
    items: any,
}


export const CardItem: React.FC<CartItemProps> = ({title, id, imageUrl, price, items,}) => {
    const {data} = useAppSelector(cartSelectors)
    const findItemFromCart = data.items?.some((obj) => obj.productId === id)

    const [addedFavorite, setAddedFavorite] = React.useState(false)
    const [addedCart, setAddedCart] = React.useState(findItemFromCart)
    const dispatch = useAppDispatch()


    const addItemToCart = async (id: number) => {
        if (!addedCart) {
            const cartObj = {
                title: title,
                imageUrl: imageUrl,
                productId: id,
                price: 11,
                quantity: 1
            }
            await Api().cart.addToCart(cartObj)
            setAddedCart(!addedCart)
            dispatch(addToCart(cartObj))

        } else {
            await Api().cart.remove(id)
            dispatch(remove(id))
        }
        setAddedCart(!addedCart)
    }


    return (
        <div className={styles.card}>
            <div className={styles.cardItem}>
                <Link href={`/items/${id}`}>
                    <div>
                        <div className={styles.img}>
                            <img src={imageUrl} alt="Seedra Cilantro Seeds for Planting Indoor and Outdoor"/>
                        </div>
                        <h5 className={styles.text}>
                            {title}
                        </h5>
                        <div onClick={() => setAddedFavorite(!addedFavorite)} className={styles.heart}>
                            <img src={addedFavorite ? "headerIcon/yellowHeartAdded.svg" : "headerIcon/yellowHeart.svg"}
                                 alt=""/>
                        </div>
                    </div>
                </Link>
                <div className={styles.rating}>
                    <img src="headerIcon/yellowStar.svg" alt=""/>
                    <img src="headerIcon/yellowStar.svg" alt=""/>
                    <img src="headerIcon/yellowStar.svg" alt=""/>
                    <img src="headerIcon/yellowStar.svg" alt=""/>
                    <img src="headerIcon/yellowStar.svg" alt=""/>
                    <p>(123)</p>
                </div>
                <div className={styles.p}>
                    <div className={styles.price}>
                        <p>{price}</p>
                        <div onClick={() => addItemToCart(id)} className={addedCart ? styles.active : styles.priceCart}>
                            <img src={addedCart ? 'headerIcon/whiteCart.svg' : "headerIcon/cartSimple.svg"} alt="cart"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

