import { ResultSetHeader } from 'mysql2/promise';
import { IOrder, IOrderCreate } from '../interfaces/orders';
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

  public create = async ({ productsIds, userId }: IOrderCreate): Promise<IOrderCreate> => {
    console.log(userId);
    await Promise.all(
      productsIds.map(async (id) => {
        const [{ insertId }] = await this.connection.execute<ResultSetHeader>(
          'INSERT INTO Trybesmith.Orders (userId) VALUES (?)',
          [userId],
        );
        
        await this.connection.execute(
          'UPDATE Trybesmith.Products SET orderId = ? WHERE id = ?',
          [insertId, id],
        );
        return insertId;
      }),
    );

    return { productsIds, userId };
  };
}