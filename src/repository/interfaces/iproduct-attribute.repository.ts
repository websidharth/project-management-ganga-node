import {  ProductAttributeDto } from "../../dtos/product-attribute.dto";
import { ListResponseDto } from "../../dtos/list-response.dto";
import { ProductAttributeFilterParams } from "../../params/product-attribute.params";

export interface IProductAttributeRepository {
  findAll(filters?: ProductAttributeFilterParams, page?: number, limit?: number, sortBy?: string, sortOrder?: 'asc' | 'desc'): Promise<ListResponseDto<ProductAttributeDto>>;
  findByProductId(productId: number): Promise<ProductAttributeDto[]>;
  findById(id: number): Promise<ProductAttributeDto | null>; 
  delete(id: number): Promise<ProductAttributeDto>;
}
