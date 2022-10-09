import { jest } from "@jest/globals";
import { signUp } from "../../src/services/authService";
import { userRepository } from "../../src/repositories/userRepository";
import createUserFactory from "./factories/createUserFactory";
import { conflictError } from "../../src/utils/errorUtils";

describe("Test POST /signup", () => {
  beforeEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
  });

  it("Should return 200 if  create user correctly", async () => {
    const user = await createUserFactory();

    jest
      .spyOn(userRepository, "findUserByEmail")
      .mockImplementationOnce((): any => {});

    jest
      .spyOn(userRepository, "insertNewUser")
      .mockImplementationOnce((): any => {});

    await signUp(user.email, user.password, user.username);
    expect(userRepository.insertNewUser).toBeCalled();
  });

  it("Should return 409 if registered a user that already exists", async () => {
    const user = await createUserFactory();

    jest
      .spyOn(userRepository, "findUserByEmail")
      .mockImplementationOnce((): any => {
        return {
          email: user.email,
          password: user.password,
          username: user.username,
        };
      });

    const result = signUp(user.email, user.password, user.username);
    expect(result).rejects.toEqual(conflictError("This user is already registered!"));
  });
});
