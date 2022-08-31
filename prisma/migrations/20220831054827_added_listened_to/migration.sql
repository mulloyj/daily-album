-- CreateTable
CREATE TABLE `listenedTo` (
    `albumTitle` VARCHAR(191) NOT NULL,
    `albumArtist` VARCHAR(191) NOT NULL,
    `date` DATETIME(3) NULL,

    UNIQUE INDEX `listenedTo_albumTitle_albumArtist_key`(`albumTitle`, `albumArtist`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `listenedTo` ADD CONSTRAINT `listenedTo_albumTitle_albumArtist_fkey` FOREIGN KEY (`albumTitle`, `albumArtist`) REFERENCES `Album`(`title`, `artist`) ON DELETE RESTRICT ON UPDATE CASCADE;
