import * as attachmentRepository from '../repositories/attachmentRepository';
import { INewAttachment, Attachment } from '../types/attachmentsTypes';

export async function newAttachment(attachment: INewAttachment) {
  /* eslint-disable-next-line no-console */
  console.log(attachment);
  await attachmentRepository.insertAttachments(attachment);
  return;
}

export async function viewAttachmentsByApplicationId(applicationId: number) {
  const attachments = await attachmentRepository.getAttachmentsByApplicationId(applicationId);
  return attachments;
}

export async function editAttachment(attachments: Attachment[]) {
  await attachmentRepository.updateAttachment(attachments);
  return;
}
