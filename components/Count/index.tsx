import React from 'react';
import styles from "./Count.module.scss";
import {useAppDispatch} from '../../redux/hooks';
import {minusItem, plusItem } from '../../redux/cartSlice';
import PlusSVg from './plus.svg'
import {Api} from "../../utils/api";

type ICount = {
    count: number,
    id: number
}

export const Count:React.FC<ICount> = ({count, id}) => {
    const dispatch = useAppDispatch()



    const onPlusItem = async (id: number) => {
        dispatch(plusItem(id))
      await  Api().cart.plusItem(id)
    }

    const onMinusItem = async (id: number) => {
       if(count !== 1){
           dispatch(minusItem(id))
         await  Api().cart.minusItem(id)
       }
    }

    return (
        <div className={styles.windowCartCount}>
            <div className={count === 1 ? styles.blackMinus : ''} onClick={() => onMinusItem(id)} >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.66675 8H13.3334" stroke="#359740" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
            </div>
            <p>{count}</p>
            <PlusSVg className={styles.plusSVG} onClick={() => onPlusItem(id)}/>
        </div>
    );
};

