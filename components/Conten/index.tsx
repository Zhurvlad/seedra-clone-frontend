import React from 'react';
import styles from './Content.module.scss'
import {CardItem} from "../CardItem";

const availableCategory = [
    {name: 'All', url: 'headerIcon/treeLeaf.svg'},
    {name: 'BUNDLES', url: 'headerIcon/bread.svg'},
    {name: 'HERBS', url: 'headerIcon/oakLeaf.svg'},
    {name: 'VEGETABLES', url: 'headerIcon/potato.svg'},
    {name: 'FRUITS', url: 'headerIcon/strawsberry.svg'},
    {name: 'SUPPLIES', url: 'headerIcon/tableware.svg'},
    {name: 'FLOWERS', url: 'headerIcon/flower.svg'}
]

export const Content: React.FC = () => {
    const [activeCategory, setActiveCategory] = React.useState(false)

    return (
        <div className={styles.content}>
            <div className={styles.header}>
                <h2 className={styles.text}>Our products</h2>
                <button className={styles.button}>
                    View all (12)
                </button>
            </div>
            <div className={styles.category}>
                {availableCategory.map((obj => (
                    <ul onClick={() => setActiveCategory(!activeCategory)} key={obj.name} className={activeCategory ? styles.activeCategoryItem : styles.categoryItem}>
                        <img src={obj.url} alt={obj.name}/>
                        <li>{obj.name}</li>
                    </ul>
                )))}
            </div>
            <div>
                <CardItem/>
            </div>
        </div>
    );
};

