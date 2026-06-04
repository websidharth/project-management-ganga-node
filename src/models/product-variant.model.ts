import { Status } from '../enum/status.enum';

export interface ProductVariantModel {
  name: string;
  slug?: string;
  productId: number;
  brandNameId?: number;
  productAttributeId?: number | null; 
  attributeId?: number | null;
  cost?: number;
  Price?: number;
  stock?: number;
  lowStockThreshold?: number | null;
  status?: Status;
  displayOrder?: number | null;
  isDefault?: boolean;
}

export interface UpdateProductVariantModel {
  name: string;
  slug?: string | null;
  productId: number;
  brandNameId?: number | null;
  productAttributeId?: number | null;
  storeCode: string;
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
