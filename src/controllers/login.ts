import { Request, Response, NextFunction } from 'express';
import LoginService from '../services/login';

export default class LoginController {
  public service: LoginService;

  constructor() {
    this.service = new LoginService();
  }

  public authorization = async (req: Request, res: Response, next: NextFunction): 
  Promise<Response | void> => {
    try {
      const { username, password } = req.body;
      const result = await this.service.getToken({ username, password });
      return res.status(result.code).json(result.message);
    } catch (error) {
      next(error);
    }
  };
}