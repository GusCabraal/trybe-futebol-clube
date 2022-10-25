import { ErrorRequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';

const handleErrors: ErrorRequestHandler = (err, _req, res, _next) => {
  if (err.status) {
    return res.status(err.status).json({ message: err.message });
  }

  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
};

export default handleErrors;
