export interface IOrder {
  id?: number
  userId: number
  productsIds: number[]
}

export interface IOrderCreate {
  productsIds: number[]
  userId: number
}