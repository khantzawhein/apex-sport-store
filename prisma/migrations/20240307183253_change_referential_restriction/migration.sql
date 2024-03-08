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
-- DropForeignKey
ALTER TABLE `Product_Category` DROP FOREIGN KEY `Product_Category_category_id_fkey`;

-- DropForeignKey
ALTER TABLE `Product_Category` DROP FOREIGN KEY `Product_Category_product_id_fkey`;

-- DropForeignKey
ALTER TABLE `Product_Images` DROP FOREIGN KEY `Product_Images_product_id_fkey`;

-- DropForeignKey
ALTER TABLE `Product_Reviews` DROP FOREIGN KEY `Product_Reviews_customer_id_fkey`;

-- DropForeignKey
ALTER TABLE `Product_Reviews` DROP FOREIGN KEY `Product_Reviews_product_id_fkey`;

-- DropForeignKey
ALTER TABLE `Sale_Items` DROP FOREIGN KEY `Sale_Items_product_id_fkey`;

-- DropForeignKey
ALTER TABLE `Sales` DROP FOREIGN KEY `Sales_customer_id_fkey`;

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
ALTER TABLE `Products` MODIFY `created_at` TIMESTAMP NOT NULL DEFAULT now(),
    MODIFY `updated_at` TIMESTAMP NOT NULL DEFAULT now();

-- AlterTable
ALTER TABLE `Sale_Items` MODIFY `product_id` INTEGER NULL,
    MODIFY `created_at` TIMESTAMP NOT NULL DEFAULT now(),
    MODIFY `updated_at` TIMESTAMP NOT NULL DEFAULT now();

-- AlterTable
ALTER TABLE `Sales` MODIFY `customer_id` INTEGER NULL,
    MODIFY `created_at` TIMESTAMP NOT NULL DEFAULT now(),
    MODIFY `updated_at` TIMESTAMP NOT NULL DEFAULT now();

-- AddForeignKey
ALTER TABLE `Product_Category` ADD CONSTRAINT `Product_Category_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `Products`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Product_Category` ADD CONSTRAINT `Product_Category_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `Categories`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Product_Reviews` ADD CONSTRAINT `Product_Reviews_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `Products`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Product_Reviews` ADD CONSTRAINT `Product_Reviews_customer_id_fkey` FOREIGN KEY (`customer_id`) REFERENCES `Customers`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Product_Images` ADD CONSTRAINT `Product_Images_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `Products`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Sale_Items` ADD CONSTRAINT `Sale_Items_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `Products`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Sales` ADD CONSTRAINT `Sales_customer_id_fkey` FOREIGN KEY (`customer_id`) REFERENCES `Customers`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
