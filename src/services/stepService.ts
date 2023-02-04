import * as stepRepository from '../repositories/stepRepository';
import { INewStep, Step } from '../types/stepsTypes';

export async function newStep(step: INewStep) {
  await stepRepository.insertsteps(step);
  return;
}

export async function viewStepsByApplicationId(applicationId: number) {
  const steps = await stepRepository.getStepsByApplicationId(applicationId);
  return steps;
}

export async function editStep(steps: Step[]) {
  await stepRepository.updateStep(steps);
  return;
}
