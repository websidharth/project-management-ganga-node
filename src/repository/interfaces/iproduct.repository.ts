import { CreateProductDto, ProductResponseDto } from '../../dtos/product.dto';
import { ListResponseDto } from '../../dtos/list-response.dto';
import { ProductFilterParams } from '../../params/product.params';

export interface IProductRepository {
  findAll(filters?: ProductFilterParams, page?: number, limit?: number, sortBy?: string, sortOrder?: 'asc' | 'desc'): Promise<ListResponseDto<ProductResponseDto>>;
  findById(id: number): Promise<ProductResponseDto | null>;
  findBySlug(slug: string): Promise<ProductResponseDto | null>;
  findBySku(sku: string): Promise<ProductResponseDto | null>;
  create(data: CreateProductDto): Promise<ProductResponseDto>;
  update(id: number, data: CreateProductDto): Promise<ProductResponseDto>;
  delete(id: number): Promise<ProductResponseDto>;
}
