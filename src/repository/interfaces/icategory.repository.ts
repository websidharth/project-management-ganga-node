import { CategoryDto, CreateCategoryDto, UpdateCategoryDto } from "../../dtos/category.dto";
import { ListResponseDto } from "../../dtos/list-response.dto";
import { CategoryFilterParams } from "../../params/category.params";

export interface ICategoryRepository {
  findAll(filters?: CategoryFilterParams, page?: number, limit?: number, sortBy?: string, sortOrder?: 'asc' | 'desc'): Promise<ListResponseDto<CategoryDto>>;
  findById(id: number): Promise<CategoryDto | null>;
  create(data: CreateCategoryDto): Promise<CategoryDto>;
  update(id: number, data: UpdateCategoryDto): Promise<CategoryDto>;
  delete(id: number): Promise<CategoryDto>;
}
