import * as applicationRepository from "../repositories/applicationRepository";
import { notFoundError } from "../utils/errorUtils";
import { INewApplication } from "../types/applicationsTypes";
import { INewAttachment } from "../types/attachmentsTypes";
import { INewStep } from "../types/stepsTypes";
// import { IApplicationBody } from "../types/applicationsTypes";
import { object } from "joi";

export async function newApplication(
  application: INewApplication,
  userId: number
) {
  // const applicationData = application;

  application["userId"] = userId;

  console.log(application);
  // console.log(applicationData);

  // const applicationDataWithId: INewApplication = applicationData.userId=userId;
  const newApplication = await applicationRepository.insertNewApplication(
    application
  );

  // const applicationId = newApplication.id;

  // const attachments = [...application.attachments, applicationId, userId];
  // const steps = [...application.steps, applicationId, userId];

  // console.log(applicationData);
  // console.log(attachments);
  // console.log(steps);
  // await applicationRepository.insertAttachments(attachments);

  // await applicationRepository.insertSteps(steps);
  return newApplication;
}

// export async function viewApplications() {
//   const applications = await applicationRepository.getAllApplications();
//   return applications;
// }

// export async function editApplication(application: any, applicationId: number) {
//   const updatedApplication = await applicationRepository.updateApplicationById(
//     applicationId
//   );

//   if (!application) {
//     throw notFoundError("This application doesn't exist!");
//   }

//   return updatedApplication;
// }
