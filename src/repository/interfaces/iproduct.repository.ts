import { ProductResponseDto } from '../../dtos/product.dto';
import { ListResponseDto } from '../../dtos/list-response.dto';
import { ProductFilterParams } from '../../params/product.params';

export interface IProductRepository {
  findAll(filters?: ProductFilterParams, page?: number, limit?: number, sortBy?: string, sortOrder?: 'asc' | 'desc'): Promise<ListResponseDto<ProductResponseDto>>;
  findById(id: number): Promise<ProductResponseDto | null>;
  findBySlug(slug: string): Promise<ProductResponseDto | null>;
  getLowStockProducts(storeCode: string, page?: number, limit?: number): Promise<ListResponseDto<ProductResponseDto>>;
  delete(id: number): Promise<ProductResponseDto>;
}
