import React from 'react';
import styles from "./Category.module.scss";
import {ItemsApi} from "../../utils/api/items";
import {setItems} from "../../redux/itemsSlice";
import {useAppDispatch} from "../../redux/hooks";

export const availableCategory = [
    {name: 'All', url: 'headerIcon/treeLeaf.svg'},
    {name: 'BUNDLES', url: 'headerIcon/bread.svg'},
    {name: 'HERBS', url: 'headerIcon/oakLeaf.svg'},
    {name: 'VEGETABLES', url: 'headerIcon/potato.svg'},
    {name: 'FRUITS', url: 'headerIcon/strawsberry.svg'},
    {name: 'SUPPLIES', url: 'headerIcon/tableware.svg'},
    {name: 'FLOWERS', url: 'headerIcon/flower.svg'}
]

type CategoryProps = {
    activeCategory: number,
    setActiveCategory: (i: number) => void
}

export const Category:React.FC<CategoryProps> = ({activeCategory, setActiveCategory}) => {



    return (
        <div className={styles.category}>
            {availableCategory.map(((obj, i) => (
                <ul onClick={() => setActiveCategory(i)} key={obj.name} className={activeCategory === i ? styles.activeCategoryItem : styles.categoryItem}>
                    <img src={obj.url} alt={obj.name}/>
                    <li>{obj.name}</li>
                </ul>
            )))}
        </div>
    );
};



