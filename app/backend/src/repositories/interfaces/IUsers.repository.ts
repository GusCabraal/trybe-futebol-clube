import { IUser } from '../../entities/IUser';

export default interface IUsersRepository {
  findByEmail(email: string): Promise<IUser | null>;
}
