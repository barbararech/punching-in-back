import joi from "joi";

export const attachmentSchema = joi.object({
  name: joi.string().required(),
  link: joi.string().uri().required(),
  type: joi
    .string()
    .valid("resume", "coverletter", "portifolio", "testAnsers", "others")
    .required(),
  applicationId: joi.number().required(),
});
