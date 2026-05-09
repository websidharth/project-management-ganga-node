import { CreateProductAttributeDto, ProductAttributeDto, UpdateProductAttributeDto } from "../../dtos/product-attribute.dto";

export interface IProductAttributeService {
  getByProductId(productId: number): Promise<ProductAttributeDto[]>;
  getById(id: number): Promise<ProductAttributeDto | null>;
  create(data: CreateProductAttributeDto): Promise<ProductAttributeDto>;
  update(id: number, data: UpdateProductAttributeDto): Promise<ProductAttributeDto>;
  delete(id: number): Promise<ProductAttributeDto>;
}
