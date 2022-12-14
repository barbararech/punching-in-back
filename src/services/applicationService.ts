import * as applicationRepository from "../repositories/applicationRepository";
import { notFoundError } from "../utils/errorUtils";
import { INewApplication } from "../types/applicationsTypes";
import { INewAttachment } from "../types/attachmentsTypes";
import { INewStep } from "../types/stepsTypes";
import { object } from "joi";

export async function newApplication(
  application: INewApplication,
  userId: number
) {
  application["userId"] = userId;

  const newApplication = await applicationRepository.insertNewApplication(
    application
  );
  return newApplication;
}

export async function viewUnarchivedApplications(userId: number) {
  const applications = await applicationRepository.getAllUnarchivedApplications(
    userId
  );
  return applications;
}

export async function viewArchivedApplications(userId: number) {
  const applications = await applicationRepository.getAllArchivedApplications(
    userId
  );
  return applications;
}

export async function archiveApplicationToggle(
  application: INewApplication,
  applicationId: number
) {
  const updatedApplication =
    await applicationRepository.updateArchiveApplicationById(
      application,
      applicationId
    );

  return updatedApplication;
}

export async function deleteApplication(applicationId: number) {
  await applicationRepository.deleteApplicationById(applicationId);
  return;
}

export async function viewApplication(applicationId: number) {
  console.log(applicationId)
  const application = await applicationRepository.viewApplicationById(
    applicationId
  );
  return application;
}

export async function updateApplication(application: INewApplication, applicationId:number) {
  const updatedApplication = await applicationRepository.updateApplication(
    application, applicationId
  );

  return updatedApplication;
}
