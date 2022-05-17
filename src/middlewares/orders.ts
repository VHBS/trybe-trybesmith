import { Request, Response, NextFunction } from 'express';
import order from '../validations/orders';

export default class OrderMiddleware {
  public orderValidate;

  constructor() {
    this.orderValidate = order;
  }

  public validate = async (req: Request, res: Response, next: NextFunction): 
  Promise<Response | void> => {
    try {
      const { productsIds } = req.body;

      const { error } = this.orderValidate.validate({ productsIds });

      if (error) {
        const codeValue = error.message.includes('required') ? 400 : 422;
        return res.status(codeValue).json({ message: error.message });
      }
      if (productsIds.length === 0) {
        return res.status(422)
          .json({ message: '"productsIds" must include only numbers' });
      }
      next();
    } catch (error) {
      next(error);
    }
  };
}