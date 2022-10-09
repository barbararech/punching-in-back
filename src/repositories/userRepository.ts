import { prisma } from "../database";
import { INewUser } from "../types/userTypes";

async function findUserByEmail(email: string) {
  return prisma.users.findFirst({
    where: { email },
  });
}

async function findUserById(id: number) {
  return prisma.users.findFirst({
    where: { id },
  });
}

async function insertNewUser(user: INewUser) {
  return prisma.users.create({
    data: user,
  });
}

export const userRepository = {
  findUserByEmail,
  findUserById,
  insertNewUser,
};
