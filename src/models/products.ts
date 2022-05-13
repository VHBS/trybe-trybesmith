import Product from '../interfaces/product';
import connection from './connection';

export default class ProductModel {
  public connection;

  constructor() {
    this.connection = connection;
  }

  public getAll = async (): Promise<Product[]> => {
    const [result] = await this.connection.execute('SELECT * FROM Trybesmith.Products');

    return result as Product[];
  };
}