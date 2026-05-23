import { CreateProductVariantDto, ProductVariantDto, UpdateProductVariantDto } from "../../dtos/product-variant.dto";
import { ListResponseDto } from "../../dtos/list-response.dto";
import { ProductVariantFilterParams } from "../../params/product-variant.params";

export interface IProductVariantService {
  getAll(filters?: ProductVariantFilterParams): Promise<ListResponseDto<ProductVariantDto>>;
  getByProductId(productId: number): Promise<ProductVariantDto[]>;
  getById(id: number): Promise<ProductVariantDto | null>;
  create(data: CreateProductVariantDto): Promise<ProductVariantDto>;
  update(id: number, data: UpdateProductVariantDto): Promise<ProductVariantDto>;
  delete(id: number): Promise<ProductVariantDto>;
}
