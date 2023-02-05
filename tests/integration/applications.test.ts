import supertest from 'supertest';
import app from '../../src/app';
import applicationFactory from '../factories/applicationFactory';
import { prisma } from '../../src/database';
import { userFactory } from '../factories/userFactory';

beforeEach(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE "applications"  RESTART IDENTITY CASCADE`;
});

describe('Test POST /application/new', () => {
  it('Should return 201 if registered an application in the correct format', async () => {
    const { config } = await userFactory.loginUserFactory();

    const application = await applicationFactory();

    const result = await supertest(app).post(`/applications/new`).send(application).set(config);

    const createdApplication = await prisma.applications.findFirst({
      where: { companyName: application.companyName, roleName: application.roleName },
    });

    expect(result.status).toBe(201);
    expect(createdApplication).toEqual(
      expect.objectContaining({
        companyName: application.companyName,
        roleName: application.roleName,
        heardBack: application.heardBack,
        itsArchived: application.itsArchived,
        priority: application.priority,
        jobDescription: application.jobDescription,
        observations: application.observations,
      }),
    );
  });

  it('Should return 403 if registered an application without token', async () => {
    const application = await applicationFactory();

    const result = await supertest(app).post(`/applications/new`).send(application).set({});

    const createdApplication = await prisma.applications.findFirst({
      where: { companyName: application.companyName, roleName: application.roleName },
    });

    expect(result.status).toBe(403);
    expect(createdApplication).toBeNull();
  });
});

afterAll(async () => {
  await prisma.$disconnect();
});
