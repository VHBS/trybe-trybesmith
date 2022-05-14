import { IUser } from '../interfaces/users';
import UserModel from '../models/users';

export default class UserService {
  public model: UserModel;

  constructor() {
    this.model = new UserModel();
  }

  public create = async ({ username, classe, level, password }: IUser): Promise<string> => {
    const token = await this.model.create({ username, classe, level, password });
    return token;
  };
}