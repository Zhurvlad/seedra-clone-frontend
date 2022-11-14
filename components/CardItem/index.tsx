import React from 'react';
import s from './body/sliderImage.png'
import styles from './CardItem.module.scss'


export const CardItem:React.FC = () => {
    const [addedFavorite, setAddedFavorite] = React.useState(false)
    const [addedCart, setAddedCart] = React.useState(false)

    return (
        <div className={styles.card}>
            <div className={styles.cardItem}>
                <div className={styles.img}>
                    <img src="/body/sliderImage1.png" alt="Seedra Cilantro Seeds for Planting Indoor and Outdoor"/>
                </div>
                <div onClick={() => setAddedFavorite(!addedFavorite)} className={styles.heart}>
                    <img src={addedFavorite ? "headerIcon/yellowHeartFull.svg" : "headerIcon/yellowHeart.svg"} alt=""/>
                </div>
                <div className={styles.rating}>
                    <img src="headerIcon/yellowStar.svg" alt=""/>
                    <img src="headerIcon/yellowStar.svg" alt=""/>
                    <img src="headerIcon/yellowStar.svg" alt=""/>
                    <img src="headerIcon/yellowStar.svg" alt=""/>
                    <img src="headerIcon/yellowStar.svg" alt=""/>
                    <p>(123)</p>
                </div>
                <h5 className={styles.text}>
                    Seedra Cilantro Seeds for Planting Indoor and Outdoor
                </h5>
                <div className={styles.price}>
                    <p>$12.56</p>
                    <div  onClick={() => setAddedCart(!addedCart)} className={addedCart ? styles.active : styles.priceCart}>
                        <img  src={addedCart ? 'headerIcon/whiteCart.svg' : "headerIcon/cartSimple.svg"} alt="cart"/>
                    </div>
                </div>
            </div>
            <div className={styles.cardItem}>
                <div className={styles.img}>
                    <img src="/body/sliderImage1.png" alt="Seedra Cilantro Seeds for Planting Indoor and Outdoor"/>
                </div>
                <div className={styles.heart}>
                    <img src="headerIcon/yellowHeart.svg" alt=""/>
                </div>
                <div className={styles.rating}>
                    <img src="headerIcon/yellowStar.svg" alt=""/>
                    <img src="headerIcon/yellowStar.svg" alt=""/>
                    <img src="headerIcon/yellowStar.svg" alt=""/>
                    <img src="headerIcon/yellowStar.svg" alt=""/>
                    <img src="headerIcon/yellowStar.svg" alt=""/>
                    <p>(123)</p>
                </div>
                <h5 className={styles.text}>
                    Seedra Cilantro Seeds for Planting Indoor and Outdoor
                </h5>
                <div className={styles.price}>
                    <p>$12.56</p>
                    <div className={styles.priceCart}>
                        <img src="headerIcon/cartSimple.svg" alt="cart"/>
                    </div>
                </div>
            </div>
            <div className={styles.cardItem}>
                <div className={styles.img}>
                    <img src="/body/sliderImage1.png" alt="Seedra Cilantro Seeds for Planting Indoor and Outdoor"/>
                </div>
                <div className={styles.heart}>
                    <img src="headerIcon/yellowHeart.svg" alt=""/>
                </div>
                <div className={styles.rating}>
                    <img src="headerIcon/yellowStar.svg" alt=""/>
                    <img src="headerIcon/yellowStar.svg" alt=""/>
                    <img src="headerIcon/yellowStar.svg" alt=""/>
                    <img src="headerIcon/yellowStar.svg" alt=""/>
                    <img src="headerIcon/yellowStar.svg" alt=""/>
                    <p>(123)</p>
                </div>
                <h5 className={styles.text}>
                    Seedra Cilantro Seeds for Planting Indoor and Outdoor
                </h5>
                <div className={styles.price}>
                    <p>$12.56</p>
                    <div className={styles.priceCart}>
                        <img src="headerIcon/cartSimple.svg" alt="cart"/>
                    </div>
                </div>
            </div>
            <div className={styles.cardItem}>
                <div className={styles.img}>
                    <img src="/body/sliderImage1.png" alt="Seedra Cilantro Seeds for Planting Indoor and Outdoor"/>
                </div>
                <div className={styles.heart}>
                    <img src="headerIcon/yellowHeart.svg" alt=""/>
                </div>
                <div className={styles.rating}>
                    <img src="headerIcon/yellowStar.svg" alt=""/>
                    <img src="headerIcon/yellowStar.svg" alt=""/>
                    <img src="headerIcon/yellowStar.svg" alt=""/>
                    <img src="headerIcon/yellowStar.svg" alt=""/>
                    <img src="headerIcon/yellowStar.svg" alt=""/>
                    <p>(123)</p>
                </div>
                <h5 className={styles.text}>
                    Seedra Cilantro Seeds for Planting Indoor and Outdoor
                </h5>
                <div className={styles.price}>
                    <p>$12.56</p>
                    <div className={styles.priceCart}>
                        <img src="headerIcon/cartSimple.svg" alt="cart"/>
                    </div>
                </div>
            </div>
            <div className={styles.cardItem}>
                <div className={styles.img}>
                    <img src="/body/sliderImage1.png" alt="Seedra Cilantro Seeds for Planting Indoor and Outdoor"/>
                </div>
                <div className={styles.heart}>
                    <img src="headerIcon/yellowHeart.svg" alt=""/>
                </div>
                <div className={styles.rating}>
                    <img src="headerIcon/yellowStar.svg" alt=""/>
                    <img src="headerIcon/yellowStar.svg" alt=""/>
                    <img src="headerIcon/yellowStar.svg" alt=""/>
                    <img src="headerIcon/yellowStar.svg" alt=""/>
                    <img src="headerIcon/yellowStar.svg" alt=""/>
                    <p>(123)</p>
                </div>
                <h5 className={styles.text}>
                    Seedra Cilantro Seeds for Planting Indoor and Outdoor
                </h5>
                <div className={styles.price}>
                    <p>$12.56</p>
                    <div className={styles.priceCart}>
                        <img src="headerIcon/cartSimple.svg" alt="cart"/>
                    </div>
                </div>
            </div>
            <div className={styles.cardItem}>
                <div className={styles.img}>
                    <img src="/body/sliderImage1.png" alt="Seedra Cilantro Seeds for Planting Indoor and Outdoor"/>
                </div>
                <div className={styles.heart}>
                    <img src="headerIcon/yellowHeart.svg" alt=""/>
                </div>
                <div className={styles.rating}>
                    <img src="headerIcon/yellowStar.svg" alt=""/>
                    <img src="headerIcon/yellowStar.svg" alt=""/>
                    <img src="headerIcon/yellowStar.svg" alt=""/>
                    <img src="headerIcon/yellowStar.svg" alt=""/>
                    <img src="headerIcon/yellowStar.svg" alt=""/>
                    <p>(123)</p>
                </div>
                <h5 className={styles.text}>
                    Seedra Cilantro Seeds for Planting Indoor and Outdoor
                </h5>
                <div className={styles.price}>
                    <p>$12.56</p>
                    <div className={styles.priceCart}>
                        <img src="headerIcon/cartSimple.svg" alt="cart"/>
                    </div>
                </div>
            </div>

        </div>
    );
};

