/*
  Warnings:

  - You are about to drop the column `name` on the `SlideShow` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `SlideShow` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `path` to the `SlideShowImage` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SlideShow" DROP COLUMN "name";

-- AlterTable
ALTER TABLE "SlideShowImage" ADD COLUMN     "path" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "SlideShow_userId_key" ON "SlideShow"("userId");
