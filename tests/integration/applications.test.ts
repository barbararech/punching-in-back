import supertest from 'supertest';
import app from '../../src/app';
import { applicationFactory } from '../factories/applicationFactory';
import { prisma } from '../../src/database';
import { userFactory } from '../factories/userFactory';
import { Applications } from '@prisma/client';

beforeEach(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE "applications"  RESTART IDENTITY CASCADE`;
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

describe('Test GET /applications/:id/delete', () => {
  it('Should return 200 if delete application correctly', async () => {
    const { prismaApplication, config } = await applicationFactory.createPrismaApplicationFactory();

    const result = await supertest(app).delete(`/applications/${prismaApplication.id}/delete`).set(config);

    expect(result.status).toBe(200);
  });

  it('Should return 403 if delte application without send token', async () => {
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

afterAll(async () => {
  await prisma.$disconnect();
});

// router.put('/applications/:id/archive', tokenValidationMiddleware, applicationController.archiveApplicationToggle);

// router.delete('/applications/:id/delete', tokenValidationMiddleware, applicationController.deleteApplication);

// router.put('/applications/:id/edit', tokenValidationMiddleware, applicationController.updateApplication);
