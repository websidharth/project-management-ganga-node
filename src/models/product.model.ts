import { Status } from "@prisma/client";

export interface CreateProductModel {
  name: string;
  brandNameId?: number | null;
  slug: string;
  description?: string | null;
  sku: string;
  price: number;
  cost?: number | null;
  stock?: number | null;
  lowStockThreshold?: number | null;
  categoryId: number;
  storeCode: string
  status?: Status;
  createdById: string;
}

export interface UpdateProductModel {
  name?: string;
  slug?: string;
  description?: string;
  sku?: string;
  price?: number;
  cost?: number;
  stock?: number;
  lowStockThreshold?: number;
  categoryId?: number;
  images?: string[];
  isActive?: boolean;
}
