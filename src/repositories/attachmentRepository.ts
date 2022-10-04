import { prisma } from "../database";
import { INewApplication } from "../types/applicationsTypes";
import { INewAttachment } from "../types/attachmentsTypes";
import { INewStep } from "../types/stepsTypes";

export async function insertAttachments(attachments: INewAttachment) {
  return prisma.attachments.create({
    data: attachments,
  });
}

