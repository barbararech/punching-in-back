import { Request, Response, NextFunction } from 'express';
import { AppError, errorTypeToStatusCode, isAppError } from '../utils/errorUtils';

/* eslint-disable-next-line */
export function errorHandlerMiddleware(err: Error | AppError, req: Request, res: Response, next: NextFunction) {
  if (isAppError(err)) {
    return res.status(errorTypeToStatusCode(err.type)).send(err.message);
  }

  return res.sendStatus(500);
}
