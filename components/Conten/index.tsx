import React from 'react';
import styles from './Content.module.scss'
import {CardItem} from "../CardItem";
import {availableCategory, Category} from "../Category";
import axios from "axios";
import {IItems} from "../../models/IItems";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {ItemsApi} from "../../pages/api/items";
import {itemsSelectors, setItems} from "../../redux/itemsSlice";
import {IMeta} from "../../pages/api/types";

type ContentProps = {
    items: IItems[],
    meta: IMeta
}


export const Content: React.FC<ContentProps> = ({items, meta}) => {
    const [activeCategory, setActiveCategory] = React.useState(0)
    const {data} = useAppSelector(itemsSelectors)
    const [currentPage, setCurrentPage] = React.useState<number>(1)
    console.log(data, 321)

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
               if(currentPage === 1){
                   const {items} = await ItemsApi().search({
                       type: availableCategory[activeCategory].name
                   })
                   dispatch(setItems(items))
               } else {

                   const {items} = await ItemsApi().getAll(currentPage)
                   dispatch(setItems(items))
               }

            } catch (e) {
                console.log(e)
            }
        })()
    }, [activeCategory, currentPage])

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
                {(activeCategory !== 0 || currentPage !== 1 ? data : items).map((obj, i) => <CardItem id={obj.id} title={obj.title}
                                                                                 imageUrl={obj.imageUrl}
                                                                                 price={obj.price}
                                                                                 key={obj.id}/>)}

            </div>
            <nav>
                <nav className="woocommerce-pagination">
                    <ul className={styles.pagination}>
                        {meta.currentPage === 1 ? ''
                            : <li>
                                <img src="headerIcon/arrowL.svg" alt=""/>
                            </li>}
                        {Array.from({length: meta.totalPages}, (_, i) => i + 1).map((num, i) => (
                            <li>
                                <p onClick={() => setCurrentPage(num)}>{num}</p>
                            </li>
                        ))}
                        {meta.currentPage === meta.totalPages ? ''
                            : <li>
                                <img src="headerIcon/arrowR.svg" alt=""/>
                            </li>}
                        {/* <li>
                            <a className="page-numbers" href="https://seedra.us/seeds/">1</a>
                        </li>
                        <li>
                            <span aria-current="page" className="page-numbers current">2</span>
                        </li>
                        <li>
                            <a className="page-numbers" href="https://seedra.us/seeds/page/3/">3</a>
                        </li>
                        <li>
                            <span className="page-numbers dots">…</span>
                        </li>
                        <li>
                            <a className="page-numbers" href="https://seedra.us/seeds/page/17/">17</a>
                        </li>
                        <li>
                            <a className="next page-numbers" href="https://seedra.us/seeds/page/3/">
                                <img src="headerIcon/arrowR.svg" alt=""/>
                            </a>
                        </li>*/}
                    </ul>
                </nav>
            </nav>
        </div>
    );
};

