import { CreateProductDto, ProductDto, UpdateProductDto } from '../../dtos/product.dto';
import { ListResponseDto } from '../../dtos/list-response.dto';
import { ProductFilterParams } from '../../params/product.params';

export interface IProductRepository {
  findAll(filters?: ProductFilterParams, page?: number, limit?: number, sortBy?: string, sortOrder?: 'asc' | 'desc'): Promise<ListResponseDto<ProductDto>>;
  findById(id: number): Promise<ProductDto | null>;
  findBySlug(slug: string): Promise<ProductDto | null>;
  create(data: CreateProductDto): Promise<ProductDto>;
  update(id: number, data: UpdateProductDto): Promise<ProductDto>;
  delete(id: number): Promise<ProductDto>;
}
