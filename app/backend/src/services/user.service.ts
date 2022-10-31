import * as bcrypt from 'bcryptjs';
import { ILoginDTO } from '../entities/IUser';
import { UnauthorizedError } from '../errors';
import TokenManager from '../helpers/TokenManager';
import IUsersRepository from '../repositories/IUsers.repository';

export default class UserService {
  private _usersRepository: IUsersRepository;

  constructor(usersRepository: IUsersRepository) {
    this._usersRepository = usersRepository;
  }

  public makeLogin = async ({ email, password }: ILoginDTO) => {
    const user = await this._usersRepository.findByEmail(email);

    if (!user) throw new UnauthorizedError('Incorrect email or password');

    const verified = await bcrypt.compareSync(password, user.password);

    if (!verified) throw new UnauthorizedError('Incorrect email or password');

    const token = TokenManager.makeToken(user);
    return token;
  };

  public loginValidate = async (token:string) => {
    const { role } = await TokenManager.decodeToken(token);
    return role;
  };
}
