import { Status } from "@prisma/client";

export interface ProductAttributeDto {
  id: number;
  productId: number;
  attributeId: number;
  value: string;
  storeCode: string
  status: Status;
  displayOrder?: number | null;
}

export interface CreateProductAttributeDto {
  productId: number;
  attributeId: number;
  value: string;
  storeCode: string
  status?: Status;
  displayOrder?: number | null;
}

export interface UpdateProductAttributeDto {
  value?: string;
  status?: Status;
  displayOrder?: number | null;
}
