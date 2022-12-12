import React from 'react';
import styles from './Content.module.scss'
import {CardItem} from "../CardItem";
import {availableCategory, Category} from "../Category";
import axios from "axios";
import {IItems} from "../../models/IItems";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {ItemsApi} from "../../utils/api/items";
import {itemsSelectors, setItems} from "../../redux/itemsSlice";
import {IMeta} from "../../utils/api/types";
import {Pagination} from "../Pagination";
import {Api} from '../../utils/api';
import {cartSelectors} from '../../redux/cartSlice';
import {FullProduct} from '../FullProduct';
import Link from 'next/link';

type ContentProps = {
    items: IItems[],
    meta: IMeta
}


export const Content: React.FC<ContentProps> = ({items, meta}) => {
    const [activeCategory, setActiveCategory] = React.useState(0)
    const {data} = useAppSelector(itemsSelectors)
    const cartItems = useAppSelector(cartSelectors)
    const [currentPage, setCurrentPage] = React.useState<number>(1)
    const [findCartItem, setFindCartItem] = React.useState(false)
    const [addedCart, setAddedCart] = React.useState(true)


    /*  const addToCart = async (cartObj: any) => {
         const findItem = cartItems.data.items.some((obj) => obj.productId === id)
          if(!addedCart){
              const cartObj = {
                  title: title,
                  imageUrl: imageUrl,
                  productId: id,
                  price: 11,
                  quantity: 1
              }
              await Api().cart.addToCart(cartObj)
              setAddedCart(!addedCart)
          } else {
              await Api().cart.remove(id)
          }
          setAddedCart(!addedCart)

      }*/

    /*const [items, setItems] = React.useState([])

    React.useEffect(() => {
        (async () => {
            const {data} = await axios.get('http://localhost:8888/items')
            setItems(data)
        })()

    }, [])
*/
    /* console.log(items.map((obj, i) => console.log(obj)), 999)
 */

    const dispatch = useAppDispatch()


    React.useEffect(() => {
        (async () => {
            try {
                if (activeCategory !== 0) {
                    const {items} = await Api().items.search({
                        type: availableCategory[activeCategory].name
                    })
                    dispatch(setItems(items))

                } else {

                    const {items} = await Api().items.getAll(currentPage)
                    dispatch(setItems(items))
                }

            } catch (e) {
                console.log(e)
            } finally {
                window.scroll(0, 0)
            }
        })()
    }, [activeCategory, currentPage])

    const onPrevPage = () => {
        setCurrentPage(prevState => prevState - 1)
    }

    const onNextPage = () => {
        setCurrentPage(prevState => prevState + 1)
    }

    return (
        <div className={styles.content}>
            <div className={styles.header}>
                <h2 className={styles.text}>Our products</h2>
                <button className={styles.button}>
                    View all (12)
                </button>
            </div>
            <Category setActiveCategory={setActiveCategory} activeCategory={activeCategory}/>

            <div className={styles.cartItem}>

                {(activeCategory !== 0 || currentPage !== 1 ? data : items).map((obj, i) =>
                    <Link href={`/items/${obj.id}`}>
                        <CardItem id={obj.id}
                                  items={data}
                                  title={obj.title}
                                  imageUrl={obj.imageUrl}
                                  price={obj.price}
                                  key={obj.id}/>
                    </Link>
                )}
            </div>


            {activeCategory === 0 &&
            <Pagination setCurrentPage={setCurrentPage} totalPage={meta.totalPages} currentPage={currentPage}
                        onNextPage={onNextPage} onPrevPage={onPrevPage}/>
            }


        </div>
    );
};

