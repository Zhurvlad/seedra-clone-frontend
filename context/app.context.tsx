import React, {createContext, ReactNode} from "react";
import {useAppDispatch} from "../redux/hooks";
import {Api} from "../utils/api";
import {clearCart} from "../redux/cartSlice";

export interface IAppContext {
    onClearCart?: () => void;
    nullCart?: boolean
}

export const AppContext = createContext<IAppContext>({})

export const AppContextProvider = ({children}: IAppContext & {children: ReactNode}):JSX.Element => {
    const [nullCart, setNullCart] = React.useState<boolean>(false)

    const dispatch = useAppDispatch()


    const onClearCart = async () => {
        try {
            await Api().cart.clearCart()
            dispatch(clearCart())
            setNullCart(true)
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <AppContext.Provider value={{onClearCart, nullCart}}>
            {children}
        </AppContext.Provider>
    )
}