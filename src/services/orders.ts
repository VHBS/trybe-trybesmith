import IOrder from '../interfaces/orders';
import OrderModel from '../models/orders';

export default class OrderService {
  public model: OrderModel;

  constructor() {
    this.model = new OrderModel();
  }

  public getAll = async ():Promise<IOrder[]> => {
    const products = await this.model.getAll();
    return products;
  };
}