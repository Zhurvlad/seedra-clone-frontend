import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from "../store";
import {IMeta} from "../../models/IItems";
import {HYDRATE} from "next-redux-wrapper";
import {IDataDto, IItems} from "../../utils/api/types";

interface itemsSliceProps {
    status: StatusEnum
    data: IItems[]
    meta: IMeta[]
}

export enum StatusEnum {
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error'
}


const initialState: itemsSliceProps = {
    data: [],
    meta: [],
    status: StatusEnum.LOADING
}

export const itemsSlice = createSlice({
    name: 'itemsSlice',
    initialState,
    reducers: {
        setItems(state, action: PayloadAction<IItems[]>) {
            state.data = action.payload

        },
        setMeta(state, action: PayloadAction<IMeta[]>) {
            state.meta = action.payload

        }
    },
    extraReducers: {
        [HYDRATE]: (state, action) => {
            state.data = action.payload.items.data
            state.meta = action.payload.items.meta
        }
    }
})

export const itemsSelectors = (state: RootState) => state.items

export const {setItems, setMeta} = itemsSlice.actions

export const items = itemsSlice.reducer