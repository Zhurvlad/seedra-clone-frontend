import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { createWrapper, Context } from 'next-redux-wrapper';
import {items} from './itemsSlice'


export function makeStore() {
    return configureStore({
        reducer: {
            items,
        },
    });
}

export const store = makeStore();

export type RootStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<RootStore['getState']>;

export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

export const wrapper = createWrapper<RootStore>(makeStore, { debug: true });

