import React, {DetailedHTMLProps, HTMLAttributes} from 'react';
import styles from "./Category.module.scss";

export const availableCategory = [
    {name: 'All', url: 'headerIcon/treeLeaf.svg'},
    {name: 'BUNDLES', url: 'headerIcon/bread.svg'},
    {name: 'HERBS', url: 'headerIcon/oakLeaf.svg'},
    {name: 'VEGETABLES', url: 'headerIcon/potato.svg'},
    {name: 'FRUITS', url: 'headerIcon/strawsberry.svg'},
    {name: 'SUPPLIES', url: 'headerIcon/tableware.svg'},
    {name: 'FLOWERS', url: 'headerIcon/flower.svg'}
]

interface CategoryProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>{
    activeCategory: number,
    setActiveCategory: (i: number) => void
}

export const Category:React.FC<CategoryProps> = ({activeCategory, setActiveCategory}):JSX.Element => {



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



