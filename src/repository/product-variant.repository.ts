import { Prisma, Status } from "@prisma/client";
import prisma from "../config/prisma"; 
import { ListResponseDto } from "../dtos/list-response.dto";
import { ProductVariantFilterParams } from "../params/product-variant.params";
import { IProductVariantRepository } from "./interfaces/iproduct-variant.repository";

export class ProductVariantRepository implements IProductVariantRepository {
  async findAll(
    filters?: ProductVariantFilterParams,
    page = 1,
    limit = 10,
    sortBy = 'id',
    sortOrder: 'asc' | 'desc' = 'asc'
  ) {
    const where: Prisma.productVariantWhereInput = { NOT: { status: Status.Trash } };

    if (filters) {
      page = filters.page ?? page;
      limit = filters.recordPerPage ?? limit;

      if (filters.productId !== undefined) where.productId = filters.productId;

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
      prisma.productVariant.findMany({
        where,
        orderBy: { [sortBy]: sortOrder },
        ...(skip !== undefined && { skip }),
        ...(take !== undefined && { take }),
      }),
      prisma.productVariant.count({ where }),
    ]);

    return { totalRecord: total, data };
  }

  async findByProductId(productId: number) {
    return prisma.productVariant.findMany({ where: { productId, NOT: { status: Status.Trash } } });
  }

  async findById(id: number) {
    return prisma.productVariant.findUnique({ where: { id } });
  }
 
  async delete(id: number) {
    return prisma.productVariant.update({ where: { id }, data: { status: Status.Trash } });
  }
}
