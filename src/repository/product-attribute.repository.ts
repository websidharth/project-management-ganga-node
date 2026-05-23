import { Prisma, Status } from "@prisma/client";
import prisma from "../config/prisma";
import { CreateProductAttributeDto, ProductAttributeDto, UpdateProductAttributeDto } from "../dtos/product-attribute.dto";
import { ListResponseDto } from "../dtos/list-response.dto";
import { ProductAttributeFilterParams } from "../params/product-attribute.params";
import { IProductAttributeRepository } from "./interfaces/iproduct-attribute.repository";

export class ProductAttributeRepository implements IProductAttributeRepository {
  async findAll(
    filters?: ProductAttributeFilterParams,
    page = 1,
    limit = 10,
    sortBy = 'id',
    sortOrder: 'asc' | 'desc' = 'asc'
  ): Promise<ListResponseDto<ProductAttributeDto>> {
    const where: Prisma.ProductAttributeWhereInput = { NOT: { status: Status.Trash } };

    if (filters) {
      page = filters.page ?? page;
      limit = filters.recordPerPage ?? limit;

      if (filters.productId !== undefined) where.productId = filters.productId;
      if (filters.attributeId !== undefined) where.attributeId = filters.attributeId;

      if (filters.status !== undefined) {
        where.status = filters.status;
      } else {
        where.NOT = { status: Status.Trash };
      }
    }

    const showAll = filters?.showAllRecords === true;
    const skip = showAll ? undefined : (page - 1) * limit;
    const take = showAll ? undefined : limit;

    const [data, total] = await Promise.all([
      prisma.productAttribute.findMany({
        where,
        orderBy: { [sortBy]: sortOrder },
        ...(skip !== undefined && { skip }),
        ...(take !== undefined && { take }),
      }),
      prisma.productAttribute.count({ where }),
    ]);

    return { totalRecord: total, data };
  }

  async findByProductId(productId: number): Promise<ProductAttributeDto[]> {
    return prisma.productAttribute.findMany({ where: { productId } });
  }

  async findById(id: number): Promise<ProductAttributeDto | null> {
    return prisma.productAttribute.findUnique({ where: { id } });
  }

  async create(data: CreateProductAttributeDto): Promise<ProductAttributeDto> {
    return prisma.productAttribute.create({ data });
  }

  async update(id: number, data: UpdateProductAttributeDto): Promise<ProductAttributeDto> {
    return prisma.productAttribute.update({ where: { id }, data });
  }

  async delete(id: number): Promise<ProductAttributeDto> {
    return prisma.productAttribute.update({ where: { id }, data: { status: Status.Trash } });
  }
}
