import { Status } from "@prisma/client";

export interface ProductVariantDto {
  id: number;
  name: string;
  slug?: string | null;
  productId: number;
  brandNameId?: number | null;
  productAttributeId?: number | null;
  attributeId?: number | null;
  cost: number;
  Price: number;
  stock: number;
  lowStockThreshold?: number | null;
  images: string[];
  status: Status;
  displayOrder?: number | null;
  createdAt: Date;
  updatedAt?: Date | null;
  isDefault: boolean;
  extraPrice?: number | null;
  varient?: string | null;
  size?: string | null;
  material?: string | null;
  voltage?: string | null;
  color?: string | null;
  extraSku?: string | null;
}

export interface CreateProductVariantDto {
  name: string;
  slug?: string | null;
  productId: number;
  brandNameId?: number | null;
  productAttributeId?: number | null;
  attributeId?: number | null;
  cost?: number;
  Price?: number;
  stock?: number;
  lowStockThreshold?: number | null;
  images?: string[];
  status?: Status;
  displayOrder?: number | null;
  isDefault?: boolean;
  extraPrice?: number | null;
  varient?: string | null;
  size?: string | null;
  material?: string | null;
  voltage?: string | null;
  color?: string | null;
  extraSku?: string | null;
}

export interface UpdateProductVariantDto {
  name?: string;
  slug?: string | null;
  brandNameId?: number | null;
  productAttributeId?: number | null;
  attributeId?: number | null;
  cost?: number;
  Price?: number;
  stock?: number;
  lowStockThreshold?: number | null;
  images?: string[];
  status?: Status;
  displayOrder?: number | null;
  isDefault?: boolean;
  extraPrice?: number | null;
  varient?: string | null;
  size?: string | null;
  material?: string | null;
  voltage?: string | null;
  color?: string | null;
  extraSku?: string | null;
}
