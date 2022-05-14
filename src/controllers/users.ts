import { Request, Response, NextFunction } from 'express';
import UserService from '../services/users';

export default class UserController {
  public service: UserService;

  constructor() {
    this.service = new UserService();
  }

  public create = async (req: Request, res: Response, next: NextFunction): 
  Promise<Response | void> => {
    try {
      const { username, classe, level, password } = req.body;
      const token = await this.service.create({ username, classe, level, password });
      return res.status(201).json({ token });
    } catch (error) {
      next(error);
    }
  };
}