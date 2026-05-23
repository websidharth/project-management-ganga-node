import { CreateProductVariantDto, ProductVariantDto, UpdateProductVariantDto } from "../../dtos/product-variant.dto";
import { ListResponseDto } from "../../dtos/list-response.dto";
import { ProductVariantFilterParams } from "../../params/product-variant.params";

export interface IProductVariantRepository {
  findAll(filters?: ProductVariantFilterParams, page?: number, limit?: number, sortBy?: string, sortOrder?: 'asc' | 'desc'): Promise<ListResponseDto<ProductVariantDto>>;
  findByProductId(productId: number): Promise<ProductVariantDto[]>;
  findById(id: number): Promise<ProductVariantDto | null>;
  create(data: CreateProductVariantDto): Promise<ProductVariantDto>;
  update(id: number, data: UpdateProductVariantDto): Promise<ProductVariantDto>;
  delete(id: number): Promise<ProductVariantDto>;
}
