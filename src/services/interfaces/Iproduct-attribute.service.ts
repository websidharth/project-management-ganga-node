import {   ProductAttributeDto } from "../../dtos/product-attribute.dto";
import { ListResponseDto } from "../../dtos/list-response.dto";
import { ProductAttributeFilterParams } from "../../params/product-attribute.params";
import { ProductAttributeModel } from "../../models/product-attribute.model";

export interface IProductAttributeService {
  getAll(filters?: ProductAttributeFilterParams): Promise<ListResponseDto<ProductAttributeDto>>;
  getByProductId(productId: number): Promise<ProductAttributeDto[]>;
  getById(id: number): Promise<ProductAttributeDto | null>;
  create(data: ProductAttributeModel, storeCode:string): Promise<ProductAttributeDto>;
  update(id: number, data: ProductAttributeModel): Promise<ProductAttributeDto>;
  delete(id: number): Promise<ProductAttributeDto>;
}
