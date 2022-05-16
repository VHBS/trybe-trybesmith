import jwt from 'jsonwebtoken';
import UserModel from '../models/users';
import jwtConfig from '../jwt';
import { IUser } from '../interfaces/users';
import { IServiceMessage } from '../interfaces/services';

export default class LoginService {
  public model: UserModel;

  constructor() {
    this.model = new UserModel();
  }

  public getToken = async ({ username, password }: IUser):Promise<IServiceMessage> => {
    const products = await this.model.authorization({ username, password });

    if (products.length === 0) {
      return {
        code: 401,
        message: { message: 'Username or password invalid' },
      };
    }

    const token = jwt.sign({ data: username }, 'trybesmith', jwtConfig);
    return { code: 200, message: { token } };
  };
}