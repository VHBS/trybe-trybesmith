import { ResultSetHeader } from 'mysql2/promise';
import { IUser } from '../interfaces/users';
import connection from './connection';

export default class UserModel {
  public connection;

  constructor() {
    this.connection = connection;
  }

  public create = async ({ username, classe, level, password }: IUser): Promise<number> => {
    const [{ insertId }] = await this.connection.execute<ResultSetHeader>(
      'INSERT INTO Trybesmith.Users (username, classe, level, password) VALUES (?, ?, ?, ?)', 
      [username, classe, level, password],
    );

    return insertId;
  };

  public authorization = async ({ username, password }: IUser): Promise<IUser[]> => {
    const [user] = await this.connection.execute(
      'SELECT * FROM Trybesmith.Users WHERE username = ? AND password = ?',
      [username, password],
    );

    return user as IUser[];
  };
}