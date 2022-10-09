import { Request, Response } from "express";
import * as stepService from "../services/stepService";

export async function newstep(req: Request, res: Response) {
  const step = req.body.steps;

  const createdStep = await stepService.newStep(step);
  return res.status(201).send(createdStep);
}

export async function viewStepsByApplicationId(req: Request, res: Response) { 
  const applicationId = Number(req.params.id);
  const steps = await stepService.viewStepsByApplicationId(applicationId);
  return res.status(200).send({ steps });
}

// export async function editstep(req: Request, res: Response) {
//   const stepId = Number(req.params.id);
//   const step = req.body;

//   await stepService.editstep(step, stepId);
//   return res.status(200).send("step updated successfully!");
// }
