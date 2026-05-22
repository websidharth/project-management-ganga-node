-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "brandNameId" INTEGER;

-- CreateTable
CREATE TABLE "BrandName" (
    "id" SERIAL NOT NULL,
    "brandName" TEXT,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "displayOrder" INTEGER DEFAULT 0,

    CONSTRAINT "BrandName_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_brandNameId_fkey" FOREIGN KEY ("brandNameId") REFERENCES "BrandName"("id") ON DELETE SET NULL ON UPDATE CASCADE;
