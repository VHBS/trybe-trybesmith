import { Request, Response } from 'express';
import ProductService from '../services/products';

export default class ProductController {
  public service: ProductService;

  constructor() {
    this.service = new ProductService();
  }

  public getAll = async (_req: Request, res: Response): Promise<Response> => {
    const products = await this.service.getAll();
    return res.status(200).json(products);
  };

  public create = async (req: Request, res: Response): Promise<Response> => {
    const { name, amount } = req.body;
    const newProduct = await this.service.create({ name, amount });
    return res.status(201).json(newProduct);
  };
}