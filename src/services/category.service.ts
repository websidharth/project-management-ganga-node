import { inject, injectable } from "inversify";
import { TYPES } from "../config/ioc.types";
import { CategoryDto, CreateCategoryDto, UpdateCategoryDto } from "../dtos/category.dto";
import { ListResponseDto } from "../dtos/list-response.dto";
import { CategoryFilterParams } from "../params/category.params";
import { ICategoryService } from "./interfaces/Icategory.service";
import type IUnitOfWork from "../repository/interfaces/iunitofwork.repository";
import NotFoundError from "../exceptions/not-found-error";

@injectable()
export class CategoryService implements ICategoryService {
  constructor(
    @inject(TYPES.IUnitOfWork) private unitOfWork: IUnitOfWork
  ) { }

  async getAll(filters?: CategoryFilterParams): Promise<ListResponseDto<CategoryDto>> {
    return this.unitOfWork.Category.findAll(filters);
  }

  async getById(id: number): Promise<CategoryDto | null> {
    const category = await this.unitOfWork.Category.findById(id);
    if (!category) throw new NotFoundError("Category not found");
    return category;
  }

  async create(data: CreateCategoryDto): Promise<CategoryDto> {
    return this.unitOfWork.Category.create(data);
  }

  async update(id: number, data: UpdateCategoryDto): Promise<CategoryDto> {
    const existing = await this.unitOfWork.Category.findById(id);
    if (!existing) throw new NotFoundError("Category not found");
    return this.unitOfWork.Category.update(id, { ...data, updatedAt: new Date() });
  }

  async delete(id: number): Promise<CategoryDto> {
    const existing = await this.unitOfWork.Category.findById(id);
    if (!existing) throw new NotFoundError("Category not found");
    return this.unitOfWork.Category.delete(id);
  }
}
