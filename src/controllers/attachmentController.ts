import { Request, Response } from "express";
import * as attachmentService from "../services/attachmentService";

export async function newAttachment(req: Request, res: Response) {

  const attachment = req.body.attachments;
  await attachmentService.newAttachment(attachment);
  return res.sendStatus(201);
}

export async function viewAttachmentsByApplicationId(req: Request, res: Response) { 
  const applicationId = Number(req.params.id);
  const attachments = await attachmentService.viewAttachmentsByApplicationId(applicationId);
  return res.status(200).send({ attachments });
}


// export async function editAttachment(req: Request, res: Response) {
//   const attachmentId = Number(req.params.id);
//   const attachment = req.body;

//   await attachmentService.editattachment(attachment, attachmentId);
//   return res.status(200).send("attachment updated successfully!");
// }
