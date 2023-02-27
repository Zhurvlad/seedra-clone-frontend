import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import {items} from './itemsSlice'
import {user} from './userSlice';
import {cart} from './cartSlice';


export function makeStore() {
    return configureStore({
        reducer: {
            items,
            user,
            cart
        },
        devTools: true
    });
}

export const store = makeStore();

export type RootStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<RootStore['getState']>;

export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

export const wrapper = createWrapper<RootStore>(makeStore, { debug: true });

