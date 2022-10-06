import joi from "joi";

const Joi = require('joi')
    .extend(require('@joi/date'));

export const step = joi.object({
  name: joi.string().required(),
  deadline: Joi.date().format('DD/MM/YYYY').required(),
  itsFinished: joi.boolean().required(),
  applicationId: joi.number().required(),
});

export const stepSchema = joi
  .object()
  .keys({ steps: joi.array().items(step) });
