import * as stepRepository from "../repositories/stepRepository";
import { INewStep } from "../types/stepsTypes";

export async function newStep(step: INewStep) {
  await stepRepository.insertsteps(step);
  return;
}

// export async function viewsteps() {
//   const steps = await stepRepository.getAllsteps();
//   return steps;
// }

// export async function editstep(step: any, stepId: number) {
//   const updatedstep = await stepRepository.updatestepById(
//     stepId
//   );

//   if (!step) {
//     throw notFoundError("This step doesn't exist!");
//   }

//   return updatedstep;
// }
