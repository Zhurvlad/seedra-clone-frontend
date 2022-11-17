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
