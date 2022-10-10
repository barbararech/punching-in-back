import supertest from "supertest";
import app from "../../src/app";
import createUserFactory from "./factories/createUserFactory";
import { prisma } from "../../src/database";

beforeEach(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE "users"  RESTART IDENTITY CASCADE`;
});

describe("Test POST /signup", () => {
  it("Should return 201 if registered an user in the correct format", async () => {
    const user = await createUserFactory();

    const result = await supertest(app).post(`/signup`).send(user);

    const createdUser = await prisma.users.findFirst({
      where: { email: user.email },
    });

    expect(result.status).toBe(201);
    expect(createdUser).toBeInstanceOf(Object);
  });

  it("Should return 409 if registered a user that already exists", async () => {
    const user = await createUserFactory();

    await supertest(app).post(`/signup`).send(user);
    const result = await supertest(app).post(`/signup`).send(user);

    expect(result.status).toBe(409);
  });
});

afterAll(async () => {
  await prisma.$disconnect();
});
