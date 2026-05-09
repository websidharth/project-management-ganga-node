export interface CreateProductAttributeModel {
  productId: number;
  attributeId: number;
  value: string;
}

export interface UpdateProductAttributeModel {
  value: string;
}
