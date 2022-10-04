import { prisma } from "../database";
import { INewApplication } from "../types/applicationsTypes";
import { INewAttachment } from "../types/attachmentsTypes";
import { INewStep } from "../types/stepsTypes";

export async function insertNewApplication(application: INewApplication) {
  return prisma.applications.create({
    data: application,
  });
}

export async function getAllUnarchivedApplications(userId: number) {
  return await prisma.applications.findMany({
    where: {
      userId: userId,
      itsArchived:false,
    },
    select: {
      id:true,
      companyName: true,
      roleName: true,
      heardBack: true,
      priority: true,
      jobDescription: true,
      observations: true,
      itsArchived: true,
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
    orderBy: { id: "desc" },
  });
}

export async function getAllArchivedApplications(userId: number) {
  return await prisma.applications.findMany({
    where: {
      userId: userId,
      itsArchived:true,
    },
    select: {
      id:true,
      companyName: true,
      roleName: true,
      heardBack: true,
      priority: true,
      jobDescription: true,
      observations: true,
      itsArchived: true,
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
    orderBy: { id: "desc" },
  });
}