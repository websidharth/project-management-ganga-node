/*
  Warnings:

  - You are about to drop the column `variantId` on the `orderItem` table. All the data in the column will be lost.
  - You are about to drop the column `sku` on the `product` table. All the data in the column will be lost.
  - You are about to drop the `productAttribute` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `productVariant` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "orderItem" DROP CONSTRAINT "orderItem_variantId_fkey";

-- DropForeignKey
ALTER TABLE "productAttribute" DROP CONSTRAINT "productAttribute_attributeId_fkey";

-- DropForeignKey
ALTER TABLE "productAttribute" DROP CONSTRAINT "productAttribute_productId_fkey";

-- DropForeignKey
ALTER TABLE "productAttribute" DROP CONSTRAINT "productAttribute_storeCode_fkey";

-- DropForeignKey
ALTER TABLE "productVariant" DROP CONSTRAINT "productVariant_attributeId_fkey";

-- DropForeignKey
ALTER TABLE "productVariant" DROP CONSTRAINT "productVariant_productAttributeId_fkey";

-- DropForeignKey
ALTER TABLE "productVariant" DROP CONSTRAINT "productVariant_productId_fkey";

-- DropForeignKey
ALTER TABLE "productVariant" DROP CONSTRAINT "productVariant_storeCode_fkey";

-- DropIndex
DROP INDEX "product_sku_key";

-- AlterTable
ALTER TABLE "orderItem" DROP COLUMN "variantId";

-- AlterTable
ALTER TABLE "product" DROP COLUMN "sku",
ADD COLUMN     "attributeId" INTEGER,
ADD COLUMN     "parentId" INTEGER;

-- DropTable
DROP TABLE "productAttribute";

-- DropTable
DROP TABLE "productVariant";

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_attributeId_fkey" FOREIGN KEY ("attributeId") REFERENCES "attribute"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "product"("id") ON DELETE SET NULL ON UPDATE CASCADE;
