import { Router } from 'express';
import { tokenValidationMiddleware } from '../middlewares/authValidationMiddleware';
import { middleware } from '../middlewares/schemasValidationMiddleware';
import * as attachmentController from '../controllers/attachmentController';
import { attachmentSchema } from '../schemas/attachmentSchema';

const router = Router();

router.get(
  '/applications/:id/attachments',
  tokenValidationMiddleware,
  attachmentController.viewAttachmentsByApplicationId,
);

router.get('/attachments/all', tokenValidationMiddleware, attachmentController.viewUserAttachments);

router.post(
  '/attachments/new',
  tokenValidationMiddleware,
  middleware(attachmentSchema),
  attachmentController.newAttachment,
);

router.put(
  '/attachments/edit',
  tokenValidationMiddleware,
  middleware(attachmentSchema),
  attachmentController.editAttachment,
);

export default router;
