import { CreateProductVariantDto, ProductVariantDto, UpdateProductVariantDto } from "../../dtos/product-variant.dto";

export interface IProductVariantService {
  getAll(): Promise<ProductVariantDto[]>;
  getByProductId(productId: number): Promise<ProductVariantDto[]>;
  getById(id: number): Promise<ProductVariantDto | null>;
  create(data: CreateProductVariantDto): Promise<ProductVariantDto>;
  update(id: number, data: UpdateProductVariantDto): Promise<ProductVariantDto>;
  delete(id: number): Promise<ProductVariantDto>;
}
