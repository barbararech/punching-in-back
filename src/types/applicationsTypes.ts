import { Applications } from "@prisma/client";
import { INewAttachment } from "../types/attachmentsTypes";
import { INewStep } from "../types/stepsTypes";

export type INewApplication = Omit<Applications, "id">;

// export type IApplicationBody = {
//   companyName: string;
//   roleName: string;
//   heardBack?: string;
//   itsArchived?: string;
//   priority: string;
//   jobDescription: string;
//   observations?: string;
//   attachments?: INewAttachment;
//   steps?: INewStep;
//   userId?: number;
// };
