import { Status } from "../enum/status.enum";

export interface  ProductAttributeModel {
  productId: number;
  attributeId: number;
  value: string;
  status?: Status;
  displayOrder?: number | null;
}
 

export interface UpdateProductAttributeModel {
  value: string;
}
