import supertest from 'supertest';
import app from '../../src/app';
import { applicationFactory, createApplicationFactory } from '../factories/applicationFactory';
import { prisma } from '../../src/database';
import { userFactory } from '../factories/userFactory';
import { Applications } from '@prisma/client';

beforeEach(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE "applications"  RESTART IDENTITY CASCADE`;
});

describe('Test GET /applications', () => {
  it('Should return 200 if get unarchived applications correctly', async () => {
    const { config } = await applicationFactory.createApplicationCollectionFactory();

    const result = await supertest(app).get(`/applications`).set(config);

    const unarchivedApplications = result.body.applications.filter(
      (application: Applications) => application.itsArchived === false,
    );

    if (unarchivedApplications.length !== 0) {
      expect(result.body.applications[0]).toEqual(
        expect.objectContaining({
          itsArchived: false,
        }),
      );
    }
    expect(result.status).toBe(200);
    expect(result.body.applications).toHaveLength(unarchivedApplications.length);
  });

  it('Should return 403 if get unarchived applications without send token', async () => {
    await applicationFactory.createApplicationCollectionFactory();

    const result = await supertest(app).get(`/applications`).set({});

    expect(result.status).toBe(403);
  });
});

describe('Test GET /applications/:id/view', () => {
  it('Should return 200 if get application correctly', async () => {
    const { prismaApplication, config } = await applicationFactory.createPrismaApplicationFactory();

    const result = await supertest(app).get(`/applications/${prismaApplication.id}/view`).set(config);

    expect(result.status).toBe(200);
    expect(result.body.application).toEqual(
      expect.objectContaining({
        companyName: prismaApplication.companyName,
        roleName: prismaApplication.roleName,
        heardBack: prismaApplication.heardBack,
        itsArchived: prismaApplication.itsArchived,
        priority: prismaApplication.priority,
        jobDescription: prismaApplication.jobDescription,
        observations: prismaApplication.observations,
      }),
    );
  });

  it('Should return 403 if get application without send token', async () => {
    const { prismaApplication } = await applicationFactory.createPrismaApplicationFactory();

    const result = await supertest(app).get(`/applications/${prismaApplication.id}/view`).set({});

    expect(result.status).toBe(403);
  });

  it('Should return 404 if get application that does not exist', async () => {
    const { config } = await applicationFactory.createPrismaApplicationFactory();

    const result = await supertest(app).get(`/applications/${4}/view`).set(config);

    expect(result.status).toBe(404);
  });
});

describe('Test GET /applications/archived', () => {
  it('Should return 200 if get archived applications correctly', async () => {
    const { config } = await applicationFactory.createApplicationCollectionFactory();

    const result = await supertest(app).get(`/applications/archived`).set(config);

    const archivedApplications = result.body.applications.filter(
      (application: Applications) => application.itsArchived === true,
    );

    if (archivedApplications.length !== 0) {
      expect(result.body.applications[0]).toEqual(
        expect.objectContaining({
          itsArchived: true,
        }),
      );
    }
    expect(result.status).toBe(200);
    expect(result.body.applications).toHaveLength(archivedApplications.length);
  });

  it('Should return 403 if get archived applications without send token', async () => {
    await applicationFactory.createApplicationCollectionFactory();

    const result = await supertest(app).get(`/applications`).set({});

    expect(result.status).toBe(403);
  });
});

describe('Test POST /applications/new', () => {
  it('Should return 201 if registered an application in the correct format', async () => {
    const { config } = await userFactory.loginUserFactory();

    const application = await applicationFactory.createApplicationFactory();

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
    const application = await applicationFactory.createApplicationFactory();

    const result = await supertest(app).post(`/applications/new`).send(application).set({});

    const createdApplication = await prisma.applications.findFirst({
      where: { companyName: application.companyName, roleName: application.roleName },
    });

    expect(result.status).toBe(403);
    expect(createdApplication).toBeNull();
  });
});

describe('Test DELETE /applications/:id/delete', () => {
  it('Should return 200 if delete application correctly', async () => {
    const { prismaApplication, config } = await applicationFactory.createPrismaApplicationFactory();

    const result = await supertest(app).delete(`/applications/${prismaApplication.id}/delete`).set(config);

    expect(result.status).toBe(200);
  });

  it('Should return 403 if delete application without send token', async () => {
    const { prismaApplication } = await applicationFactory.createPrismaApplicationFactory();

    const result = await supertest(app).delete(`/applications/${prismaApplication.id}/delete`).set({});

    expect(result.status).toBe(403);
  });

  it('Should return 404 if delete application that does not exist', async () => {
    const { config } = await applicationFactory.createPrismaApplicationFactory();

    const result = await supertest(app).delete(`/applications/${4}/delete`).set(config);

    expect(result.status).toBe(404);
  });
});

describe('Test PUT /applications/:id/archive', () => {
  it('Should return 200 if archive application toggle is working correctly', async () => {
    const { application, prismaApplication, config } = await applicationFactory.createPrismaApplicationFactory();

    const requestBody = { ...application, itsArchived: !prismaApplication.itsArchived };
    const result = await supertest(app)
      .put(`/applications/${prismaApplication.id}/archive`)
      .send(requestBody)
      .set(config);

    const { body: updatedApplication } = await supertest(app)
      .get(`/applications/${prismaApplication.id}/view`)
      .set(config);

    expect(result.status).toBe(200);
    expect(updatedApplication.application.itsArchived).toBe(!prismaApplication.itsArchived);
  });

  it('Should return 403 if archive application toggle without send token', async () => {
    const { application, prismaApplication } = await applicationFactory.createPrismaApplicationFactory();

    const requestBody = { ...application, itsArchived: !prismaApplication.itsArchived };
    const result = await supertest(app).put(`/applications/${prismaApplication.id}/archive`).send(requestBody).set({});

    expect(result.status).toBe(403);
  });

  it('Should return 404 if archive application that does not exist', async () => {
    const { application, prismaApplication, config } = await applicationFactory.createPrismaApplicationFactory();

    const requestBody = { ...application, itsArchived: !prismaApplication.itsArchived };
    const result = await supertest(app).put(`/applications/${4}/archive`).send(requestBody).set(config);

    expect(result.status).toBe(404);
  });
});

describe('Test PUT /applications/:id/edit', () => {
  it('Should return 200 if edit application is working correctly', async () => {
    const { prismaApplication, config } = await applicationFactory.createPrismaApplicationFactory();

    const requestBody = await createApplicationFactory();
    const result = await supertest(app)
      .put(`/applications/${prismaApplication.id}/edit`)
      .send({ ...requestBody, userId: prismaApplication.userId })
      .set(config);

    const { body: updatedApplication } = await supertest(app)
      .get(`/applications/${prismaApplication.id}/view`)
      .set(config);

    expect(result.status).toBe(200);
    expect(updatedApplication.application).toEqual({
      ...requestBody,
      userId: prismaApplication.userId,
      id: prismaApplication.id,
    });
  });

  it('Should return 403 if edit application without send token', async () => {
    const { prismaApplication } = await applicationFactory.createPrismaApplicationFactory();

    const requestBody = await createApplicationFactory();
    const result = await supertest(app)
      .put(`/applications/${prismaApplication.id}/edit`)
      .send({ ...requestBody, userId: prismaApplication.userId })
      .set({});

    expect(result.status).toBe(403);
  });

  it('Should return 404 if edit application that does not exist', async () => {
    const { prismaApplication, config } = await applicationFactory.createPrismaApplicationFactory();

    const requestBody = await createApplicationFactory();
    const result = await supertest(app)
      .put(`/applications/${5}/edit`)
      .send({ ...requestBody, userId: prismaApplication.userId })
      .set(config);

    expect(result.status).toBe(404);
  });
});

afterAll(async () => {
  await prisma.$disconnect();
});
