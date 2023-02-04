import { faker } from '@faker-js/faker';

export default async function createUserFactory() {
  return {
    email: faker.internet.email(),
    username: faker.internet.userName(),
    password: faker.random.alpha(11),
  };
}
