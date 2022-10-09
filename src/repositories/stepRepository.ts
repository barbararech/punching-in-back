import { prisma } from "../database";
import { INewStep } from "../types/stepsTypes";

export async function insertsteps(steps: INewStep) {
  return prisma.steps.createMany({
    data: steps,
  });
}

export async function getStepsByApplicationId(applicationId: number) {
  return prisma.steps.findMany({
    where: {
      applicationId: applicationId,
    },
  });
}

export async function updateStep(steps: any) {
  console.log(steps)
  return await prisma.$transaction(
    steps.map((step: any) =>
      prisma.steps.upsert({
        where: { id: step.id || 0 },
        update: {
          name: step.name,
          deadline: step.deadline,
          itsFinished: step.itsFinished,
        },
        create: step,
      })
    )
  );
}

