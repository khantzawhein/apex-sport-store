/*
  Warnings:

  - You are about to alter the column `created_at` on the `Admin` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `updated_at` on the `Admin` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `created_at` on the `Categories` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `updated_at` on the `Categories` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `created_at` on the `Customers` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `updated_at` on the `Customers` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `created_at` on the `Product_Images` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `updated_at` on the `Product_Images` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `created_at` on the `Product_Reviews` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `updated_at` on the `Product_Reviews` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `created_at` on the `Products` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `updated_at` on the `Products` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `created_at` on the `Sale_Items` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `updated_at` on the `Sale_Items` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `created_at` on the `Sales` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `updated_at` on the `Sales` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.

*/
-- AlterTable
ALTER TABLE `Admin` MODIFY `created_at` TIMESTAMP NOT NULL DEFAULT now(),
    MODIFY `updated_at` TIMESTAMP NOT NULL DEFAULT now();

-- AlterTable
ALTER TABLE `Categories` MODIFY `created_at` TIMESTAMP NOT NULL DEFAULT now(),
    MODIFY `updated_at` TIMESTAMP NOT NULL DEFAULT now();

-- AlterTable
ALTER TABLE `Customers` MODIFY `created_at` TIMESTAMP NOT NULL DEFAULT now(),
    MODIFY `updated_at` TIMESTAMP NOT NULL DEFAULT now();

-- AlterTable
ALTER TABLE `Product_Images` MODIFY `created_at` TIMESTAMP NOT NULL DEFAULT now(),
    MODIFY `updated_at` TIMESTAMP NOT NULL DEFAULT now();

-- AlterTable
ALTER TABLE `Product_Reviews` MODIFY `created_at` TIMESTAMP NOT NULL DEFAULT now(),
    MODIFY `updated_at` TIMESTAMP NOT NULL DEFAULT now();

-- AlterTable
ALTER TABLE `Products` ADD COLUMN `is_featured_product` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `is_new_product` BOOLEAN NOT NULL DEFAULT false,
    MODIFY `created_at` TIMESTAMP NOT NULL DEFAULT now(),
    MODIFY `updated_at` TIMESTAMP NOT NULL DEFAULT now();

-- AlterTable
ALTER TABLE `Sale_Items` MODIFY `created_at` TIMESTAMP NOT NULL DEFAULT now(),
    MODIFY `updated_at` TIMESTAMP NOT NULL DEFAULT now();

-- AlterTable
ALTER TABLE `Sales` MODIFY `created_at` TIMESTAMP NOT NULL DEFAULT now(),
    MODIFY `updated_at` TIMESTAMP NOT NULL DEFAULT now();

-- CreateTable
CREATE TABLE `Inquiries` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `message` VARCHAR(191) NOT NULL,
    `created_at` TIMESTAMP NOT NULL DEFAULT now(),
    `updated_at` TIMESTAMP NOT NULL DEFAULT now(),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
