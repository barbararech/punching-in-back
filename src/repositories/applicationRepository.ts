import { prisma } from "../database";
import { INewApplication } from "../types/applicationsTypes";
import { INewAttachment } from "../types/attachmentsTypes";
import { INewStep } from "../types/stepsTypes";

export async function insertNewApplication(application: INewApplication) {
  return prisma.applications.create({
    data: application,
  });
}

export async function getAllApplications(userId: number) {
  return await prisma.applications.findMany({
    select: {
      attachments: {
        select: {
          name: true,
          link: true,
          type: true,
        },
      },
      steps: {
        select: {
          name: true,
          deadline: true,
          itsFinished: true,
        },
      },
    },
    where: {
      userId: userId,
    },
    orderBy: { id: "desc" },
  });
}
