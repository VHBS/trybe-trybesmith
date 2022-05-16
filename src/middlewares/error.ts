import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';

export default class ErrorMiddleware {
  public server = async (
    err:ErrorRequestHandler, 
    _req: Request, 
    res: Response, 
    _next: NextFunction,
  ): 
  Promise<Response> => {
    console.log(err);
    return res.status(500).json({ message: 'Erro inesperado' });
  };
}