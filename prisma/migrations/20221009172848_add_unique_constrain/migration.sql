/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `applications` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `attachments` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `steps` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "applications_id_key" ON "applications"("id");

-- CreateIndex
CREATE UNIQUE INDEX "attachments_id_key" ON "attachments"("id");

-- CreateIndex
CREATE UNIQUE INDEX "steps_id_key" ON "steps"("id");

-- CreateIndex
CREATE UNIQUE INDEX "users_id_key" ON "users"("id");
