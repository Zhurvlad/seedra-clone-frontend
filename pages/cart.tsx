import {CartComponent} from "../components/Cart";
import React from "react";
import {Header} from "../components/Header";
import {GetServerSideProps, NextPage} from 'next';
import {Api} from '../utils/api';
import {wrapper} from '../redux/store';
import {setCart} from "../redux/cartSlice";

interface CartProps {
    items: any
}


const Cart:NextPage<CartProps> = ({items}) => {




    return <div className={'container'}>
        <Header/>
        <CartComponent items={items}/>
       {/* <Footer/>*/}
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
            items: null
        }
    }

})



export default Cart