import { prisma } from "../database";
import { INewUser } from "../types/userTypes";

export async function findUserByEmail(email: string) {
  return prisma.users.findFirst({
    where: { email },
  });
}

export async function findUserById(id: number) {
  return prisma.users.findFirst({
    where: { id },
  });
}

export async function insertNewUser(user: INewUser) {
  return prisma.users.create({
    data: user,
  });
}
