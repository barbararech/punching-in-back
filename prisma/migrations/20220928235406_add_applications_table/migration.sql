-- CreateEnum
CREATE TYPE "ApplicationType" AS ENUM ('high', 'low', 'medium');

-- CreateTable
CREATE TABLE "applications" (
    "id" SERIAL NOT NULL,
    "companyName" TEXT NOT NULL,
    "roleName" TEXT NOT NULL,
    "heardBack" BOOLEAN NOT NULL DEFAULT false,
    "priority" "ApplicationType" NOT NULL,
    "jobDescription" TEXT,
    "observations" TEXT,
    "itsArchived" BOOLEAN NOT NULL DEFAULT false,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "applications_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "applications" ADD CONSTRAINT "applications_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
