import { ResultSetHeader } from 'mysql2/promise';
import { IProduct } from '../interfaces/product';
import connection from './connection';

export default class ProductModel {
  public connection;

  constructor() {
    this.connection = connection;
  }

  public getAll = async (): Promise<IProduct[]> => {
    const [result] = await this.connection.execute('SELECT * FROM Trybesmith.Products');

    return result as IProduct[];
  };

  public create = async ({ name, amount }: IProduct): Promise<IProduct> => {
    const [{ insertId }] = await this.connection.execute<ResultSetHeader>(
      'INSERT INTO Trybesmith.Products (name, amount) VALUES (?, ?)', 
      [name, amount],
    );

    return { id: insertId, name, amount };
  };
}