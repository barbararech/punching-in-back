-- DropForeignKey
ALTER TABLE "attachments" DROP CONSTRAINT "attachments_applicationId_fkey";

-- DropForeignKey
ALTER TABLE "steps" DROP CONSTRAINT "steps_applicationId_fkey";

-- AddForeignKey
ALTER TABLE "attachments" ADD CONSTRAINT "attachments_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "applications"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "steps" ADD CONSTRAINT "steps_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "applications"("id") ON DELETE CASCADE ON UPDATE CASCADE;
