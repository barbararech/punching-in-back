import * as attachmentRepository from "../repositories/attachmentRepository";
import { INewAttachment } from "../types/attachmentsTypes";

export async function newAttachment(attachment: INewAttachment) {

  await attachmentRepository.insertAttachments(attachment);
  return;
}

export async function viewAttachmentsByApplicationId(applicationId:number) {
  const attachments = await attachmentRepository.getAttachmentsByApplicationId(applicationId);
  return attachments;
}

export async function editAttachment(attachments: INewAttachment) {
  await attachmentRepository.updateAttachment(attachments);
  return;
}
