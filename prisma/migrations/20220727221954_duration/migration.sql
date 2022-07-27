/*
  Warnings:

  - Added the required column `duration` to the `Song` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Song" ADD COLUMN     "duration" DOUBLE PRECISION NOT NULL;
