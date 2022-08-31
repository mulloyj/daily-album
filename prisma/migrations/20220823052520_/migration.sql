/*
  Warnings:

  - You are about to drop the column `accessToken` on the `session` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `session` DROP COLUMN `accessToken`;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `accessToken` VARCHAR(191) NULL;
