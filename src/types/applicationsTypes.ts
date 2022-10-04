import { Applications } from "@prisma/client";
import { INewAttachment } from "../types/attachmentsTypes";
import { INewStep } from "../types/stepsTypes";

export type INewApplication = Omit<Applications, "id">;
