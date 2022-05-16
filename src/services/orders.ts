import { IServiceOrder } from '../interfaces/services';
import OrderModel from '../models/orders';

export default class OrderService {
  public model: OrderModel;

  constructor() {
    this.model = new OrderModel();
  }

  public getAll = async ():Promise<IServiceOrder> => {
    const orders = await this.model.getAll();
    return { code: 200, orders };
  };
}