/*
  Warnings:

  - A unique constraint covering the columns `[date]` on the table `listenedTo` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `listenedTo_date_key` ON `listenedTo`(`date`);
