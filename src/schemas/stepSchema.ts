import joi from "joi";

export const step = joi.object({
  name: joi.string().required(),
  deadline: joi.date().required(),
  itsFinished: joi.boolean().required(),
  applicationId: joi.number().required(),
});

export const stepSchema = joi
  .object()
  .keys({ steps: joi.array().items(step) });
