/*
  Warnings:

  - Added the required column `updatedAt` to the `orderItem` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "order" DROP CONSTRAINT "order_customerId_fkey";

-- DropIndex
DROP INDEX "attribute_name_storeCode_key";

-- AlterTable
ALTER TABLE "order" ALTER COLUMN "customerId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "orderItem" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "users"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
