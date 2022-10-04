import { prisma } from "../database";
import { INewApplication } from "../types/applicationsTypes";
import { INewAttachment } from "../types/attachmentsTypes";
import { INewStep } from "../types/stepsTypes";

export async function insertNewApplication(application: INewApplication) {
  return prisma.applications.create({
    data: application,
  });
}

export async function insertAttachments(attachments: INewAttachment) {
  return prisma.attachments.create({
    data: attachments,
  });
}

export async function insertSteps(steps: INewStep) {
  return prisma.steps.create({
    data: steps,
  });
}
