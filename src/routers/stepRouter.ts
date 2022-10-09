import { Router } from "express";
import { tokenValidationMiddleware } from "../middlewares/authValidationMiddleware";
import { middleware } from "../middlewares/schemasValidationMiddleware";
import * as stepController from "../controllers/stepController";
import { stepSchema } from "../schemas/stepSchema";

const router = Router();

router.get(
  "/applications/:id/steps",
  tokenValidationMiddleware,
  stepController.viewStepsByApplicationId
);

router.post(
  "/steps/new",
  tokenValidationMiddleware,
  middleware(stepSchema),
  stepController.newstep
);

// router.put(
//   "/steps/:id/edit",
//   tokenValidationMiddleware,
//   middleware(stepSchema),
//   stepController.editstep
// );

export default router;
