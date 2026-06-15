import { Status } from "@prisma/client";

export interface CreateProductModel {
  name: string;
  brandNameId?: number | null;
  parentId?: number | null;
  attributeId?: number | null;
  slug: string;
  description?: string | null;
  price: number;
  cost?: number | null;
  stock?: number | null;
  lowStockThreshold?: number | null;
  categoryId: number;
  images?: string[];
  storeCode: string
  status?: Status;
  createdById: string;
}

export interface UpdateProductModel {
  name?: string;
  slug?: string;
  description?: string;
  parentId?: number | null;
  attributeId?: number | null;
  price?: number;
  cost?: number;
  stock?: number;
  lowStockThreshold?: number;
  categoryId?: number;
  images?: string[];
  isActive?: boolean;
}
