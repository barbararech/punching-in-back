import * as attachmentRepository from '../repositories/attachmentRepository';
import { INewAttachment, Attachment } from '../types/attachmentsTypes';
import { verifyIfApplicationExistById } from '../utils/verifyApplication';

export async function newAttachment(attachment: INewAttachment) {
  /* eslint-disable-next-line no-console */
  console.log(attachment);
  await attachmentRepository.insertAttachments(attachment);
  return;
}

export async function viewAttachmentsByApplicationId(applicationId: number) {
  await verifyIfApplicationExistById(applicationId);
  const attachments = await attachmentRepository.getAttachmentsByApplicationId(applicationId);
  return attachments;
}

export async function viewAttachmentsByUserId(userId: number) {
  const attachments = await attachmentRepository.getAllAttachments();
  const userAttachments = attachments.filter((attachment) => attachment.applications.userId === userId);
  return userAttachments;
}

export async function editAttachment(attachments: Attachment[]) {
  await attachmentRepository.updateAttachment(attachments);
  return;
}
