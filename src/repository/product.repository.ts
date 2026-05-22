import { Prisma } from '@prisma/client';
import prisma from '../config/prisma';
import { CreateProductDto, ProductDto, UpdateProductDto } from '../dtos/product.dto';
import { ListResponseDto } from '../dtos/list-response.dto';
import { ProductFilterParams } from '../params/product.params';
import { IProductRepository } from './interfaces/iproduct.repository';

export class ProductRepository implements IProductRepository {
  async findAll(
    filters?: ProductFilterParams,
    page = 1,
    limit = 10,
    sortBy = 'createdAt',
    sortOrder: 'asc' | 'desc' = 'desc'
  ): Promise<ListResponseDto<ProductDto>> {
    const where: Prisma.ProductWhereInput = {};

    if (filters) {
      page = filters.page ?? page;
      limit = filters.recordPerPage ?? limit;

      if (filters.search) {
        where.OR = [
          { name: { contains: filters.search, mode: 'insensitive' } },
        ];
      }

      if (filters.categoryId !== undefined) where.categoryId = filters.categoryId;
      if (filters.status !== undefined) where.status = filters.status;

      if (filters.startDate !== undefined || filters.endDate !== undefined) {
        where.createdAt = {
          ...(filters.startDate !== undefined && { gte: filters.startDate }),
          ...(filters.endDate !== undefined && { lte: filters.endDate }),
        };
      }
    }

    const showAll = filters?.showAllRecords === true;
    const skip = showAll ? undefined : (page - 1) * limit;
    const take = showAll ? undefined : limit;

    const [data, total] = await Promise.all([
      prisma.product.findMany({
        where,
        orderBy: { [sortBy]: sortOrder },
        ...(skip !== undefined && { skip }),
        ...(take !== undefined && { take }),
      }),
      prisma.product.count({ where }),
    ]);

    return { totalRecord: total, data };
  }

  async findById(id: number): Promise<ProductDto | null> {
    return prisma.product.findUnique({ where: { id } });
  }

  async findBySlug(slug: string): Promise<ProductDto | null> {
    return prisma.product.findUnique({ where: { slug } });
  }

  async create(data: CreateProductDto): Promise<ProductDto> {
    return prisma.product.create({ data });
  }

  async update(id: number, data: UpdateProductDto): Promise<ProductDto> {
    return prisma.product.update({ where: { id }, data });
  }

  async delete(id: number): Promise<ProductDto> {
    return prisma.product.update({ where: { id }, data: { status: false } });
  }
}
