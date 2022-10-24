import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import ValidationError from '../errors/ValidationError';
import UserService from '../services/user.service';

export default class UserController {
  private _userService: UserService;

  constructor(userService: UserService) {
    this._userService = userService;
  }

  public makeLogin = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new ValidationError('All fields must be filled');
    }

    const token = await this._userService.makeLogin({ email, password });
    return res.status(StatusCodes.OK).json({ token });
  };
}
