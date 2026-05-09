import prisma from "../config/prisma";
import { CategoryDto, CreateCategoryDto, UpdateCategoryDto } from "../dtos/category.dto";
import { ICategoryRepository } from "./interfaces/icategory.repository";

export class CategoryRepository implements ICategoryRepository {
  async findAll(): Promise<CategoryDto[]> {
    return prisma.category.findMany();
  }

  async findById(id: number): Promise<CategoryDto | null> {
    return prisma.category.findUnique({ where: { id } });
  }

  async create(data: CreateCategoryDto): Promise<CategoryDto> {
    return prisma.category.create({ data });
  }

  async update(id: number, data: UpdateCategoryDto): Promise<CategoryDto> {
    return prisma.category.update({ where: { id }, data });
  }

  async delete(id: number): Promise<CategoryDto> {
    return prisma.category.delete({ where: { id } });
  }
}
