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
  application["userId"] = userId;

  console.log(application);

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

// export async function editApplication(application: any, applicationId: number) {
//   const updatedApplication = await applicationRepository.updateApplicationById(
//     applicationId
//   );

//   if (!application) {
//     throw notFoundError("This application doesn't exist!");
//   }

//   return updatedApplication;
// }
