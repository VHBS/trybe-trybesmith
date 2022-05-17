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
    const [user] = await this.model.authorization({ username, password });

    if (!user) {
      return {
        code: 401,
        message: { message: 'Username or password invalid' },
      };
    }
    // console.log(user.id);

    const token = jwt.sign({ data: { username, id: user.id } }, 'trybesmith', jwtConfig);
    return { code: 200, message: { token } };
  };
}