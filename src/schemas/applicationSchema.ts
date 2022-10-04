import joi from "joi";

export const applicationSchema = joi.object({
  companyName: joi.string().required(),
  roleName: joi.string().required(),
  heardBack: joi.boolean(),
  itsArchived: joi.boolean(),
  priority: joi.string().valid("high", "medium", "low").required(),
  jobDescription: joi.string().uri().required(),
  observations: joi.string(),
  // attachments: joi.object().required(),
  // steps: joi.object().required(),
});