import React, {ChangeEvent, useCallback, useMemo, useRef} from 'react';
import styles from './Header.module.scss'
import {Count} from "../Count";
import {CartItemComponent} from "../CartItemComponent";
import Link from "next/link";
import {useRouter} from "next/router";
import {IItems} from "../../models/IItems";
import {ItemsApi} from "../../pages/api/items";
import debounce from 'lodash.debounce';


export const Header: React.FC = () => {
    const [notNullCart, setNotNullCart] = React.useState(true)
    const [notNullFavorite, setNotNullFavorite] = React.useState(false)
    const [visibleWindowCart, setVisibleWindowCart] = React.useState(false)
    const [active, setActive] = React.useState<boolean>(false)
    const [items, setItems] = React.useState<IItems[]>([])
    const [searchValue, setSearchValue] = React.useState<string>('')
    const [isLoading, setIsLoading] = React.useState<boolean>(false)


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
            //Типизация скрытия попапаесли клик был произведён вне области попапа'
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

        //Удаляем листенер при переходе на другую страницу
        return () => {
            document.body.removeEventListener('click', handleClickOutside)
        }
    }, [])

    const handleChangeInput = async (inputValue: string) => {
        setIsLoading(true)
        try {
            const {items} = await ItemsApi().search({title: inputValue.toUpperCase()})
            // @ts-ignore
            setItems(items)
            if (!inputValue) return setActive(false)
            if(inputValue) return setActive(true)
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
                        <img src='headerIcon/mainLogo.svg' alt="Logo"/>
                    </Link>
                </div>
                <nav className={styles.menu}>
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
                </nav>
                <div className={styles.headerRight}>
                    <li className={styles.headerSocial}>
                        <img src="headerIcon/facebook.svg" alt="search"/>
                        <img src="headerIcon/instagram.svg" alt="search"/>
                    </li>
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


                        <div className={[styles.searchList, active && styles.searchListActive].join(' ')}>
                            {items.length ? items.map((obj, i) => (
                                //Тут надо сделать линк
                                <div>
                                    <img src={obj.imageUrl} alt="Img"/>
                                    <p>{searchValue && obj.title}</p>
                                </div>
                            ))
                            :
                            <h6>Nothing found</h6>
                            }
                        </div>
                    </div>
                    <li className={styles.headerCartFav}>
                        <img onClick={() => setNotNullFavorite(!notNullFavorite)}
                             src={notNullFavorite ? 'headerIcon/addedHeart.svg' : "headerIcon/nullFavorite.svg"}
                             alt="search"/>
                        <Link href={'/cart'}>
                            <img ref={cartRef} onMouseEnter={onVisibleWindowCart} className={styles.headerCart}
                                 src={notNullCart ? 'headerIcon/addedCart.svg' : "headerIcon/nullCart.svg"}
                                 alt="search"/>
                        </Link>
                    </li>
                </div>
                {visibleWindowCart && notNullCart &&
                <div ref={cartRef} className={styles.windowCart}>
                    <img onClick={onClosePopupCart} className={styles.closed} src="headerIcon/closed.svg" alt="closed"/>
                    <div className={styles.windowItems}>
                        <div className={styles.windowCartItem}>
                            <CartItemComponent>
                                <div className={styles.price}>
                                    <p className={styles.pack}>1 pack</p>
                                    <p className={styles.priceText}>$24.56</p>
                                </div>
                            </CartItemComponent>
                            <Count/>
                        </div>
                    </div>
                    <div className={styles.payment}>
                        <p className={styles.clear}>Clear</p>
                        <p className={styles.pay}>Proceed to payment</p>
                    </div>
                </div>
                }

            </div>
        </div>
    );
};

