import Product from '../interfaces/product';
import ProductModel from '../models/products';

export default class ProductService {
  public model: ProductModel;

  constructor() {
    this.model = new ProductModel();
  }

  public getAll = async (): Promise<Product[]> => {
    const products = await this.model.getAll();
    console.log(products);
    return products;
  };
}