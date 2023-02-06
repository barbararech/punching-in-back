import { prisma } from '../database';
import { INewAttachment, Attachment } from '../types/attachmentsTypes';
// import { INewApplication } from '../types/applicationsTypes';
// import { INewStep } from '../types/stepsTypes';

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

export async function getAllAttachments() {
  return prisma.attachments.findMany({
    select: {
      id: true,
      name: true,
      type: true,
      link: true,
      applications: {
        select: {
          companyName: true,
          roleName: true,
          userId: true,
        },
      },
    },
    orderBy: { id: 'desc' },
  });
}

export async function updateAttachment(attachments: Attachment[]) {
  return await prisma.$transaction(
    attachments.map((attachment: Attachment) =>
      prisma.attachments.upsert({
        create: attachment,
        update: {
          name: attachment.name,
          link: attachment.link,
          type: attachment.type,
        },
        where: { id: attachment.id || 0 },
      }),
    ),
  );
}
