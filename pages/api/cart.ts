import axios from 'axios';
import {IAddItems, ICartDto, IDataDto, IItemsDto} from './types';
import {SearchItemsDto} from './items';
import Cookies, {parseCookies} from "nookies";
import {cookies} from 'next/headers';

/*const cookies = ctx ? Cookies.get(ctx) : parseCookies()*/
const token = parseCookies().access_token

console.log(token)

const instance = axios.create({
    baseURL: 'http://localhost:8888',
    headers: {
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IjEyMzQ1NkBtYWlsLnJ1Iiwic3ViIjozLCJpYXQiOjE2NzAwMjI1NzcsImV4cCI6MTY3MjYxNDU3N30.wVe3vuZ8u41RFQ8S6WdPWcoV5t7v6Aj32cyPyXFK_Us'
    }
})


//Создаём функцию для запроса статей с БД
export const CartApi = () => (
    {
        async addToCart(dto: ICartDto): Promise<ICartDto> {
            const {data} = await instance.post<ICartDto>('/cart', dto)
            return data
        },
        /* async create(dto: CreateCommentDto) {
             const {data} = await instance.post('/comments', dto)
             return data
         },
         async remove(id: number) {
             await instance.delete<number>(`/comments/${id}`)
         }*/
        async search(query: SearchItemsDto) {
            const {data} = await instance.get<{ items: IItemsDto[] }>(`/items/search`, {params: query})
            return data
        },
        async addProduct(dto: IAddItems) {
            const {data} = await instance.post<IAddItems>(`/items`, dto)
            return data
        },
    }
)