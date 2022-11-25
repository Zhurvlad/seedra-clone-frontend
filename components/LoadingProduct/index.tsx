import React from 'react';
import styles from './LoadingProduct.module.scss'
import {ItemsApi} from "../../pages/api/items";

type LoadingProductProps = {
    admin: boolean
    setAdmin: (b: boolean) => void
}

export const LoadingProduct:React.FC<LoadingProductProps> = ({admin, setAdmin}) => {
    const [imageUrl, setImageUrl] = React.useState('')
    const [price, setPrice] = React.useState('')
    const [description, setDescription] = React.useState('')
    const [type, setType] = React.useState('')

    const onAddProduct = async () => {
        const obj = {
            imageUrl: imageUrl,
            title: description,
            price,
            type
        }
     await ItemsApi().addProduct(obj)

    }

    return (
        <div style={admin ? {display: "inherit"} : {display: 'none'}} className={styles.overlay}>
            <div  className={styles.onLogin}>
                <h3>Админка</h3>
                <p>Это админка для загрузки товаров</p>
                <div className={styles.promocode}>
                    <p>ImageUrl</p>
                    <input value={imageUrl} onChange={(e) => setImageUrl(e.target.value)}   type="text" placeholder={'ImageUrl'}/>

                </div>
                <div className={styles.promocode}>
                    <p>Price</p>
                    <input value={price} onChange={(e) => setPrice(e.target.value)}  type="text" placeholder={'Price'}/>

                </div>
                <div className={styles.promocode}>
                    <p>Description</p>
                    <input value={description} onChange={(e) => setDescription(e.target.value)}   type="text" placeholder={'Description'}/>

                </div>
                <div className={styles.promocode}>
                    <p>Type</p>
                    <input value={type} onChange={(e) => setType(e.target.value)}   type="text" placeholder={'Type'}/>

                </div>
                {/*<div className={styles.promocode}>
                <p>Repeat the password</p>
                <input type="text" placeholder={'Repeat the password'}/>
            </div>*/}
                <div onClick={onAddProduct} className={styles.button}>
                    <button className={styles.login}>Add product</button>
                </div>
                <img onClick={() => setAdmin(false)}  src="headerIcon/closed.svg" alt="closed"/>
            </div>
        </div>
    );
};

