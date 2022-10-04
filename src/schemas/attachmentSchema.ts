import joi from "joi";

export const attachment = joi.object({
  name: joi.string().required(),
  link: joi.string().uri().required(),
  type: joi
    .string()
    .valid("resume", "coverletter", "portifolio", "testAnswers", "others")
    .required(),
  applicationId: joi.number().required(),
});

export const attachmentSchema = joi
  .object()
  .keys({ attachments: joi.array().items(attachment) });
