import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import * as AuthTypes from '../types/authTypes';
import { forbiddenError } from '../utils/errorUtils';

export async function tokenValidationMiddleware(req: Request, res: Response, next: NextFunction) {
  const authorization = req.headers.authorization;
  const token = authorization?.replace('Bearer ', '').trim();

  if (!token) {
    throw forbiddenError('The server understood the request but refuses to authorize it!');
  }

  const { id } = jwt.verify(token, process.env.JWT_SECRET as string) as AuthTypes.JwtPayload;

  res.locals.id = id;
  next();
}

export const authValidationMiddleware = {
  tokenValidationMiddleware,
};
