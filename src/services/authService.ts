import * as userService from '../services/userService';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Users } from '@prisma/client';
import { unauthorizedError } from '../utils/errorUtils';

export async function signUp(email: string, password: string, username: string) {
  const passwordCrypt = bcrypt.hashSync(password, 10);
  const user = { email, password: passwordCrypt, username };

  await userService.userIsAlreadyRegistered(email);
  await userService.insertNewUser(user);

  return;
}

export async function signIn(email: string, password: string) {
  const user = await userService.findUserByEmail(email);
  await checkPassword(user, password);

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string);
  return token;
}

export async function checkPassword(user: Users, password: string) {
  const checkPassword = bcrypt.compareSync(password, user.password);

  if (!checkPassword) {
    throw unauthorizedError('Unauthorized!');
  }
  return;
}

export const authService = {
  signUp,
  signIn,
  checkPassword,
};
