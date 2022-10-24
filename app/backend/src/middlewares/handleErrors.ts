import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import UnauthorizedError from '../errors/UnauthorizedError';
import ValidationError from '../errors/ValidationError';

const handleErrors = (err: Error, req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof ValidationError) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
  }

  if (err instanceof UnauthorizedError) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: err.message });
  }

  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
};

export default handleErrors;
