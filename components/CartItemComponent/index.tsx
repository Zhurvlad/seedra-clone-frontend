import React, {ReactNode} from 'react';
import styles from "./CartItemComponent.module.scss";
import {Api} from '../../utils/api';
import {remove} from '../../redux/cartSlice';
import {useAppDispatch} from '../../redux/hooks';
import ClosedRedSVG from './closedRed.svg'

type CartItemComponent = {
    children?: ReactNode,
    title: string,
    imageUrl: string,
    productId: number
}

export const CartItemComponent:React.FC<CartItemComponent> = ({children, title, imageUrl, productId}) => {
    const dispatch = useAppDispatch()

    const removeCartItem = async () => {
        try {

            await Api().cart.remove(productId)
            dispatch(remove(productId))
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div className={styles.windowItem}>
            <ClosedRedSVG onClick={removeCartItem} className={styles.closedRed}/>
            <img  className={styles.img} src={imageUrl} alt=""/>
            <div>
                <p>{title.length > 120 ? `${title} + '...'` : title}</p>
                {children}
            </div>
        </div>
    );
};

