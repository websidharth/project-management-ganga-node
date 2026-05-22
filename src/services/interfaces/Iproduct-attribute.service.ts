import { CreateProductAttributeDto, ProductAttributeDto, UpdateProductAttributeDto } from "../../dtos/product-attribute.dto";
import { ListResponseDto } from "../../dtos/list-response.dto";
import { ProductAttributeFilterParams } from "../../params/product-attribute.params";

export interface IProductAttributeService {
  getAll(filters?: ProductAttributeFilterParams): Promise<ListResponseDto<ProductAttributeDto>>;
  getByProductId(productId: number): Promise<ProductAttributeDto[]>;
  getById(id: number): Promise<ProductAttributeDto | null>;
  create(data: CreateProductAttributeDto): Promise<ProductAttributeDto>;
  update(id: number, data: UpdateProductAttributeDto): Promise<ProductAttributeDto>;
  delete(id: number): Promise<ProductAttributeDto>;
}
