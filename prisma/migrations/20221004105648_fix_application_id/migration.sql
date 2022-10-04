/*
  Warnings:

  - You are about to drop the column `applicationsId` on the `attachments` table. All the data in the column will be lost.
  - You are about to drop the column `applicationsId` on the `steps` table. All the data in the column will be lost.
  - Added the required column `applicationId` to the `attachments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `applicationId` to the `steps` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "attachments" DROP CONSTRAINT "attachments_applicationsId_fkey";

-- DropForeignKey
ALTER TABLE "steps" DROP CONSTRAINT "steps_applicationsId_fkey";

-- AlterTable
ALTER TABLE "attachments" DROP COLUMN "applicationsId",
ADD COLUMN     "applicationId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "steps" DROP COLUMN "applicationsId",
ADD COLUMN     "applicationId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "attachments" ADD CONSTRAINT "attachments_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "applications"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "steps" ADD CONSTRAINT "steps_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "applications"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
