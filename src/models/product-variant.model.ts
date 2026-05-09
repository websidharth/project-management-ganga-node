export interface CreateProductVariantModel {
  productId: number;
  size?: string;
  material?: string;
  voltage?: string;
  color?: string;
  extraSku?: string;
  extraPrice?: number;
  stock?: number;
  isDefault?: boolean;
}

export interface UpdateProductVariantModel {
  size?: string;
  material?: string;
  voltage?: string;
  color?: string;
  extraSku?: string;
  extraPrice?: number;
  stock?: number;
  isDefault?: boolean;
}
