import {CartComponent} from "../components/Cart";
import React from "react";
import {Header} from "../components/Header";
import {Footer} from "../components/Footer";
import {GetServerSideProps} from 'next';
import {Api} from '../utils/api';
import {setUserData} from '../redux/userSlice';
import {wrapper} from '../redux/store';
import {setItems, setMeta} from '../redux/itemsSlice';
import Home from './index';
import { setCart } from "../redux/cartSlice";

const Cart = () => {
    return <div className={'container'}>
        <Header/>
        <CartComponent/>
        <Footer/>
    </div>
}
/*

export const getServerSideProps:GetServerSideProps = async ctx => {
    try {
        const userCart = await Api(ctx).cart.getUserCart()
        store.dispatch(setUserData(userData))
        console.log(userCart)
        return {
            props: {
                userCart
            }
        }
    } catch (e) {
        console.log(e)
    }
    return {
        props: {
            user: null
        }
    }

}
*/

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(store => async (ctx) => {

    try {
        const userCart = await Api(ctx).cart.getUserCart()
        store.dispatch(setCart(userCart))
        console.log(userCart, 9999)

    } catch (e) {
        console.log(e)
    }
    return {
        props: {
            items: null
        }
    }

})



export default Cart