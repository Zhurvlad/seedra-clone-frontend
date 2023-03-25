import React, {DetailedHTMLProps, HTMLAttributes} from 'react';

import AllSVG from './treeLeaf.svg'
import BundlesSVG from './bread.svg'
import HerbsSVG from './oakLeaf.svg'
import VegetablesSVG from './potato.svg'
import FruitsSVG from './strawsberry.svg'
import SuppliesSVG from './tableware.svg'
import FlowersSVG from './flower.svg'

import styles from "./Category.module.scss";

export const availableCategory = [
    {name: 'All', component: <AllSVG className={styles.size24}/>},
    {name: 'BUNDLES', component: <BundlesSVG className={styles.size24}/>},
    {name: 'HERBS', component: <HerbsSVG className={styles.size28}/>},
    {name: 'VEGETABLES', component: <VegetablesSVG className={styles.size24}/>},
    {name: 'FRUITS', component: <FruitsSVG className={styles.size28}/>},
    {name: 'SUPPLIES', component: <SuppliesSVG className={styles.size24}/>},
    {name: 'FLOWERS', component: <FlowersSVG className={styles.size24}/>}
]

interface CategoryProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>{
    activeCategory: number,
    setActiveCategory: (i: number) => void
}

export const Category:React.FC<CategoryProps> = ({activeCategory, setActiveCategory}):JSX.Element => {



    return (
        <div className={styles.category}>
            {availableCategory.map(((obj, i) => (
                <ul
                    key={obj.name}
                    onClick={() => setActiveCategory(i)}
                    className={activeCategory === i ? styles.activeCategoryItem : styles.categoryItem}>
                    {obj.component}
                    <li>{obj.name}</li>
                </ul>
            )))}
        </div>
    );
};



