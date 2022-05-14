import { Request, Response, NextFunction } from 'express';
import create from '../validations/users';

export default class ValidateUsers {
  public createValidate;

  constructor() {
    this.createValidate = create;
  }

  public create = async (req: Request, res: Response, next: NextFunction): 
  Promise<Response | void> => {
    try {
      const { username, classe, level, password } = req.body;
  
      const { error } = this.createValidate.validate({ username, classe, level, password });
  
      if (error && error.message.includes('required')) { 
        return res.status(400).json({ message: error.message });
      } if (error) {
        return res.status(422).json({ message: error.message }); 
      }
      next();
    } catch (error) {
      next(error);
    }
  };
}