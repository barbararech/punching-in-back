import { prisma } from "../database";
import { INewStep } from "../types/stepsTypes";

export async function insertsteps(steps: INewStep) {
  return prisma.steps.create({
    data: steps,
  });
}
