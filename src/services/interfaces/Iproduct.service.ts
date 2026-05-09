import { CreateProductDto, ProductDto, UpdateProductDto } from "../../dtos/product.dto";
import { ListResponseDto } from "../../dtos/list-response.dto";
import { ProductFilterParams } from "../../params/product.params";

export interface IProductService {
  getAll(filters?: ProductFilterParams): Promise<ListResponseDto<ProductDto>>;
  getById(id: number): Promise<ProductDto | null>;
  getBySlug(slug: string): Promise<ProductDto | null>;
  create(data: CreateProductDto, createdByUserId: string): Promise<ProductDto>;
  update(id: number, data: UpdateProductDto, updatedByUserId: string): Promise<ProductDto>;
  delete(id: number): Promise<ProductDto>;
}
