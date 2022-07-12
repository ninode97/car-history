/*
  Warnings:

  - You are about to drop the `CodeForAccountant` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "CodeForAccountant";

-- CreateTable
CREATE TABLE "CodeForAccounting" (
    "code" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "CodeForAccounting_code_key" ON "CodeForAccounting"("code");
