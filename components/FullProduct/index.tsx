import React from 'react';
import styles from './FullProduct.module.scss'
import {IItems} from '../../models/IItems';

interface FullProductProps {
    items: IItems
}

export const FullProduct:React.FC<FullProductProps> = ({items}) => {



    return (
        <div >
            <div className={styles.fullPage}>
                <div className={styles.leftBlock}>
                    <img src={items.imageUrl} alt=""/>
                </div>
                <div className={styles.rightBlock}>
                   <div className={styles.rightBlockTop}>
                       <h3>{items.title}</h3>
                       <p>{items.type}</p>
                   </div>
                    <div className={styles.rightBlockBottom}>
                        <p>
                            $ {items.price}
                        </p>
                        <div className={styles.addToCart}>
                            Add to cart
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.productInfo}>
                <h1>Product information.</h1>
                <div className={styles.productInfoText}>
                    <ul>
                        <li>SEEDRA Cilantro Seeds - contains 300 seeds in 1 Pack and professional instructions created by PhD Helga George</li>
                        <li>Be sure of our quality - the freshest batches of this season. Non-GMO, Heirloom - our seeds were tested and have the best germination ratings. Your easy growing experience is our guarantee</li>
                        <li>Cilantro common culinary uses: salsa, guacamole, pesto, salads, chutney, baked breads, pad thai, pico de gallo, rice, grilled shrimp skewers, falafel, and more</li>
                        <li>Proudly sourced in the USA - our garden seeds are grown, harvested, and packaged in the USA. We support local farmers and are happy to produce this American-made product</li>
                        <li>SEEDRA customer service - please contact us directly through Amazon with any questions or concerns about our products. We care about each customer and do our best to provide you with 100% satisfaction</li>
                    </ul>
                    <div className={styles.productInfoDelivery}>
                        <div className={styles.productInfoDeliveryText}>
                            <p>Package Dimensions</p>
                            <p>5.51 x 3.5 x 0.35 inches</p>
                        </div>
                        <div className={styles.productInfoDeliveryText}>
                            <p>Item Weight</p>
                            <p>0.317 ounces</p>
                        </div>
                        <div className={styles.productInfoDeliveryText}>
                            <p>ASIN</p>
                            <p>B08Z3HN5MP</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

