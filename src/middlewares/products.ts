import { Request, Response, NextFunction } from 'express';
import create from '../validations/products';

export default class ProductsMiddleware {
  public createValidate; 

  constructor() {
    this.createValidate = create;
  }

  public create = async (req: Request, res: Response, next: NextFunction): 
  Promise<Response | void> => {
    try {
      const { name, amount } = req.body;
      const statusCode = !name || !amount ? 400 : 422;
      const { error } = this.createValidate.validate({ name, amount });
      if (error) return res.status(statusCode).json({ message: error.message });
      next();
    } catch (error) {
      next(error);
    }
  };
}