import { CreateProductDto, ProductResponseDto } from "../../dtos/product.dto";
import { ListResponseDto } from "../../dtos/list-response.dto";
import { ProductFilterParams } from "../../params/product.params";

export interface IProductService {
  getAll(filters?: ProductFilterParams): Promise<ListResponseDto<ProductResponseDto>>;
  getById(id: number): Promise<ProductResponseDto | null>;
  getBySlug(slug: string): Promise<ProductResponseDto | null>;
  getBySku(sku: string): Promise<ProductResponseDto | null>;
  create(data: CreateProductDto, createdByUserId: string): Promise<ProductResponseDto>;
  update(id: number, data: CreateProductDto, updatedByUserId: string): Promise<ProductResponseDto>;
  delete(id: number): Promise<ProductResponseDto>;
}
