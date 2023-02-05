import { faker } from '@faker-js/faker';

export default async function applicationFactory() {
  return {
    companyName: faker.company.name(),
    roleName: faker.name.jobTitle(),
    heardBack: true,
    itsArchived: false,
    priority: 'high',
    jobDescription: faker.internet.url(),
    observations: faker.lorem.paragraph(),
  };
}
