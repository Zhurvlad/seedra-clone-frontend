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
