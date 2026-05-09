import { CreateProductVariantDto, ProductVariantDto, UpdateProductVariantDto } from "../../dtos/product-variant.dto";

export interface IProductVariantRepository {
  findAll(): Promise<ProductVariantDto[]>;
  findByProductId(productId: number): Promise<ProductVariantDto[]>;
  findById(id: number): Promise<ProductVariantDto | null>;
  create(data: CreateProductVariantDto): Promise<ProductVariantDto>;
  update(id: number, data: UpdateProductVariantDto): Promise<ProductVariantDto>;
  delete(id: number): Promise<ProductVariantDto>;
}
