import { Request, Response, NextFunction } from 'express';
import OrderService from '../services/orders';

export default class OrderController {
  public service: OrderService;

  constructor() {
    this.service = new OrderService();
  }

  public getAll = async (_req: Request, res: Response, next: NextFunction):
  Promise<Response | void> => {
    try {
      const result = await this.service.getAll();
      return res.status(result.code).json(result.orders);
    } catch (error) {
      next(error);
    }
  };
}