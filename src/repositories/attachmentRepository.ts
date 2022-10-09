import { prisma } from "../database";
import { INewApplication } from "../types/applicationsTypes";
import { INewAttachment } from "../types/attachmentsTypes";
import { INewStep } from "../types/stepsTypes";

export async function insertAttachments(attachments: INewAttachment) {
  return prisma.attachments.createMany({
    data: attachments,
  });
}

export async function getAttachmentsByApplicationId(applicationId: number) {
  return prisma.attachments.findMany({
    where: {
      applicationId: applicationId,
    },
  });
}

export async function updateAttachment(attachments: any) {
  console.log(attachments);
  return await prisma.$transaction(
    attachments.map((attachment: any) =>
      prisma.attachments.upsert({
        where: { id: attachment.id },
        update: {
          name: attachment.name,
          link: attachment.link,
          type: attachment.type,
        },
        create: attachment,
      })
    )
  );
}
