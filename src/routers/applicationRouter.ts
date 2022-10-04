import { Router } from "express";
import { tokenValidationMiddleware } from "../middlewares/authValidationMiddleware";
import { middleware } from "../middlewares/schemasValidationMiddleware";
import * as applicationController from "../controllers/applicationController";
import { applicationSchema } from "../schemas/applicationSchema";

const router = Router();

router.get(
  "/applications",
  tokenValidationMiddleware,
  applicationController.viewUnarchivedApplications
);

router.get(
  "/applications/archived",
  tokenValidationMiddleware,
  applicationController.viewArchivedApplications
);

router.post(
  "/applications/new",
  tokenValidationMiddleware,
  middleware(applicationSchema),
  applicationController.newApplication
);

router.put(
  "/applications/:id/edit",
  tokenValidationMiddleware,
  applicationController.archiveCardToggle
);

export default router;
