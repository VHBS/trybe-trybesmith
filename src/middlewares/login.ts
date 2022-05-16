import { Request, Response, NextFunction } from 'express';
import login from '../validations/login';

export default class LoginMiddleware {
  public loginValidate;

  constructor() {
    this.loginValidate = login;
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
}