import {GetServerSidePropsContext, NextPageContext} from "next";
import Cookies, {parseCookies} from "nookies";
import axios from "axios";
import {CartApi} from './cart';
import {UserApi} from './users';
import {ItemsApi} from './items';


export type ApiReturnType = {
    user: ReturnType<typeof UserApi>
    cart: ReturnType<typeof CartApi>
    items: ReturnType<typeof ItemsApi>
}

//Создали функцию которая отпределяет откуда доставать Cookies. Брать куки из контукста или брать из браузера
export const Api = (ctx?: NextPageContext | GetServerSidePropsContext): ApiReturnType => {
    const cookies = ctx ? Cookies.get(ctx) : parseCookies()
    const token = cookies.seedra

    const instance = axios.create({
        baseURL: 'http://localhost:8888/',
        headers: {
            Authorization: 'Bearer ' + token
        }
    })

    return {
        user: UserApi(instance),
        cart: CartApi(instance),
        items: ItemsApi(instance)
    }
}