import React from 'react';
import styles from "./Count.module.scss";

type ICount = {
    count: number
}

export const Count:React.FC<ICount> = ({count}) => {
    return (
        <div className={styles.windowCartCount}>
            <img src="headerIcon/minus.svg" alt=""/>
            <p>{count}</p>
            <img src="headerIcon/plus.svg" alt=""/>
        </div>
    );
};

