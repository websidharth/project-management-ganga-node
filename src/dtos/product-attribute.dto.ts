export interface ProductAttributeDto {
  id: number;
  productId: number;
  attributeId: number;
  value: string;
}

export interface CreateProductAttributeDto {
  productId: number;
  attributeId: number;
  value: string;
}

export interface UpdateProductAttributeDto {
  value: string;
}
