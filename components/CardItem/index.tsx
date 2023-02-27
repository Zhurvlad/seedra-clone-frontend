import React, {useContext} from 'react';
import styles from './CardItem.module.scss'
import {Api} from '../../utils/api';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {addToCart, cartSelectors, remove} from '../../redux/cartSlice';
import Link from 'next/link';
import {AppContext} from "../../context/app.context";



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
    const {nullCart} = useContext(AppContext)
    const [addedFavorite, setAddedFavorite] = React.useState(false)
  /*  const [addedCart, setAddedCart] = React.useState(nullCart)*/
  /*  const [addedCart, setAddedCart] = React.useState(findItemFromCart)*/




    const dispatch = useAppDispatch()


    const addItemToCart = async (id: number) => {
        if (!findItemFromCart) {
            const cartObj = {
                title: title,
                imageUrl: imageUrl,
                productId: id,
                price: price,
                quantity: 1
            }
            await Api().cart.addToCart(cartObj)
            dispatch(addToCart(cartObj))
        } else {
            await Api().cart.remove(id)
            dispatch(remove(id))

        }
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
                            {title.length > 120 ? `${title.slice(0, 120)}  ...` : title}
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
                        <p>${price}</p>
                        <div onClick={() => addItemToCart(id)} className={findItemFromCart  ? styles.active : styles.priceCart}>
                            <img src={findItemFromCart ? 'headerIcon/whiteCart.svg' : "headerIcon/cartSimple.svg"} alt="cart"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

