import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

import { IUserDTO } from '../entities/IUser';
import TokenManager from '../helpers/TokenManager';

const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Token not found' });
  }

  const data = (await TokenManager.decodeToken(token)) as IUserDTO;

  if (!data) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: 'Token must be a valid token' });
  }

  return next();
};

export default authenticate;
