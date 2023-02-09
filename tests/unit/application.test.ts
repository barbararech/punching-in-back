import { createApplicationFactory } from '../factories/applicationFactory';
import { applicationRepository } from '../../src/repositories/applicationRepository';
import {
  viewApplication,
  viewArchivedApplications,
  viewUnarchivedApplications,
  newApplication,
  archiveApplicationToggle,
  updateApplication,
  deleteApplication,
} from '../../src/services/applicationService';
import { notFoundError } from '../../src/utils/errorUtils';
import { verifyApplication } from '../../src/utils/verifyApplication';

jest.mock('../../src/repositories/applicationRepository');

describe('Test GET /applications', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
  });

  it('Should get unarchived applications correctly', async () => {
    const application = await createApplicationFactory();
    const userId = 1;

    /* eslint-disable-next-line */
    jest.spyOn(applicationRepository, 'getAllUnarchivedApplications').mockImplementationOnce((): any => {
      return [
        { ...application, itsArchived: false, userId, id: 1 },
        { ...application, itsArchived: false, userId, id: 2 },
      ];
    });

    await viewUnarchivedApplications(userId);
    expect(applicationRepository.getAllUnarchivedApplications).toHaveBeenCalledWith(userId);
  });
});

describe('Test GET /applications/:id/view', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
  });

  it('Should get application by id correctly', async () => {
    const application = await createApplicationFactory();
    const userId = 1;
    const id = 1;
    /* eslint-disable-next-line */
    jest.spyOn(applicationRepository, 'viewApplicationById').mockImplementationOnce((): any => {
      return { ...application, itsArchived: false, userId, id };
    });

    /* eslint-disable-next-line */
    jest.spyOn(verifyApplication, 'verifyIfApplicationExist').mockImplementationOnce((): any => {
      return;
    });

    await viewApplication(id);

    expect(applicationRepository.viewApplicationById).toBeCalled();
  });

  it('Should throw error if get application by id that does not exist', async () => {
    const id = 1;

    /* eslint-disable-next-line */
    jest.spyOn(applicationRepository, 'viewApplicationById').mockImplementationOnce((): any => {
      return null;
    });

    /* eslint-disable-next-line */
    jest.spyOn(verifyApplication, 'verifyIfApplicationExist').mockImplementationOnce((): any => {
      throw notFoundError('Application not found');
    });

    const result = viewApplication(id);
    expect(result).rejects.toEqual(notFoundError('Application not found'));
  });
});

describe('Test GET /applications/archived', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
  });

  it('Should get archived applications correctly', async () => {
    const application = await createApplicationFactory();
    const userId = 1;

    /* eslint-disable-next-line */
    jest.spyOn(applicationRepository, 'getAllArchivedApplications').mockImplementationOnce((): any => {
      return [
        { ...application, itsArchived: true, userId, id: 1 },
        { ...application, itsArchived: true, userId, id: 2 },
      ];
    });

    const result = await viewArchivedApplications(userId);
    expect(applicationRepository.getAllArchivedApplications).toHaveBeenCalledWith(userId);
    expect(result).toHaveLength(2);
  });
});

describe('Test POST /applications/new', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
  });

  it('Should post new applications correctly', async () => {
    const application = await createApplicationFactory();
    const userId = 1;

    /* eslint-disable-next-line */
    jest.spyOn(applicationRepository, 'insertNewApplication').mockImplementationOnce((): any => {});

    await newApplication({ ...application, userId }, userId);

    expect(applicationRepository.insertNewApplication).toHaveBeenCalledWith({ ...application, userId });
  });
});

describe('Test PUT /applications/:id/archive', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
  });

  it('Should archive application by id correctly', async () => {
    const application = await createApplicationFactory();
    const userId = 1;
    const applicationId = 1;

    /* eslint-disable-next-line */
    jest.spyOn(verifyApplication, 'verifyIfApplicationExist').mockImplementationOnce((): any => {
      return;
    });

    await archiveApplicationToggle({ ...application, userId }, applicationId);

    expect(applicationRepository.updateArchiveApplicationById).toHaveBeenCalledWith(
      { ...application, userId },
      applicationId,
    );
  });

  it('Should throw error if archived application that does not exist', async () => {
    const application = await createApplicationFactory();
    const userId = 1;
    const applicationId = 1;

    /* eslint-disable-next-line */
    jest.spyOn(applicationRepository, 'viewApplicationById').mockImplementationOnce((): any => {
      return null;
    });

    /* eslint-disable-next-line */
    jest.spyOn(verifyApplication, 'verifyIfApplicationExist').mockImplementationOnce((): any => {
      throw notFoundError('Application not found');
    });

    const result = archiveApplicationToggle({ ...application, userId }, applicationId);

    expect(result).rejects.toEqual(notFoundError('Application not found'));
  });
});

describe('Test PUT /applications/:id/edit', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
  });

  it('Should edit application by id correctly', async () => {
    const editedApplication = await createApplicationFactory();
    const userId = 1;
    const applicationId = 1;

    /* eslint-disable-next-line */
    jest.spyOn(verifyApplication, 'verifyIfApplicationExist').mockImplementationOnce((): any => {
      return;
    });

    /* eslint-disable-next-line */
    jest.spyOn(applicationRepository, 'updateApplication').mockImplementationOnce((): any => {});

    await updateApplication({ ...editedApplication, userId }, applicationId);

    expect(applicationRepository.updateApplication).toHaveBeenCalledWith(
      { ...editedApplication, userId },
      applicationId,
    );
  });

  it('Should throw error if archived application that does not exist', async () => {
    const editedApplication = await createApplicationFactory();
    const userId = 1;
    const applicationId = 1;

    /* eslint-disable-next-line */
    jest.spyOn(applicationRepository, 'viewApplicationById').mockImplementationOnce((): any => {
      return null;
    });

    /* eslint-disable-next-line */
    jest.spyOn(verifyApplication, 'verifyIfApplicationExist').mockImplementationOnce((): any => {
      throw notFoundError('Application not found');
    });

    const result = updateApplication({ ...editedApplication, userId }, applicationId);

    expect(result).rejects.toEqual(notFoundError('Application not found'));
  });
});

describe('Test DELETE /applications/:id/delete', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
  });

  it('Should delete application by id correctly', async () => {
    const applicationId = 1;

    /* eslint-disable-next-line */
    jest.spyOn(verifyApplication, 'verifyIfApplicationExist').mockImplementationOnce((): any => {
      return;
    });

    /* eslint-disable-next-line */
    jest.spyOn(applicationRepository, 'deleteApplicationById').mockImplementationOnce((): any => {});

    await deleteApplication(applicationId);

    expect(applicationRepository.deleteApplicationById).toHaveBeenCalledWith(applicationId);
  });

  it('Should throw error if delete application that does not exist', async () => {
    const applicationId = 1;

    /* eslint-disable-next-line */
    jest.spyOn(applicationRepository, 'viewApplicationById').mockImplementationOnce((): any => {
      return null;
    });

    /* eslint-disable-next-line */
    jest.spyOn(verifyApplication, 'verifyIfApplicationExist').mockImplementationOnce((): any => {
      throw notFoundError('Application not found');
    });

    const result = deleteApplication(applicationId);

    expect(result).rejects.toEqual(notFoundError('Application not found'));
  });
});
