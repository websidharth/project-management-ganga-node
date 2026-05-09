import { CreateProductAttributeDto, ProductAttributeDto, UpdateProductAttributeDto } from "../../dtos/product-attribute.dto";

export interface IProductAttributeRepository {
  findByProductId(productId: number): Promise<ProductAttributeDto[]>;
  findById(id: number): Promise<ProductAttributeDto | null>;
  create(data: CreateProductAttributeDto): Promise<ProductAttributeDto>;
  update(id: number, data: UpdateProductAttributeDto): Promise<ProductAttributeDto>;
  delete(id: number): Promise<ProductAttributeDto>;
}
