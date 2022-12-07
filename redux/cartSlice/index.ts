import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit'
import axios from "axios";
import {RootState} from "../store";
import {IItems, IMeta} from "../../models/IItems";
import {HYDRATE} from "next-redux-wrapper";
import { ICart } from '../../utils/api/types';

/*export type urlParamsProps = {
    searchPizza: string,
    limit: number,
    categoryUrl: string,
    sortUrl: string,
    orderUrl: string,
    validPage: number
}*/

//TODO: Надо разобраться с Meta типизацией

interface cartSliceProps {
    status: StatusEnum
    data: ICart[]
    totalPrice: number
}

export enum StatusEnum {
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error'
}

const initialState: cartSliceProps = {
    data: [],
    totalPrice: 0,
    status: StatusEnum.LOADING
}

export const cartSlice = createSlice({
    name: 'cartSlice',
    initialState,
    reducers: {
        setCart (state, action: PayloadAction<ICart[]>) {
            state.data = action.payload
            console.log(action.payload, '12345')

        },
    },
    extraReducers: {
        [HYDRATE]: (state, action) => {
            state.data = action.payload.items.data
        }
    }
    /* extraReducers:(builder) => {
         builder.addCase(itemsPizzas.pending ,(state) => {
             state.status = StatusEnum.LOADING
             state.pizzas = []
         })
         builder.addCase(fetchPizzas.fulfilled ,(state, action) => {
             state.pizzas = action.payload
             state.status = StatusEnum.SUCCESS
         })
         builder.addCase(fetchPizzas.rejected ,(state) => {
             state.status = StatusEnum.ERROR
             state.pizzas = []
         })
     }*/
})

export const itemsSelectors = (state:RootState) => state.cart

export const {setCart} = cartSlice.actions

export const cart = cartSlice.reducer