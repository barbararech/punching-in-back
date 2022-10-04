import joi from "joi";

export const stepSchema = joi.object({
  name: joi.string().required(),
  deadline: joi.date().required(),
  itsFinished: joi.boolean().required(),
  applicationId: joi.number().required(),
});

