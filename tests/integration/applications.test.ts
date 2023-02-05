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

afterAll(async () => {
  await prisma.$disconnect();
});

// router.get('/applications/:id/view', tokenValidationMiddleware, applicationController.viewApplication);

// router.put('/applications/:id/archive', tokenValidationMiddleware, applicationController.archiveApplicationToggle);

// router.delete('/applications/:id/delete', tokenValidationMiddleware, applicationController.deleteApplication);

// router.put('/applications/:id/edit', tokenValidationMiddleware, applicationController.updateApplication);
