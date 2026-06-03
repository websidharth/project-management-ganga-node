-- CreateEnum
CREATE TYPE "Role" AS ENUM ('SUPER_ADMIN', 'ADMIN', 'USER', 'STAFF');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE', 'OTHER');

-- CreateEnum
CREATE TYPE "AttendanceStatus" AS ENUM ('PRESENT', 'ABSENT', 'LATE', 'LEAVE', 'HALF_DAY');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'PARTIAL', 'PAID', 'OVERDUE', 'CANCELLED');

-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('CASH', 'CARD', 'UPI', 'BANK_TRANSFER', 'ONLINE');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('Published', 'Draft', 'Trash');

-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('PENDING', 'CONFIRMED', 'SHIPPED', 'DELIVERED', 'CANCELLED', 'RETURNED');

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "phone" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "isRegisterbyShop" BOOLEAN NOT NULL DEFAULT false,
    "isEmailVerified" BOOLEAN NOT NULL DEFAULT false,
    "emailVerificationToken" TEXT,
    "emailVerificationExpires" TIMESTAMP(3),
    "isPhoneVerified" BOOLEAN NOT NULL DEFAULT false,
    "profileImageUrl" TEXT,
    "loginAttempts" INTEGER NOT NULL DEFAULT 0,
    "lastLoginAt" TIMESTAMP(3),
    "lastLoginIP" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "status" "Status" NOT NULL DEFAULT 'Published',
    "token" TEXT,
    "tokenUpdated" BOOLEAN NOT NULL DEFAULT false,
    "refreshToken" TEXT,
    "metadata" JSONB,
    "storeCode" TEXT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "userProfile" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "phone" TEXT,
    "email" TEXT NOT NULL,
    "dateOfBirth" TIMESTAMP(3),
    "address" TEXT,
    "city" TEXT,
    "state" TEXT,
    "pincode" TEXT,
    "bio" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "userProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "store" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "address" TEXT,
    "phone" TEXT,
    "email" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'Published',

    CONSTRAINT "store_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "parentId" INTEGER,
    "storeCode" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'Published',
    "displayOrder" INTEGER DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "brandNameId" INTEGER,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "sku" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "cost" DOUBLE PRECISION,
    "stock" INTEGER NOT NULL DEFAULT 0,
    "lowStockThreshold" INTEGER DEFAULT 5,
    "categoryId" INTEGER NOT NULL,
    "images" TEXT[],
    "storeCode" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'Published',
    "displayOrder" INTEGER DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdById" TEXT NOT NULL,
    "updatedById" TEXT,

    CONSTRAINT "product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "brandName" (
    "id" SERIAL NOT NULL,
    "brandName" TEXT NOT NULL,
    "storeCode" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'Published',
    "displayOrder" INTEGER DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "brandName_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "attribute" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "unit" TEXT,
    "storeCode" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'Published',
    "displayOrder" INTEGER DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "attribute_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "productAttribute" (
    "id" SERIAL NOT NULL,
    "productId" INTEGER NOT NULL,
    "attributeId" INTEGER NOT NULL,
    "value" TEXT NOT NULL,
    "storeCode" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'Published',
    "displayOrder" INTEGER DEFAULT 0,

    CONSTRAINT "productAttribute_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "productVariant" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT,
    "productId" INTEGER NOT NULL,
    "brandNameId" INTEGER,
    "productAttributeId" INTEGER,
    "storeCode" TEXT NOT NULL,
    "cost" INTEGER NOT NULL DEFAULT 0,
    "Price" INTEGER NOT NULL DEFAULT 0,
    "stock" INTEGER NOT NULL DEFAULT 0,
    "lowStockThreshold" INTEGER DEFAULT 5,
    "images" TEXT[],
    "status" "Status" NOT NULL DEFAULT 'Published',
    "displayOrder" INTEGER DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "isDefault" BOOLEAN NOT NULL DEFAULT false,
    "extraPrice" DOUBLE PRECISION,
    "varient" TEXT,
    "size" TEXT,
    "material" TEXT,
    "voltage" TEXT,
    "color" TEXT,
    "extraSku" TEXT,
    "attributeId" INTEGER,

    CONSTRAINT "productVariant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "staff" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "storeCode" TEXT NOT NULL,
    "position" TEXT,
    "department" TEXT,
    "hireDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "salary" DOUBLE PRECISION,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "staff_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "staffAttendance" (
    "id" SERIAL NOT NULL,
    "staffId" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "status" "AttendanceStatus" NOT NULL DEFAULT 'PRESENT',
    "checkInTime" TIMESTAMP(3),
    "checkOutTime" TIMESTAMP(3),
    "overtimeHours" DOUBLE PRECISION,
    "remarks" TEXT,
    "recordedBy" INTEGER,
    "storeCode" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "staffAttendance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order" (
    "id" SERIAL NOT NULL,
    "orderNumber" TEXT NOT NULL,
    "customerId" INTEGER NOT NULL,
    "orderDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "totalAmount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "discount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "tax" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "shippingCost" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "grandTotal" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "status" "OrderStatus" NOT NULL DEFAULT 'PENDING',
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "storeCode" TEXT NOT NULL,

    CONSTRAINT "order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orderItem" (
    "id" SERIAL NOT NULL,
    "orderId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    "variantId" INTEGER,
    "storeCode" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "unitPrice" DOUBLE PRECISION NOT NULL,
    "totalPrice" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "orderItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payment" (
    "id" SERIAL NOT NULL,
    "orderId" INTEGER NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "method" "PaymentMethod" NOT NULL,
    "status" "PaymentStatus" NOT NULL DEFAULT 'PENDING',
    "transactionId" TEXT,
    "paymentDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "remarks" TEXT,
    "storeCode" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "payment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "staffSalary" (
    "id" SERIAL NOT NULL,
    "staffId" INTEGER NOT NULL,
    "month" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "baseSalary" DOUBLE PRECISION NOT NULL,
    "attendanceBonus" DOUBLE PRECISION,
    "deductions" DOUBLE PRECISION,
    "advanceDeduction" DOUBLE PRECISION,
    "netPayable" DOUBLE PRECISION NOT NULL,
    "paidAmount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "status" "PaymentStatus" NOT NULL DEFAULT 'PENDING',
    "paymentDate" TIMESTAMP(3),
    "remarks" TEXT,
    "processedBy" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "storeCode" TEXT NOT NULL,

    CONSTRAINT "staffSalary_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_brandNameTocategory" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "users_userId_key" ON "users"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "users_userName_key" ON "users"("userName");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_emailVerificationToken_key" ON "users"("emailVerificationToken");

-- CreateIndex
CREATE INDEX "users_userId_idx" ON "users"("userId");

-- CreateIndex
CREATE INDEX "users_email_idx" ON "users"("email");

-- CreateIndex
CREATE INDEX "users_phone_idx" ON "users"("phone");

-- CreateIndex
CREATE INDEX "users_role_idx" ON "users"("role");

-- CreateIndex
CREATE UNIQUE INDEX "userProfile_userId_key" ON "userProfile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "userProfile_email_key" ON "userProfile"("email");

-- CreateIndex
CREATE UNIQUE INDEX "store_name_key" ON "store"("name");

-- CreateIndex
CREATE UNIQUE INDEX "store_code_key" ON "store"("code");

-- CreateIndex
CREATE INDEX "category_storeCode_idx" ON "category"("storeCode");

-- CreateIndex
CREATE UNIQUE INDEX "category_name_storeCode_key" ON "category"("name", "storeCode");

-- CreateIndex
CREATE UNIQUE INDEX "product_slug_key" ON "product"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "product_sku_key" ON "product"("sku");

-- CreateIndex
CREATE INDEX "brandName_id_idx" ON "brandName"("id");

-- CreateIndex
CREATE INDEX "brandName_storeCode_idx" ON "brandName"("storeCode");

-- CreateIndex
CREATE UNIQUE INDEX "brandName_brandName_storeCode_key" ON "brandName"("brandName", "storeCode");

-- CreateIndex
CREATE INDEX "attribute_id_idx" ON "attribute"("id");

-- CreateIndex
CREATE INDEX "attribute_storeCode_idx" ON "attribute"("storeCode");

-- CreateIndex
CREATE UNIQUE INDEX "attribute_name_storeCode_key" ON "attribute"("name", "storeCode");

-- CreateIndex
CREATE INDEX "productAttribute_storeCode_idx" ON "productAttribute"("storeCode");

-- CreateIndex
CREATE UNIQUE INDEX "productVariant_slug_key" ON "productVariant"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "productVariant_extraSku_key" ON "productVariant"("extraSku");

-- CreateIndex
CREATE INDEX "productVariant_storeCode_idx" ON "productVariant"("storeCode");

-- CreateIndex
CREATE UNIQUE INDEX "staff_userId_key" ON "staff"("userId");

-- CreateIndex
CREATE INDEX "staff_userId_idx" ON "staff"("userId");

-- CreateIndex
CREATE INDEX "staff_storeCode_idx" ON "staff"("storeCode");

-- CreateIndex
CREATE INDEX "staff_isActive_idx" ON "staff"("isActive");

-- CreateIndex
CREATE INDEX "staffAttendance_staffId_idx" ON "staffAttendance"("staffId");

-- CreateIndex
CREATE INDEX "staffAttendance_date_idx" ON "staffAttendance"("date");

-- CreateIndex
CREATE UNIQUE INDEX "staffAttendance_staffId_date_key" ON "staffAttendance"("staffId", "date");

-- CreateIndex
CREATE UNIQUE INDEX "order_orderNumber_key" ON "order"("orderNumber");

-- CreateIndex
CREATE INDEX "order_customerId_idx" ON "order"("customerId");

-- CreateIndex
CREATE INDEX "order_orderNumber_idx" ON "order"("orderNumber");

-- CreateIndex
CREATE INDEX "order_status_idx" ON "order"("status");

-- CreateIndex
CREATE INDEX "orderItem_orderId_idx" ON "orderItem"("orderId");

-- CreateIndex
CREATE INDEX "orderItem_productId_idx" ON "orderItem"("productId");

-- CreateIndex
CREATE INDEX "orderItem_storeCode_idx" ON "orderItem"("storeCode");

-- CreateIndex
CREATE UNIQUE INDEX "payment_transactionId_key" ON "payment"("transactionId");

-- CreateIndex
CREATE INDEX "payment_orderId_idx" ON "payment"("orderId");

-- CreateIndex
CREATE INDEX "payment_transactionId_idx" ON "payment"("transactionId");

-- CreateIndex
CREATE INDEX "payment_paymentDate_idx" ON "payment"("paymentDate");

-- CreateIndex
CREATE INDEX "payment_storeCode_idx" ON "payment"("storeCode");

-- CreateIndex
CREATE INDEX "staffSalary_staffId_idx" ON "staffSalary"("staffId");

-- CreateIndex
CREATE INDEX "staffSalary_status_idx" ON "staffSalary"("status");

-- CreateIndex
CREATE INDEX "staffSalary_month_year_idx" ON "staffSalary"("month", "year");

-- CreateIndex
CREATE UNIQUE INDEX "staffSalary_staffId_month_year_key" ON "staffSalary"("staffId", "month", "year");

-- CreateIndex
CREATE UNIQUE INDEX "_brandNameTocategory_AB_unique" ON "_brandNameTocategory"("A", "B");

-- CreateIndex
CREATE INDEX "_brandNameTocategory_B_index" ON "_brandNameTocategory"("B");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_storeCode_fkey" FOREIGN KEY ("storeCode") REFERENCES "store"("code") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userProfile" ADD CONSTRAINT "userProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "category" ADD CONSTRAINT "category_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "category" ADD CONSTRAINT "category_storeCode_fkey" FOREIGN KEY ("storeCode") REFERENCES "store"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_brandNameId_fkey" FOREIGN KEY ("brandNameId") REFERENCES "brandName"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_storeCode_fkey" FOREIGN KEY ("storeCode") REFERENCES "store"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "users"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "users"("userId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "brandName" ADD CONSTRAINT "brandName_storeCode_fkey" FOREIGN KEY ("storeCode") REFERENCES "store"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attribute" ADD CONSTRAINT "attribute_storeCode_fkey" FOREIGN KEY ("storeCode") REFERENCES "store"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "productAttribute" ADD CONSTRAINT "productAttribute_storeCode_fkey" FOREIGN KEY ("storeCode") REFERENCES "store"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "productAttribute" ADD CONSTRAINT "productAttribute_attributeId_fkey" FOREIGN KEY ("attributeId") REFERENCES "attribute"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "productAttribute" ADD CONSTRAINT "productAttribute_productId_fkey" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "productVariant" ADD CONSTRAINT "productVariant_productId_fkey" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "productVariant" ADD CONSTRAINT "productVariant_brandNameId_fkey" FOREIGN KEY ("brandNameId") REFERENCES "brandName"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "productVariant" ADD CONSTRAINT "productVariant_productAttributeId_fkey" FOREIGN KEY ("productAttributeId") REFERENCES "productAttribute"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "productVariant" ADD CONSTRAINT "productVariant_attributeId_fkey" FOREIGN KEY ("attributeId") REFERENCES "attribute"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "productVariant" ADD CONSTRAINT "productVariant_storeCode_fkey" FOREIGN KEY ("storeCode") REFERENCES "store"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "staff" ADD CONSTRAINT "staff_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "staff" ADD CONSTRAINT "staff_storeCode_fkey" FOREIGN KEY ("storeCode") REFERENCES "store"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "staffAttendance" ADD CONSTRAINT "staffAttendance_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "staffAttendance" ADD CONSTRAINT "staffAttendance_recordedBy_fkey" FOREIGN KEY ("recordedBy") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "staffAttendance" ADD CONSTRAINT "staffAttendance_storeCode_fkey" FOREIGN KEY ("storeCode") REFERENCES "store"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_storeCode_fkey" FOREIGN KEY ("storeCode") REFERENCES "store"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orderItem" ADD CONSTRAINT "orderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orderItem" ADD CONSTRAINT "orderItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orderItem" ADD CONSTRAINT "orderItem_variantId_fkey" FOREIGN KEY ("variantId") REFERENCES "productVariant"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orderItem" ADD CONSTRAINT "orderItem_storeCode_fkey" FOREIGN KEY ("storeCode") REFERENCES "store"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment" ADD CONSTRAINT "payment_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment" ADD CONSTRAINT "payment_storeCode_fkey" FOREIGN KEY ("storeCode") REFERENCES "store"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "staffSalary" ADD CONSTRAINT "staffSalary_storeCode_fkey" FOREIGN KEY ("storeCode") REFERENCES "store"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "staffSalary" ADD CONSTRAINT "staffSalary_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "staffSalary" ADD CONSTRAINT "staffSalary_processedBy_fkey" FOREIGN KEY ("processedBy") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_brandNameTocategory" ADD CONSTRAINT "_brandNameTocategory_A_fkey" FOREIGN KEY ("A") REFERENCES "brandName"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_brandNameTocategory" ADD CONSTRAINT "_brandNameTocategory_B_fkey" FOREIGN KEY ("B") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE CASCADE;
