-- CreateTable
CREATE TABLE "steps" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "deadline" TIMESTAMP(3) NOT NULL,
    "itsFinished" BOOLEAN NOT NULL DEFAULT false,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "steps_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "steps" ADD CONSTRAINT "steps_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
