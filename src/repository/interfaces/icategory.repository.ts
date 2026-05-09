import { CategoryDto, CreateCategoryDto, UpdateCategoryDto } from "../../dtos/category.dto";

export interface ICategoryRepository {
  findAll(): Promise<CategoryDto[]>;
  findById(id: number): Promise<CategoryDto | null>;
  create(data: CreateCategoryDto): Promise<CategoryDto>;
  update(id: number, data: UpdateCategoryDto): Promise<CategoryDto>;
  delete(id: number): Promise<CategoryDto>;
}
