import { Steps } from '@prisma/client';

export type INewStep = Omit<Steps, 'id'>;
export type Step = Steps;
