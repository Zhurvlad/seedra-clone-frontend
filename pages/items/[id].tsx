import React from 'react';
import {FullProduct} from '../../components/FullProduct';
import {Api} from '../../utils/api';
import {GetServerSideProps, NextPage} from 'next';
import {IItems} from '../../models/IItems';
import {withLayout} from "../../layout/Layout";

interface WritePageProps {
    items: IItems
}

const FullProductPage:NextPage<WritePageProps> = ({items}) => {



    return <FullProduct items={items}/>


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


export default withLayout(FullProductPage)
