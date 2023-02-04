import BaseJoi from 'joi';
import JoiDate from '@joi/date';
// import joi from 'joi';

const joi = BaseJoi.extend(JoiDate);
// const Joi = require('joi').extend(require('@joi/date'));

export const step = joi.object({
  id: joi.number(),
  name: joi.string().required(),
  deadline: joi.date().format('DD/MM/YYYY').required(),
  itsFinished: joi.boolean().required(),
  applicationId: joi.number().required(),
});

export const stepSchema = joi.object().keys({ steps: joi.array().items(step) });
