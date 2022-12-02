enum ItemsEnum {
    ALL = 'ALL',
    BUNDLES = 'BUNDLES',
    HERBS = 'HERBS',
    VEGETABLES = 'VEGETABLES',
    FRUITS = 'FRUITS',
    SUPPLIES = 'SUPPLIES',
    FLOWERS = 'FLOWERS'

}

export interface IItemsDto {
    id: number
    imageUrl: string
    type: ItemsEnum[]
    price: string
    title: string
}

export interface IMeta {
    totalItems: number,
    itemCount: number,
    itemsPerPage: number,
    totalPages: number,
    currentPage: number
}

export interface IDataDto {
    items: IItemsDto[],
    meta: IMeta
}

export interface IAddItems {
    title: string,
    imageUrl: string,
    price: string,
    type: string
}

export interface ICartDto {
    itemsId: number,
    title: string,
    imageUrl: string,
    price: string
}


export type CreateUserDto = {
    fullName: string,
} & LoginDto

export type LoginDto = {
    email: string,
    password: string,
}

export interface ResponseCreateUser {
    id: number,
    email: string,
    fullName: string,
    access_token: string
}