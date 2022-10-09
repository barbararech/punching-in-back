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

// await prisma.$transaction(
//   posts.map((post) =>
//     prisma.post.upsert({
//       where: { id: post.id },
//       update: { text: post.text, userId: post.userId },
//       create: post,
//     })
//   )
// );