import { faker } from '@faker-js/faker';
import { prisma } from '../../src/database';
import { loginUserFactory } from './userFactory';

export async function createApplicationFactory() {
  const priority = 'high' as const; // For string to be equal to ApplicationType enum

  return {
    companyName: faker.company.name(),
    roleName: faker.name.jobTitle(),
    heardBack: true,
    itsArchived: false,
    priority: priority,
    jobDescription: faker.internet.url(),
    observations: faker.lorem.paragraph(),
  };
}

export async function createPrismaApplicationFactory() {
  const { prismaUser, config } = await loginUserFactory();
  const application = await createApplicationFactory();

  const prismaApplication = await prisma.applications.create({
    data: { ...application, userId: prismaUser.id },
  });

  return { application, prismaApplication, prismaUser, config };
}

export async function createApplicationCollectionFactory() {
  const { prismaUser, config } = await loginUserFactory();
  let count = 0;

  while (count < 3) {
    const application = await createApplicationFactory();

    await prisma.applications.create({
      data: { ...application, userId: prismaUser.id },
    });

    count++;
  }

  return { prismaUser, config };
}

export const applicationFactory = {
  createApplicationFactory,
  createPrismaApplicationFactory,
  createApplicationCollectionFactory,
};
