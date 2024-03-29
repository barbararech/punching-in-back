import { Request, Response } from 'express';
import * as applicationService from '../services/applicationService';

export async function newApplication(req: Request, res: Response) {
  const application = req.body;
  const userId = res.locals.id;

  const createdApplication = await applicationService.newApplication(application, userId);
  return res.status(201).send(createdApplication);
}

export async function viewUnarchivedApplications(req: Request, res: Response) {
  const userId = res.locals.id;
  const applications = await applicationService.viewUnarchivedApplications(userId);
  return res.status(200).send({ applications });
}

export async function viewArchivedApplications(req: Request, res: Response) {
  const userId = res.locals.id;
  const applications = await applicationService.viewArchivedApplications(userId);
  return res.status(200).send({ applications });
}

export async function archiveApplicationToggle(req: Request, res: Response) {
  const applicationId = Number(req.params.id);
  const application = req.body;
  await applicationService.archiveApplicationToggle(application, applicationId);
  return res.status(200).send('Application updated successfully!');
}

export async function deleteApplication(req: Request, res: Response) {
  const applicationId = Number(req.params.id);
  await applicationService.deleteApplication(applicationId);
  return res.status(200).send('Application delete successfully!');
}

export async function viewApplication(req: Request, res: Response) {
  const applicationId = Number(req.params.id);
  const application = await applicationService.viewApplication(applicationId);
  return res.status(200).send({ application });
}

export async function updateApplication(req: Request, res: Response) {
  const applicationId = Number(req.params.id);
  const application = req.body;
  await applicationService.updateApplication(application, applicationId);
  return res.status(200).send('Application updated successfully!');
}
