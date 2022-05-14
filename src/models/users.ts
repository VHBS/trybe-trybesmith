import { ResultSetHeader } from 'mysql2/promise';
import jwt from 'jsonwebtoken';
import { IUser } from '../interfaces/users';
import connection from './connection';
import jwtConfig from '../jwt';

export default class UserModel {
  public connection;

  constructor() {
    this.connection = connection;
  }

  public create = async ({ username, classe, level, password }: IUser): Promise<string> => {
    const [{ insertId }] = await this.connection.execute<ResultSetHeader>(
      'INSERT INTO Trybesmith.Users (username, classe, level, password) VALUES (?, ?, ?, ?)', 
      [username, classe, level, password],
    );

    const token = jwt.sign({ data: { username, id: insertId } }, 'trybesmith', jwtConfig);

    return token;
  };
}