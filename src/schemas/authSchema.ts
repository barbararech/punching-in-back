import joi from "joi";
import { INewUser } from "../types/userTypes";

export const signUpSchema = joi.object<INewUser>({
  email: joi.string().email().required(),
  password: joi.string().required(),
  username: joi.string().required(),
});

export const signInSchema = joi.object<INewUser>({
  email: joi.string().email().required(),
  password: joi.string().required(),
});
