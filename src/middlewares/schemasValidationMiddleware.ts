import { Request, Response, NextFunction } from 'express';
import { ObjectSchema } from 'joi';

export const middleware = (schema: ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const validation = schema.validate(req.body, { abortEarly: false });

    if (validation.error) {
      /* eslint-disable-next-line no-console */
      console.error('error', validation.error.details);
      throw { status: 422, message: 'Insert data correctly!' };
    }

    next();
  };
};
