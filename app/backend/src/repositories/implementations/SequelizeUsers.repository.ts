import UserModel from '../../database/models/User';
import { IUser } from '../../entities/IUser';
import IUsersRepository from '../interfaces/IUsers.repository';

export default class SequelizeUsersRepository implements IUsersRepository {
  private _model = UserModel;

  public findByEmail = async (email: string) => {
    const sequelizeUser = await this._model.findOne({ where: { email } });

    if (!sequelizeUser) return null;

    const user: IUser = {
      id: sequelizeUser.id,
      username: sequelizeUser.username,
      role: sequelizeUser.role,
      email: sequelizeUser.email,
      password: sequelizeUser.password,
    };

    return user;
  };
}
