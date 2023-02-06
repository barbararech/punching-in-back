import { Applications } from '@prisma/client';
import { applicationRepository } from '../repositories/applicationRepository';
import { notFoundError } from '../utils/errorUtils';

export async function verifyIfApplicationExist(application: Applications | null) {
  if (application === null) {
    throw notFoundError('Application not found');
  }
  return;
}

export async function verifyIfApplicationExistById(applicationId: number) {
  const application = await applicationRepository.viewApplicationById(applicationId);

  if (application === null) {
    throw notFoundError('Application not found');
  }

  return;
}

export const verifyApplication = {
  verifyIfApplicationExist,
  verifyIfApplicationExistById,
};
