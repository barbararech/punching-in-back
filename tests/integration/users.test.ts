import supertest from 'supertest';
import app from '../../src/app';
import { userFactory } from '../factories/userFactory';
import { prisma } from '../../src/database';
import { faker } from '@faker-js/faker';

beforeEach(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE "users"  RESTART IDENTITY CASCADE`;
});

describe('Test POST /sign-up', () => {
  it('Should return 201 if registered an user in the correct format', async () => {
    const user = await userFactory.createUserFactory();

    const result = await supertest(app).post(`/sign-up`).send(user);

    const createdUser = await prisma.users.findFirst({
      where: { email: user.email },
    });

    expect(result.status).toBe(201);
    expect(createdUser).toEqual(
      expect.objectContaining({
        email: user.email,
        username: user.username,
      }),
    );
  });

  it('Should return 409 if registered a user that already exists', async () => {
    const user = await userFactory.createUserFactory();

    await supertest(app).post(`/sign-up`).send(user);
    const result = await supertest(app).post(`/sign-up`).send(user);

    expect(result.status).toBe(409);
  });
});

describe('Test POST /sign-in', () => {
  it('Should return 200 if login is possible', async () => {
    const { user } = await userFactory.createPrismaUserFactory();

    const result = await supertest(app).post(`/sign-in`).send({ email: user.email, password: user.password });

    expect(result.status).toEqual(200);
    expect(result.body).toHaveProperty('token');
  });

  it('Should return 401 if wrong password', async () => {
    const { user } = await userFactory.createPrismaUserFactory();

    const result = await supertest(app)
      .post(`/sign-in`)
      .send({ email: user.email, password: faker.random.alpha(11) });

    expect(result.status).toBe(401);
  });

  it('Should return 401 if user does not exist', async () => {
    const { user } = await userFactory.createPrismaUserFactory();

    const result = await supertest(app)
      .post(`/sign-in`)
      .send({ email: faker.internet.email(), password: user.password });

    expect(result.status).toBe(401);
  });
});

afterAll(async () => {
  await prisma.$disconnect();
});
