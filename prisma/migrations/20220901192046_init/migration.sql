-- CreateTable
CREATE TABLE `users` (
    `id` VARCHAR(191) NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `username` TEXT NOT NULL,
    `password` TEXT NOT NULL,
    `grade` INTEGER NOT NULL DEFAULT 1,
    `twitter_id` TEXT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `situations` (
    `id` VARCHAR(191) NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `contributor` TEXT NOT NULL,
    `title` TEXT NOT NULL,
    `content` TEXT NOT NULL,
    `img_url` TEXT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pastworks` (
    `id` VARCHAR(191) NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `contributor` TEXT NOT NULL,
    `twitter_id` TEXT NOT NULL,
    `title` TEXT NOT NULL,
    `content` TEXT NOT NULL,
    `top_img_url` TEXT NOT NULL,
    `other_img_url_0` TEXT NOT NULL,
    `other_img_url_1` TEXT NOT NULL,
    `download_url` TEXT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pubtopics` (
    `id` VARCHAR(191) NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `topic_date` DATETIME NOT NULL,
    `is_new` BOOLEAN NOT NULL,
    `topic` TEXT NOT NULL,
    `explanation` TEXT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pubslides` (
    `id` VARCHAR(191) NOT NULL,
    `pubtopics_id` VARCHAR(255) NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `contributor` TEXT NOT NULL,
    `grade` INTEGER NOT NULL,
    `slide_url` TEXT NOT NULL,
    `title` TEXT NOT NULL,
    `explanation` TEXT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `pubslides` ADD CONSTRAINT `pubslides_pubtopics_id_fkey` FOREIGN KEY (`pubtopics_id`) REFERENCES `pubtopics`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
