import { CategoryDto, CreateCategoryDto, UpdateCategoryDto } from "../../dtos/category.dto";
import { ListResponseDto } from "../../dtos/list-response.dto";
import { CategoryFilterParams } from "../../params/category.params";

export interface ICategoryService {
  getAll(filters?: CategoryFilterParams): Promise<ListResponseDto<CategoryDto>>;
  getById(id: number): Promise<CategoryDto | null>;
  create(data: CreateCategoryDto): Promise<CategoryDto>;
  update(id: number, data: UpdateCategoryDto): Promise<CategoryDto>;
  delete(id: number): Promise<CategoryDto>;
}
