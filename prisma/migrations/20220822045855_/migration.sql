/*
  Warnings:

  - You are about to drop the `example` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE `user` ADD COLUMN `accessToken` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `example`;
