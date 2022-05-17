import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import login from '../validations/login';
import order from '../validations/orders';
import ITokenInterface from '../interfaces/token';
import UserService from '../services/users';

export default class LoginMiddleware {
  public loginValidate;

  public orderValidate;

  public userService;

  constructor() {
    this.loginValidate = login;
    this.orderValidate = order;
    this.userService = new UserService();
  }

  public validate = async (req: Request, res: Response, next: NextFunction): 
  Promise<Response | void> => {
    try {
      const { username, password } = req.body;
  
      const { error } = this.loginValidate.validate({ username, password });
  
      if (error) { 
        return res.status(400).json({ message: error.message });
      }
      next();
    } catch (error) {
      next(error);
    }
  };

  public authorization = async (req: Request, res: Response, next: NextFunction): 
  Promise<Response | void> => {
    try {
      const { authorization } = req.headers;
      if (!authorization) return res.status(401).json({ message: 'Token not found' });

      const user = jwt.verify(authorization, 'trybesmith') as ITokenInterface;
      
      req.userId = user.data.id;

      next();
    } catch (error) {
      return res.status(401).json({ message: 'Invalid token' });
    }
  };
}