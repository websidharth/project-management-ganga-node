-- AlterTable
ALTER TABLE "Attribute" ADD COLUMN     "displayOrder" INTEGER DEFAULT 0,
ADD COLUMN     "status" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "displayOrder" INTEGER DEFAULT 0,
ADD COLUMN     "status" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "displayOrder" INTEGER DEFAULT 0;

-- AlterTable
ALTER TABLE "ProductAttribute" ADD COLUMN     "displayOrder" INTEGER DEFAULT 0,
ADD COLUMN     "status" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "ProductVariant" ADD COLUMN     "displayOrder" INTEGER DEFAULT 0,
ADD COLUMN     "status" BOOLEAN NOT NULL DEFAULT true;
