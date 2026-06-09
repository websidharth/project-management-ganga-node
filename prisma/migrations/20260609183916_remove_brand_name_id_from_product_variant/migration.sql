/*
  Warnings:

  - You are about to drop the column `brandNameId` on the `productVariant` table. All the data in the column will be lost.
  - You are about to drop the column `color` on the `productVariant` table. All the data in the column will be lost.
  - You are about to drop the column `displayOrder` on the `productVariant` table. All the data in the column will be lost.
  - You are about to drop the column `extraPrice` on the `productVariant` table. All the data in the column will be lost.
  - You are about to drop the column `extraSku` on the `productVariant` table. All the data in the column will be lost.
  - You are about to drop the column `isDefault` on the `productVariant` table. All the data in the column will be lost.
  - You are about to drop the column `material` on the `productVariant` table. All the data in the column will be lost.
  - You are about to drop the column `size` on the `productVariant` table. All the data in the column will be lost.
  - You are about to drop the column `varient` on the `productVariant` table. All the data in the column will be lost.
  - You are about to drop the column `voltage` on the `productVariant` table. All the data in the column will be lost.
  - Made the column `lowStockThreshold` on table `productVariant` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "productVariant" DROP CONSTRAINT "productVariant_brandNameId_fkey";

-- DropIndex
DROP INDEX "productVariant_extraSku_key";

-- AlterTable
ALTER TABLE "productVariant" DROP COLUMN "brandNameId",
DROP COLUMN "color",
DROP COLUMN "displayOrder",
DROP COLUMN "extraPrice",
DROP COLUMN "extraSku",
DROP COLUMN "isDefault",
DROP COLUMN "material",
DROP COLUMN "size",
DROP COLUMN "varient",
DROP COLUMN "voltage",
ALTER COLUMN "lowStockThreshold" SET NOT NULL;
