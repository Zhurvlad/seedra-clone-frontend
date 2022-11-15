import {CartComponent} from "../components/Cart";
import React from "react";
import {Header} from "../components/Header";
import {Footer} from "../components/Footer";

const Cart = () => {
    return <div className={'container'}>
        <Header/>
        <CartComponent/>
        <Footer/>
    </div>
}


export default Cart