import {ProductVariantDto } from "../../dtos/product-variant.dto";
import { ListResponseDto } from "../../dtos/list-response.dto";
import { ProductVariantFilterParams } from "../../params/product-variant.params";
import { ProductVariantModel, UpdateProductVariantModel } from "../../models/product-variant.model";

export interface IProductVariantService {
  getAll(filters?: ProductVariantFilterParams): Promise<ListResponseDto<ProductVariantDto>>;
  getByProductId(productId: number): Promise<ProductVariantDto[]>;
  getById(id: number): Promise<ProductVariantDto | null>;
  create(data: ProductVariantModel, storeCode:string): Promise<ProductVariantDto>;
  update(id: number, data: UpdateProductVariantModel): Promise<ProductVariantDto>;
  delete(id: number): Promise<ProductVariantDto>;
}
