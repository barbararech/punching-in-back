import * as userRepository from "../repositories/userRepository";
import { INewUser } from "../types/userTypes";
import { conflictError, unauthorizedError } from "../utils/errorUtils";

export async function insertNewUser(user: INewUser) {
  await userRepository.insertNewUser(user);
  return;
}

export async function userIsAlreadyRegistered(email: string) {
  const user = await userRepository.findUserByEmail(email);

  if (user) {
    throw conflictError("This user is already registered!");
  }
  return;
}

export async function findUserByEmail(email: string) {
  const user = await userRepository.findUserByEmail(email);

  if (!user) {
    throw unauthorizedError("Unauthorized!");
  }
  return user;
}
