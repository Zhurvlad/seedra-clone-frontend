import React from 'react';
import {Header} from '../../components/Header';
import {CartComponent} from '../../components/Cart';
import {FullProduct} from '../../components/FullProduct';
import {Api} from '../../utils/api';
import {GetServerSideProps, NextPage} from 'next';
import {IItems} from '../../models/IItems';

interface WritePageProps {
    items: IItems
}

const FullProductPage:NextPage<WritePageProps> = ({items}) => {

    console.log(items.id)

    return <div className={'container'}>
        <Header/>
        <FullProduct items={items}/>
        {/* <Footer/>*/}
    </div>
};

export const getServerSideProps: GetServerSideProps = async ctx => {
    try {
        const postId = ctx.params.id
        const items = await Api(ctx).items.getOne(+postId)





        return {
            props: {
                items
            }
        }
    } catch (e) {

        return {
            props: {},

        }
    }
}

export default FullProductPage
