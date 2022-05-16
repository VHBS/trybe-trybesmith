import IOrder from './orders';
import { IProduct } from './product';

type Message = { message: string };
type Token = { token: string };

export interface IServiceMessage {
  code: number
  message: Message | Token 
}

export interface IServiceOrder {
  code: number
  orders: IOrder[]
}

export interface IServiceProduct {
  code: number
  products: IProduct[] | IProduct
}
