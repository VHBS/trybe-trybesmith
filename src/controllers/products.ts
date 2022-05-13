import { Request, Response } from 'express';
import ProductModel from '../models/products';
import ProductService from '../services/products';

export default class ProductController {
  public service: ProductService;

  public model: ProductModel;

  constructor() {
    this.service = new ProductService();
    this.model = new ProductModel();
  }

  public getAll = async (_req: Request, res: Response): Promise<Response> => {
    const products = await this.model.getAll();
    return res.status(200).json(products);
  };
}