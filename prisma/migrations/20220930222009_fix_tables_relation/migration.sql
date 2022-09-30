/*
  Warnings:

  - You are about to drop the column `userId` on the `attachments` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `steps` table. All the data in the column will be lost.
  - Added the required column `applicationsId` to the `attachments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `applicationsId` to the `steps` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "attachments" DROP CONSTRAINT "attachments_userId_fkey";

-- DropForeignKey
ALTER TABLE "steps" DROP CONSTRAINT "steps_userId_fkey";

-- AlterTable
ALTER TABLE "attachments" DROP COLUMN "userId",
ADD COLUMN     "applicationsId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "steps" DROP COLUMN "userId",
ADD COLUMN     "applicationsId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "attachments" ADD CONSTRAINT "attachments_applicationsId_fkey" FOREIGN KEY ("applicationsId") REFERENCES "applications"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "steps" ADD CONSTRAINT "steps_applicationsId_fkey" FOREIGN KEY ("applicationsId") REFERENCES "applications"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
