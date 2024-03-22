/*
  Warnings:

  - You are about to alter the column `created_at` on the `Admin` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `updated_at` on the `Admin` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `created_at` on the `Categories` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `updated_at` on the `Categories` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `created_at` on the `Category_Types` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `updated_at` on the `Category_Types` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `created_at` on the `Customers` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `updated_at` on the `Customers` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `created_at` on the `Inquiries` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `updated_at` on the `Inquiries` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
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
  - Added the required column `sale_id` to the `Sale_Items` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Admin` MODIFY `created_at` TIMESTAMP NOT NULL DEFAULT now(),
    MODIFY `updated_at` TIMESTAMP NOT NULL DEFAULT now();

-- AlterTable
ALTER TABLE `Categories` MODIFY `created_at` TIMESTAMP NOT NULL DEFAULT now(),
    MODIFY `updated_at` TIMESTAMP NOT NULL DEFAULT now();

-- AlterTable
ALTER TABLE `Category_Types` MODIFY `created_at` TIMESTAMP NOT NULL DEFAULT now(),
    MODIFY `updated_at` TIMESTAMP NOT NULL DEFAULT now();

-- AlterTable
ALTER TABLE `Customers` MODIFY `created_at` TIMESTAMP NOT NULL DEFAULT now(),
    MODIFY `updated_at` TIMESTAMP NOT NULL DEFAULT now();

-- AlterTable
ALTER TABLE `Inquiries` MODIFY `created_at` TIMESTAMP NOT NULL DEFAULT now(),
    MODIFY `updated_at` TIMESTAMP NOT NULL DEFAULT now();

-- AlterTable
ALTER TABLE `Product_Images` MODIFY `created_at` TIMESTAMP NOT NULL DEFAULT now(),
    MODIFY `updated_at` TIMESTAMP NOT NULL DEFAULT now();

-- AlterTable
ALTER TABLE `Product_Reviews` MODIFY `created_at` TIMESTAMP NOT NULL DEFAULT now(),
    MODIFY `updated_at` TIMESTAMP NOT NULL DEFAULT now();

-- AlterTable
ALTER TABLE `Products` MODIFY `created_at` TIMESTAMP NOT NULL DEFAULT now(),
    MODIFY `updated_at` TIMESTAMP NOT NULL DEFAULT now();

-- AlterTable
ALTER TABLE `Sale_Items` ADD COLUMN `sale_id` INTEGER NOT NULL,
    MODIFY `created_at` TIMESTAMP NOT NULL DEFAULT now(),
    MODIFY `updated_at` TIMESTAMP NOT NULL DEFAULT now();

-- AlterTable
ALTER TABLE `Sales` MODIFY `created_at` TIMESTAMP NOT NULL DEFAULT now(),
    MODIFY `updated_at` TIMESTAMP NOT NULL DEFAULT now();

-- AddForeignKey
ALTER TABLE `Sale_Items` ADD CONSTRAINT `Sale_Items_sale_id_fkey` FOREIGN KEY (`sale_id`) REFERENCES `Sales`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
