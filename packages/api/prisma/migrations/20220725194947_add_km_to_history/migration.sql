/*
  Warnings:

  - Added the required column `km` to the `HistoryV2` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "HistoryV2" ADD COLUMN     "km" INTEGER NOT NULL;
