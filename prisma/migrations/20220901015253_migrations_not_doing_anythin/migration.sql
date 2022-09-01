/*
  Warnings:

  - The primary key for the `listenedto` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `dateString` on the `listenedto` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[date]` on the table `listenedTo` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `date` to the `listenedTo` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `listenedTo_dateString_key` ON `listenedto`;

-- AlterTable
ALTER TABLE `listenedto` DROP PRIMARY KEY,
    DROP COLUMN `dateString`,
    ADD COLUMN `date` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`date`);

-- CreateIndex
CREATE UNIQUE INDEX `listenedTo_date_key` ON `listenedTo`(`date`);
