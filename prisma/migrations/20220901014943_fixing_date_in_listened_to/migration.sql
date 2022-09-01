/*
  Warnings:

  - The primary key for the `listenedto` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE `listenedto` DROP PRIMARY KEY,
    MODIFY `date` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`date`);
