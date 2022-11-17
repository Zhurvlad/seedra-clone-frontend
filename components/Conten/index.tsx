import React from 'react';
import styles from './Content.module.scss'
import {CardItem} from "../CardItem";
import {availableCategory, Category} from "../Category";
import axios from "axios";
import {IItems} from "../../models/IItems";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {ItemsApi} from "../../pages/api/items";
import {itemsSelectors, setItems} from "../../redux/itemsSlice";

type ContentProps = {
    items: IItems[]
}


export const Content: React.FC<ContentProps> = ({items}) => {
    const [activeCategory, setActiveCategory] = React.useState(0)
    const {data} = useAppSelector(itemsSelectors)


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

    const dispatch =  useAppDispatch()




    React.useEffect(() => {
        (async () => {

            try{
                const {items} = await ItemsApi().search({
                    type: availableCategory[activeCategory].name
                })
                dispatch(setItems(items))
            } catch (e) {
                console.log(e)
            }
        })()
    }, [activeCategory])

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
                {(activeCategory !== 0 ? data :  items).map((obj, i) => <CardItem id={obj.id} title={obj.title} imageUrl={obj.imageUrl} price={obj.price}
                                                 key={obj.id}/>)}

            </div>
        </div>
    );
};

