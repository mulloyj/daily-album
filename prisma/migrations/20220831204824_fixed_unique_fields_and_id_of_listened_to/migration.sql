/*
  Warnings:

  - Made the column `date` on table `listenedto` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `listenedto` MODIFY `date` TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD PRIMARY KEY (`date`);
