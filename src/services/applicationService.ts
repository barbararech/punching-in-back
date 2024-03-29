import * as applicationRepository from '../repositories/applicationRepository';
import { INewApplication } from '../types/applicationsTypes';
import { verifyIfApplicationExist, verifyIfApplicationExistById } from '../utils/verifyApplication';

export async function newApplication(application: INewApplication, userId: number) {
  application['userId'] = userId;

  const newApplication = await applicationRepository.insertNewApplication(application);
  return newApplication;
}

export async function viewUnarchivedApplications(userId: number) {
  const applications = await applicationRepository.getAllUnarchivedApplications(userId);
  return applications;
}

export async function viewArchivedApplications(userId: number) {
  const applications = await applicationRepository.getAllArchivedApplications(userId);
  return applications;
}

export async function archiveApplicationToggle(application: INewApplication, applicationId: number) {
  await verifyIfApplicationExistById(applicationId);

  const updatedApplication = await applicationRepository.updateArchiveApplicationById(application, applicationId);

  return updatedApplication;
}

export async function deleteApplication(applicationId: number) {
  await verifyIfApplicationExistById(applicationId);

  await applicationRepository.deleteApplicationById(applicationId);
  return;
}

export async function viewApplication(applicationId: number) {
  const application = await applicationRepository.viewApplicationById(applicationId);

  await verifyIfApplicationExist(application);

  return application;
}

export async function updateApplication(application: INewApplication, applicationId: number) {
  await verifyIfApplicationExistById(applicationId);

  const updatedApplication = await applicationRepository.updateApplication(application, applicationId);

  return updatedApplication;
}
