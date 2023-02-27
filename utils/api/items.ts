import axios, {AxiosInstance} from "axios";
import {IAddItems, IDataDto, IItems, IItemsDto} from "./types";

export class SearchItemsDto {
    title?: string;
    type?: string;
    limit?: number;
    take?: number;
    sort?: 'DESC' | 'ASC'
}

const instance = axios.create({
    baseURL: 'http://localhost:8888',
    params: {}
})


//Создаём функцию для запроса статей с БД
export const ItemsApi = (instance: AxiosInstance) => (
    {
        async getAll(page?: number): Promise<IDataDto> {
            const {data} = await instance.get<IDataDto>('/items', {
                params: {
                    page
                }
            })
            return data
        },
        /* async create(dto: CreateCommentDto) {
             const {data} = await instance.post('/comments', dto)
             return data
         },
         async remove(id: number) {
             await instance.delete<number>(`/comments/${id}`)
         }*/
        async getOne(id: number){
            const {data} = await instance.get(`/items/${id}`)
            return data
        },
        async search(query: SearchItemsDto) {
            const {data} = await instance.get<{ items: IItems[], totalCount: number }>(`/items/search`, {params: query})
            return data
        },
        async addProduct(dto: IAddItems) {
            const {data} = await instance.post<IAddItems>(`/items`, dto)
            return data
        },
    }
)