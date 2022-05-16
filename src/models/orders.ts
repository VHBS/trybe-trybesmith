import IOrder from '../interfaces/orders';
import connection from './connection';

export default class OrderModel {
  public connection;

  constructor() {
    this.connection = connection;
  }

  public getAll = async (): Promise<IOrder[]> => {
    const [orders] = await this.connection.execute('SELECT * FROM Trybesmith.Orders');

    const result = await Promise.all(Object.values(orders).map(async (order) => {
      const [products] = await this.connection.execute(
        'SELECT * FROM Trybesmith.Products WHERE orderId = ?',
        [order.id],
      );

      const productsIds = Object.values(products).map((product) => product.id);

      return { ...order, productsIds };
    }));

    return result as IOrder[];
  };
}