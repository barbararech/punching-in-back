import { jest } from '@jest/globals';
import { authService, signIn, signUp } from '../../src/services/authService';
import { userRepository } from '../../src/repositories/userRepository';
import { userFactory } from '../factories/userFactory';
import { conflictError, unauthorizedError } from '../../src/utils/errorUtils';
import bcrypt from 'bcrypt';
import { faker } from '@faker-js/faker';

describe('Test POST /sign-up', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
  });

  it('Should create an user correctly', async () => {
    const user = await userFactory.createUserFactory();
    /* eslint-disable-next-line */
    jest.spyOn(userRepository, 'findUserByEmail').mockImplementationOnce((): any => {});
    /* eslint-disable-next-line */
    jest.spyOn(userRepository, 'insertNewUser').mockImplementationOnce((): any => {});

    await signUp(user.email, user.password, user.username);
    expect(userRepository.insertNewUser).toBeCalled();
  });

  it('Should not register an user if that user already exists', async () => {
    const user = await userFactory.createUserFactory();

    /* eslint-disable-next-line */
    jest.spyOn(userRepository, 'findUserByEmail').mockImplementationOnce((): any => {
      return {
        email: user.email,
        password: user.password,
        username: user.username,
      };
    });

    const result = signUp(user.email, user.password, user.username);
    expect(result).rejects.toEqual(conflictError('This user is already registered!'));
  });
});

describe('Test POST /sign-in', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
  });

  it('Should make login correctly', async () => {
    const user = await userFactory.createUserFactory();
    /* eslint-disable-next-line */
    jest.spyOn(userRepository, 'findUserByEmail').mockImplementationOnce((): any => {
      return {
        email: user.email,
        password: bcrypt.hashSync(user.password, 10),
        username: user.username,
      };
    });
    const result = signIn(user.email, user.password);

    expect(result).toBeTruthy();
  });

  it('Should not make login if wrong password', async () => {
    const user = await userFactory.createUserFactory();
    /* eslint-disable-next-line */
    jest.spyOn(userRepository, 'findUserByEmail').mockImplementationOnce((): any => {
      return {
        email: user.email,
        password: bcrypt.hashSync(user.password, 10),
        username: user.username,
      };
    });

    const result = signIn(user.email, faker.random.alpha(11));

    expect(result).rejects.toEqual(unauthorizedError('Unauthorized!'));
  });

  it('Should not make login if user does not exist', async () => {
    const user = await userFactory.createUserFactory();
    /* eslint-disable-next-line */
    jest.spyOn(userRepository, 'findUserByEmail').mockImplementationOnce((): any => {});

    const result = signIn(user.email, user.password);

    expect(result).rejects.toEqual(unauthorizedError('Unauthorized!'));
  });
});
