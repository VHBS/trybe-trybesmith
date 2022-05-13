import { IProduct } from '../interfaces/product';
import ProductModel from '../models/products';

export default class ProductService {
  public model: ProductModel;

  constructor() {
    this.model = new ProductModel();
  }

  public getAll = async (): Promise<IProduct[]> => {
    const products = await this.model.getAll();
    return products;
  };

  public create = async ({ name, amount }: IProduct): Promise<IProduct> => {
    const newProduct = await this.model.create({ name, amount });
    return newProduct;
  };
}