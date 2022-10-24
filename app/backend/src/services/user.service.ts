import * as bcrypt from 'bcryptjs';
import UnauthorizedError from '../errors/UnauthorizedError';
import TokenManager from '../helpers/TokenManager';
import IUsersRepository from '../repositories/IUsers.repository';

interface IRequest {
  email: string;
  password: string;
}

export default class UserService {
  private _usersRepository: IUsersRepository;

  constructor(usersRepository: IUsersRepository) {
    this._usersRepository = usersRepository;
  }

  public makeLogin = async ({ email, password }: IRequest) => {
    const user = await this._usersRepository.findByEmail(email);

    if (!user) throw new UnauthorizedError('Incorrect email or password');

    const verified = bcrypt.compareSync(password, user.password);

    if (!verified) throw new UnauthorizedError('Incorrect email or password');

    const token = TokenManager.makeToken(user);
    return token;
  };
}
