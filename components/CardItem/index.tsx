import React from 'react';
import s from './body/sliderImage.png'
import styles from './CardItem.module.scss'
import axios from 'axios';
import {CartApi} from '../../utils/api/cart';
import {Api} from '../../utils/api';

type CartItemProps = {
    imageUrl: string,
    price: string,
    title: string
    id: number
}

export const CardItem:React.FC<CartItemProps> = ({title, id, imageUrl, price}) => {
    const [addedFavorite, setAddedFavorite] = React.useState(false)
    const [addedCart, setAddedCart] = React.useState(false)

    const addToCart = async () => {
            const cartObj = {
                title: title,
                imageUrl: imageUrl,
                productId: id,
                price: 11,
                quantity: 1
            }
            await Api().cart.addToCart(cartObj)
            setAddedCart(!addedCart)
    }

    return (
        <div className={styles.card}>
            <div className={styles.cardItem}>
                <div className={styles.img}>
                    <img src={imageUrl} alt="Seedra Cilantro Seeds for Planting Indoor and Outdoor"/>
                </div>
                <div onClick={() => setAddedFavorite(!addedFavorite)} className={styles.heart}>
                    <img src={addedFavorite ? "headerIcon/yellowHeartAdded.svg" : "headerIcon/yellowHeart.svg"} alt=""/>
                </div>
                <div className={styles.rating}>
                    <img src="headerIcon/yellowStar.svg" alt=""/>
                    <img src="headerIcon/yellowStar.svg" alt=""/>
                    <img src="headerIcon/yellowStar.svg" alt=""/>
                    <img src="headerIcon/yellowStar.svg" alt=""/>
                    <img src="headerIcon/yellowStar.svg" alt=""/>
                    <p>(123)</p>
                </div>
                <h5 className={styles.text}>
                    {title}
                </h5>
                <div className={styles.p}>
                    <div className={styles.price}>
                        <p>{price}</p>
                        <div  onClick={addToCart} className={addedCart ? styles.active : styles.priceCart}>
                            <img  src={addedCart ? 'headerIcon/whiteCart.svg' : "headerIcon/cartSimple.svg"} alt="cart"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

