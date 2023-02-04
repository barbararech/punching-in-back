import { Request, Response } from 'express';
import * as authService from '../services/authService';

export async function signUp(req: Request, res: Response) {
  const { email, password, username } = req.body;

  await authService.signUp(email, password, username);
  return res.status(201).send('User registered successfully!');
}

export async function signIn(req: Request, res: Response) {
  const { email, password } = req.body;

  const token = await authService.signIn(email, password);
  return res.status(200).send({ token });
}
