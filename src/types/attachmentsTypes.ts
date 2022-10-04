import { Attachments } from "@prisma/client";

export type INewAttachment = Omit<Attachments, "id">;
