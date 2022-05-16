import jwt from 'jsonwebtoken';
import { IUser } from '../interfaces/users';
import UserModel from '../models/users';
import jwtConfig from '../jwt';

export default class UserService {
  public model: UserModel;

  constructor() {
    this.model = new UserModel();
  }

  public create = async ({ username, classe, level, password }: IUser): Promise<string> => {
    const insertId = await this.model.create({ username, classe, level, password });

    const token = jwt.sign({ data: { username, id: insertId } }, 'trybesmith', jwtConfig);

    return token;
  };
}