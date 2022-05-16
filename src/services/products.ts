import { IProduct } from '../interfaces/product';
import { IServiceProduct } from '../interfaces/services';
import ProductModel from '../models/products';

export default class ProductService {
  public model: ProductModel;

  constructor() {
    this.model = new ProductModel();
  }

  public getAll = async (): Promise<IServiceProduct> => {
    const products = await this.model.getAll();

    return { code: 200, products };
  };

  public create = async ({ name, amount }: IProduct): Promise<IServiceProduct> => {
    const products = await this.model.create({ name, amount });
    return { code: 201, products };
  };
}