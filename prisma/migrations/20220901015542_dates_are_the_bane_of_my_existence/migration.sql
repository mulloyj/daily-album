/*
  Warnings:

  - The primary key for the `listenedto` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `date` on the `listenedto` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Date`.

*/
-- AlterTable
ALTER TABLE `listenedto` DROP PRIMARY KEY,
    MODIFY `date` DATE NOT NULL,
    ADD PRIMARY KEY (`date`);
