import { Request, Response } from "express";
import * as applicationService from "../services/applicationService";

export async function newApplication(req: Request, res: Response) {
  const application = req.body;
  const userId = res.locals.id;

  const createdApplication = await applicationService.newApplication(
    application,
    userId
  );
  return res.status(201).send(createdApplication);
}

export async function viewApplications(req: Request, res: Response) {
  const userId = res.locals.id;
  const applications = await applicationService.viewApplications(userId);
  return res.status(201).send({ applications });
}

// export async function editApplication(req: Request, res: Response) {
//   const applicationId = Number(req.params.id);
//   const application = req.body;

//   await applicationService.editApplication(application, applicationId);
//   return res.status(200).send("Application updated successfully!");
// }
