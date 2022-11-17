import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit'
import axios from "axios";
import {RootState} from "../store";
import {IItems} from "../../models/IItems";
import {HYDRATE} from "next-redux-wrapper";

/*export type urlParamsProps = {
    searchPizza: string,
    limit: number,
    categoryUrl: string,
    sortUrl: string,
    orderUrl: string,
    validPage: number
}*/

interface itemsSliceProps {
    status: StatusEnum
    data: IItems[]
}

export enum StatusEnum {
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error'
}

export const fetchItems = createAsyncThunk<IItems[]>(
    'items/fetchItems',

    async (params) => {
        const itemsUrl = 'http://localhost:8888/items'

        const {data} = await axios.get<IItems[]>(`${itemsUrl}`)
        return data
    }
)


const initialState: itemsSliceProps = {
    data: [],
    status: StatusEnum.LOADING
}

export const itemsSlice = createSlice({
    name: 'itemsSlice',
    initialState,
    reducers: {
        setItems (state, action: PayloadAction<IItems[]>) {
            state.data = action.payload
        }
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

export const itemsSelectors = (state:RootState) => state.items

export const {setItems} = itemsSlice.actions

export const items = itemsSlice.reducer