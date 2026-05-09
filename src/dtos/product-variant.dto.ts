export interface ProductVariantDto {
  id: number;
  productId: number;
  size?: string | null;
  material?: string | null;
  voltage?: string | null;
  color?: string | null;
  extraSku?: string | null;
  extraPrice?: number | null;
  stock: number;
  isDefault: boolean;
}

export interface CreateProductVariantDto {
  productId: number;
  size?: string | null;
  material?: string | null;
  voltage?: string | null;
  color?: string | null;
  extraSku?: string | null;
  extraPrice?: number | null;
  stock?: number;
  isDefault?: boolean;
}

export interface UpdateProductVariantDto {
  size?: string | null;
  material?: string | null;
  voltage?: string | null;
  color?: string | null;
  extraSku?: string | null;
  extraPrice?: number | null;
  stock?: number;
  isDefault?: boolean;
}
