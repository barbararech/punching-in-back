/*
  Warnings:

  - The `type` column on the `attachments` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "attachments" DROP COLUMN "type",
ADD COLUMN     "type" "AttachmentsType" NOT NULL DEFAULT 'resume';
