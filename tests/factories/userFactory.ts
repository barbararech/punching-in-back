import { faker } from '@faker-js/faker';
import { prisma } from '../../src/database';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export async function createUserFactory() {
  return {
    email: faker.internet.email(),
    username: faker.internet.userName(),
    password: faker.random.alpha(11),
  };
}

export async function createPrismaUserFactory() {
  const user = await createUserFactory();
  const passwordCrypt = bcrypt.hashSync(user.password, 10);

  const prismaUser = await prisma.users.create({
    data: { ...user, password: passwordCrypt },
  });

  return { user, prismaUser };
}

export async function loginUserFactory() {
  const { prismaUser } = await createPrismaUserFactory();

  const token = jwt.sign({ id: prismaUser.id }, process.env.JWT_SECRET as string);

  const config = { Authorization: `Bearer ${token}` };
  return { token, config };
}

export const userFactory = {
  createUserFactory,
  createPrismaUserFactory,
  loginUserFactory,
};
