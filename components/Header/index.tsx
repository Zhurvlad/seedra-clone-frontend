import React, {ChangeEvent, useContext, useMemo, useRef} from 'react';
import Link from "next/link";
import {useRouter} from "next/router";
import debounce from 'lodash.debounce';

import {Count} from "../Count";
import {CartItemComponent} from "../CartItemComponent";
import {Main} from "../Authorization/form/Main";
import {Login} from "../Authorization/form/Login";
import {Register} from "../Authorization/form/Register";
import {LoadingProduct} from "../LoadingProduct";

import {Api} from '../../utils/api';
import {useAppSelector} from '../../redux/hooks';
import {cartSelectors} from '../../redux/cartSlice';
import {AppContext} from "../../context/app.context";
import {IItems} from "../../utils/api/types";

import MainLogoSVG from './mainLogo.svg'
import UserLogoSVG from './user.svg'
import SearchSVG from './headerSearch.svg'
import PlusSVG from './plus.svg'
import ClosedSVG from './closed.svg'

import styles from './Header.module.scss'




export const Header: React.FC = () => {
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
    const [searchCount, setSearchCount] = React.useState<number>(0)

    const {onClearCart} = useContext(AppContext)


    React.useEffect(() => {
        (async () => {
            const userData = await Api().user.getMe()
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
            //Типизация скрытия попапа если клик был произведён вне области попапа'
            const _event = event as MouseEvent & {
                path: Node[]
            }
            if (cartRef.current && !_event.path?.includes(cartRef.current)) {
                setVisibleWindowCart(false)
            }

            if (searchRef.current && !_event.path?.includes(searchRef.current)) {
                setActive(false)
            }
        }
        document.body.addEventListener('click', handleClickOutside)

        //Удаляем листенер при переходе на другую страницу
        return () => {
            document.body.removeEventListener('click', handleClickOutside)
        }
    }, [])

    const handleChangeInput = async (inputValue: string) => {
        setIsLoading(true)
        try {
            const {items, totalCount} = await Api().items.search({title: inputValue.toUpperCase()})
            setItems(items)
            setSearchCount(totalCount)
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





    return (
        <div className={styles.header}>
            <div className={styles.headerTop}>
                <div className={styles.headerLogo}>
                    <Link href={'/'}>
                        <MainLogoSVG  className={styles.logo}/>
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
                        <SearchSVG className={styles.searchIcon}/>
                        {isLoading &&
                        <img className={styles.loading} src="https://seedra.us/wp-content/uploads/2021/12/spinner.gif"
                             alt="Loading"/>}

                        <div
                            className={[styles.searchList, active && searchValue.length !== 0 && styles.searchListActive].join(' ')}>

                            {searchCount !== 0 ? items.map((obj, i) => (
                                    <Link key={obj.id} href={`/items/${obj.id}`}>
                                        <div>
                                            <img src={obj.imageUrl} alt="Img"/>
                                            <p>{searchValue && obj.title}</p>
                                        </div>
                                    </Link>
                                ))
                                : (searchValue.length !== 0 ? <h6>Nothing found</h6> : '')

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
                                     src={data.totalCount !== 0 ? 'headerIcon/addedCart.svg' : "headerIcon/nullCart.svg"}
                                     alt="search"/>
                            </Link>
                        </li>


                        {!data.user && <li onClick={() => setOnLogin('main')}>
                            <UserLogoSVG className={styles.userLogo}/>
                        </li>}

                        <li onClick={() => setAdmin(!admin)} style={{marginLeft: '10px'}}>
                            <PlusSVG className={styles.plusSVG}/>
                        </li>
                    </ul>
                </div>

                <div style={onLogin !== '' ? {display: "inherit"} : {display: 'none'}} className={styles.overlay}>
                    {onLogin === 'main' && <Main setOnLogin={setOnLogin}/>}
                    {onLogin === 'login' && <Login setOnLogin={setOnLogin}/>}
                    {onLogin === 'register' && <Register setOnLogin={setOnLogin}/>}
                </div>

                {admin && <LoadingProduct setAdmin={setAdmin} admin={admin}/>}

                {visibleWindowCart && data.totalCount !== 0 &&
                <div ref={cartRef} className={styles.windowCart}>
                    <ClosedSVG onClick={onClosePopupCart} className={styles.closed}/>
                    {data.totalCount === 0 ?
                        <div className={styles.emptyCart}>
                            <img src="https://dodopizza-a.akamaihd.net/site-static/dist/121df529925b0f43cc73.svg"
                                 alt="Dog"/>
                            <h2>Oh it's empty!</h2>
                            <p>Your shopping cart is empty, add your favorite products to the cart.</p>
                        </div>
                        : <div>
                            <div className={styles.windowItems}>
                                {data.items?.map(obj =>
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
                                        <Count id={obj.productId} count={obj.quantity}/>
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
                </div>}

            </div>
        </div>
    );
};

