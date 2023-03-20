import React from 'react';
import {FullProduct} from '../../components/FullProduct';
import {Api} from '../../utils/api';
import { GetServerSidePropsContext, NextPage} from 'next';
import {IItems} from '../../models/IItems';
import {withLayout} from "../../layout/Layout";

interface WritePageProps {
    items?: IItems
}

const FullProductPage:NextPage<WritePageProps> = ({items}) => {

    if(!items) return <div>Произошла ошибка при загрузки товара</div>

    return <FullProduct items={items}/>
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
    try {

        if(ctx.params){
            const postId = ctx.params.id
            if(postId){
                const items = await Api(ctx).items.getOne(+postId)

                return {
                    props: {
                        items
                    }
                }
            }
        }

    } catch (e) {

        return {
            props: {},

        }
    }
}


export default withLayout(FullProductPage)
