enum ItemsEnum {
    ALL = 'ALL',
    BUNDLES = 'BUNDLES',
    HERBS = 'HERBS',
    VEGETABLES = 'VEGETABLES',
    FRUITS = 'FRUITS',
    SUPPLIES = 'SUPPLIES',
    FLOWERS = 'FLOWERS'

}

export interface IItems {
    id: number
    imageUrl: string
    type: ItemsEnum[]
    price: string
    title: string
}

export interface IItemsDto {
   items: IItems[],
    totalCount: number
}

export interface IMeta {
    totalItems: number,
    itemCount: number,
    itemsPerPage: number,
    totalPages: number,
    currentPage: number
}

export interface IDataDto {
    items: IItems[],
    meta: IMeta[]
}

export interface IAddItems {
    title: string,
    imageUrl: string,
    price: string,
    type: string
}

export interface ICartDto {
    productId: number,
    title: string,
    imageUrl: string,
    price: number,
    quantity: number,
    subTotalPrice?: number
}


export type CreateUserDto = {
    fullName: string,
} & LoginDto & 'user'

export type LoginDto = {
    email: string,
    password: string,
}

export interface ResponseCreateUser {
    id: number,
    email: string,
    fullName: string,
    access_token: string,
}

export interface UserDto {
    id: number,
    email: string,
    fullName: string,
    createdAt: string,
    updatedAt: string
}

export interface ICart {
    _id?: number,
    items: ICartDto[],
    totalPrice?: number,
    totalCount?: number,
    user?:  UserDto[]
}