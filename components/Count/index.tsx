import React from 'react';
import styles from "./Count.module.scss";

export const Count:React.FC = () => {
    return (
        <div className={styles.windowCartCount}>
            <img src="headerIcon/minus.svg" alt=""/>
            <p>2</p>
            <img src="headerIcon/plus.svg" alt=""/>
        </div>
    );
};

