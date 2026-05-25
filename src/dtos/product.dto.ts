import { Status } from "@prisma/client";

export interface ProductResponseDto {
  id: number;
  name: string;
  brandNameId?: number | null;
  slug: string;
  description?: string | null;
  sku: string;
  price: number;
  cost?: number | null;
  stock: number;
  lowStockThreshold?: number | null;
  categoryId: number;
  images: string[];
  storeId: number;
  status: Status;
  displayOrder?: number | null;
  createdById: number;
  updatedById?: number | null;
  createdAt: Date;
  updatedAt: Date | null;
}

export interface CreateProductDto {
  name: string;
  brandNameId?: number | null;
  slug: string;
  description?: string | null;
  sku: string;
  price: number;
  cost?: number | null;
  stock?: number;
  lowStockThreshold?: number | null;
  categoryId: number;
  images?: string[];
  storeId: number;
  status?: Status;
  displayOrder?: number | null;
  createdById: number;
  updatedAt?: Date;
  updatedById?: number | null;
}

