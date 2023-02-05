import { faker } from '@faker-js/faker';
import { prisma } from '../../src/database';
import bcrypt from 'bcrypt';

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

export const userFactory = {
  createUserFactory,
  createPrismaUserFactory,
};
