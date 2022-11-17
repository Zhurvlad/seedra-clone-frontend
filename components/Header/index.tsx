import React, {useRef} from 'react';
import styles from './Header.module.scss'
import {Count} from "../Count";
import {CartItemComponent} from "../CartItemComponent";
import Link from "next/link";
import {useRouter} from "next/router";
import {IItems} from "../../models/IItems";
import {ItemsApi} from "../../pages/api/items";

export const Header: React.FC = () => {
    const [notNullCart, setNotNullCart] = React.useState(true)
    const [notNullFavorite, setNotNullFavorite] = React.useState(false)
    const [visibleWindowCart, setVisibleWindowCart] = React.useState(false)
    const cartRef = useRef<HTMLDivElement>(null)
    const cartRoute = useRouter()
    const [active, setActive] = React.useState(false)
    const [items, setItems] = React.useState<IItems[]>([])
    const [searchValue, setSearchValue] = React.useState('')

    const onClosePopupCart = () => {
        setVisibleWindowCart(!visibleWindowCart)
    }

    console.log(cartRoute.pathname)

    const onVisibleWindowCart = () => {
        if (cartRoute.pathname !== '/cart') {
            setVisibleWindowCart(true)
        }
    }

    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            //Типизация скрытия попапаесли клик был произведён вне области попапа
            const _event = event as MouseEvent & {
                path: Node[]
            }
            if (cartRef.current && !_event.path.includes(cartRef.current)) {
                setVisibleWindowCart(false)
            }
        }
        document.body.addEventListener('click', handleClickOutside)

        //Удаляем листенер при переходе на другую страницу
        return () => {
            document.body.removeEventListener('click', handleClickOutside)
        }
    }, [])

    const handleChangeInput = async (e) => {
        setSearchValue(e.target.value)

        try{
            const {items} = await ItemsApi().search({title: e.target.value})


            // @ts-ignore
            setItems(items)
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
                    <li className={[styles.headerSearch, active && styles.searchActive].join(' ')}>
                        <input value={searchValue}
                               onChange={(e) => handleChangeInput(e)}
                               onClick={() => setActive(!active)}
                               type="text"
                               placeholder={'Search'}/>
                        <img src="headerIcon/headerSearch.svg" alt="search"/>


                        <div className={[styles.searchList, active && styles.searchListActive].join(' ')}>
                            {items.length > 0 && items.map((obj, i) => (
                                <div>{obj.title}</div>
                            ))}
                        </div>


                    </li>
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

