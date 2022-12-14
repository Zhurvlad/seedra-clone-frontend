import React, {ChangeEvent, useCallback, useMemo, useRef} from 'react';
import styles from './Header.module.scss'
import {Count} from "../Count";
import {CartItemComponent} from "../CartItemComponent";
import Link from "next/link";
import {useRouter} from "next/router";
import {IItems} from "../../models/IItems";
import {ItemsApi} from "../../utils/api/items";
import debounce from 'lodash.debounce';
import {useForm, UseFormSetError} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {LoginSchema} from "../../utils/validation";
import {Main} from "../Authorization/form/Main";
import {Login} from "../Authorization/form/Login";
import {Register} from "../Authorization/form/Register";
import {LoadingProduct} from "../LoadingProduct";
import {GetServerSideProps} from 'next';
import {wrapper} from '../../redux/store';
import {Api} from '../../utils/api';
import {setItems} from '../../redux/itemsSlice';
import {setUserData} from '../../redux/userSlice';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {cartSelectors, cartSlice, clearCart} from '../../redux/cartSlice';


export const Header: React.FC = () => {
    const [notNullCart, setNotNullCart] = React.useState(true)
    const [notNullFavorite, setNotNullFavorite] = React.useState(false)
    const [visibleWindowCart, setVisibleWindowCart] = React.useState(false)
    const [active, setActive] = React.useState<boolean>(false)
    const [items, setItems] = React.useState<IItems[]>([])
    const [searchValue, setSearchValue] = React.useState<string>('')
    const [isLoading, setIsLoading] = React.useState<boolean>(false)
    const [login, setLogin] = React.useState(false)
    const [onLogin, setOnLogin] = React.useState('')
    const [admin, setAdmin] = React.useState(false)
    const {data} = useAppSelector(cartSelectors)
    const dispatch = useAppDispatch()


    console.log(data.items)

    React.useEffect(() => {
        (async () => {
            const userData = await Api().user.getMe()
            console.log(userData)
        })()
    }, [])

    const cartRef = useRef<HTMLImageElement>(null)
    const searchRef = useRef<HTMLDivElement>(null)
    const cartRoute = useRouter()


    const onClosePopupCart = () => {
        setVisibleWindowCart(!visibleWindowCart)
    }


    const onVisibleWindowCart = () => {
        if (cartRoute.pathname !== '/cart') {
            setVisibleWindowCart(true)
        }
    }

    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            //?????????????????? ?????????????? ???????????????????? ???????? ?????? ???????????????????? ?????? ?????????????? ????????????'
            const _event = event as MouseEvent & {
                path: Node[]
            }
            if (cartRef.current && !_event.path.includes(cartRef.current)) {
                setVisibleWindowCart(false)
            }

            if (searchRef.current && !_event.path.includes(searchRef.current)) {
                setActive(false)
            }
        }
        document.body.addEventListener('click', handleClickOutside)

        //?????????????? ???????????????? ?????? ???????????????? ???? ???????????? ????????????????
        return () => {
            document.body.removeEventListener('click', handleClickOutside)
        }
    }, [])

    const handleChangeInput = async (inputValue: string) => {
        setIsLoading(true)
        try {
            const {items} = await Api().items.search({title: inputValue.toUpperCase()})
            setItems(items)
            if (!inputValue) return setActive(false)
            if (inputValue) return setActive(true)
        } catch (e) {
            console.log(e)
        } finally {
            setIsLoading(false)
        }
    }

    const debounceFn = useMemo(() => debounce(handleChangeInput, 1000), [])

    const onDebounce = (event: ChangeEvent<HTMLInputElement>) => {
        debounceFn(event.target.value)
        setSearchValue(event.target.value)
    }

    const onClearCart = async () => {
        try {
            await Api().cart.clearCart()
            dispatch(clearCart())
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div className={styles.header}>
            <div className={styles.headerTop}>
                <div className={styles.headerLogo}>
                    <Link href={'/'}>
                        <img src='headerIcon/mainLogo.svg' alt="Logo"/>
                    </Link>
                </div>
                {/* <nav className={styles.menu}>
                    <ul className={styles.menuList}>
                        <li>
                            <a href="">ALL PRODUCTS</a>
                        </li>
                        <li>
                            <a href="">ABOUT SEEDRA</a>
                        </li>
                        <li>
                            <a href="">OUR BLOG</a>
                        </li>
                        <li>
                            <a href="">CONTACTS</a>
                        </li>
                    </ul>
                </nav>*/}
                <div className={styles.headerRight}>
                    {/* <li className={styles.headerSocial}>
                        <img src="headerIcon/facebook.svg" alt="search"/>
                        <img src="headerIcon/instagram.svg" alt="search"/>
                    </li>*/}
                    <div ref={searchRef} className={[styles.headerSearch, active && styles.searchActive].join(' ')}>
                        <input value={searchValue}
                               onChange={(e) => onDebounce(e)}
                               onFocus={() => setActive(!active)}
                               type="text"
                               placeholder={'Search'}/>
                        <img className={styles.searchIcon} src="headerIcon/headerSearch.svg" alt="search"/>
                        {isLoading &&
                        <img className={styles.loading} src="https://seedra.us/wp-content/uploads/2021/12/spinner.gif"
                             alt="Loading"/>}

                        <div
                            className={[styles.searchList, active && searchValue.length !== 0 && styles.searchListActive].join(' ')}>
                            {items.length !== 0 ? items.map((obj, i) => (
                                    //?????? ???????? ?????????????? ????????
                                    <Link href={`/items/${obj.id}`}>
                                        <div>
                                            <img src={obj.imageUrl} alt="Img"/>
                                            <p>{searchValue && obj.title}</p>
                                        </div>
                                    </Link>
                                ))
                                : (searchValue.length !== 0 && isLoading ? <h6>Nothing found</h6> : '')

                            }
                        </div>
                    </div>
                    <ul className={styles.headerCartFav}>
                        <li>
                            <img onClick={() => setNotNullFavorite(!notNullFavorite)}
                                 src={notNullFavorite ? 'headerIcon/addedHeart.svg' : "headerIcon/nullFavorite.svg"}
                                 alt="search"/>
                        </li>

                        <li className={styles.headerCart}>
                            <Link href={'/cart'}>
                                <img ref={cartRef} onMouseEnter={onVisibleWindowCart}
                                     src={notNullCart ? 'headerIcon/addedCart.svg' : "headerIcon/nullCart.svg"}
                                     alt="search"/>
                            </Link>
                        </li>

                        <li onClick={() => setOnLogin('main')}>
                            <img src="headerIcon/user.svg" alt=""/>
                        </li>
                        <li onClick={() => setAdmin(!admin)} style={{marginLeft: '10px'}}>
                            <img src="headerIcon/plus.svg" alt=""/>
                        </li>
                    </ul>
                </div>
                <div style={onLogin !== '' ? {display: "inherit"} : {display: 'none'}} className={styles.overlay}>
                    {onLogin === 'main' && <Main setOnLogin={setOnLogin}/>}
                    {onLogin === 'login' && <Login setOnLogin={setOnLogin}/>}
                    {onLogin === 'register' && <Register setOnLogin={setOnLogin}/>}

                </div>
                {admin && <LoadingProduct setAdmin={setAdmin} admin={admin}/>}
                {visibleWindowCart && notNullCart &&
                <div ref={cartRef} className={styles.windowCart}>
                    <img onClick={onClosePopupCart} className={styles.closed} src="headerIcon/closed.svg" alt="closed"/>
                    {data.items?.length === 0 ?
                        <div className={styles.emptyCart}>
                            <img src="https://dodopizza-a.akamaihd.net/site-static/dist/121df529925b0f43cc73.svg"
                                 alt="Dog"/>
                            <h2>Oh it's empty!</h2>
                            <p>Your shopping cart is empty, add your favorite products to the cart.</p>
                        </div>
                        : <div>
                            <div className={styles.windowItems}>
                                {data.items.map(obj =>
                                    <div key={obj.productId} className={styles.windowCartItem}>
                                        <CartItemComponent
                                            imageUrl={obj.imageUrl}
                                            productId={obj.productId}
                                            title={obj.title}>
                                            <div className={styles.price}>
                                                <p className={styles.pack}>1 pack</p>
                                                <p className={styles.priceText}>$24.56</p>
                                            </div>
                                        </CartItemComponent>
                                        <Count count={obj.quantity}/>
                                    </div>
                                )}
                            </div>
                            <div className={styles.payment}>
                                <p onClick={onClearCart} className={styles.clear}>Clear</p>
                                <Link href={'/cart'}>
                                    <p className={styles.pay}>Proceed to payment</p>
                                </Link>
                            </div>
                        </div>}
                </div>
                }
            </div>
        </div>
    );
};

