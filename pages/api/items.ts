import axios from "axios";
import {IItemsDto} from "./types";

export class SearchItemsDto {
    title?: string;
    type?: string;
    limit?: number;
    take?: number;
    sort?: 'DESC' | 'ASC'
}

const instance = axios.create({
    baseURL: 'http://localhost:8888',
})


//Создаём функцию для запроса статей с БД
export const ItemsApi = () => (
    {
        async getAll(): Promise<IItemsDto[]> {
            const {data} = await instance.get<IItemsDto[]>('/items')
            return data
        },
       /* async create(dto: CreateCommentDto) {
            const {data} = await instance.post('/comments', dto)
            return data
        },
        async remove(id: number) {
            await instance.delete<number>(`/comments/${id}`)
        }*/
        async search(query: SearchItemsDto) {
            const {data} = await instance.get<{items: IItemsDto[]}>(`/items/search`, {params: query})
            return data
        },
    }
)