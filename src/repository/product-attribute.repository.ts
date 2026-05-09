import prisma from "../config/prisma";
import { CreateProductAttributeDto, ProductAttributeDto, UpdateProductAttributeDto } from "../dtos/product-attribute.dto";
import { IProductAttributeRepository } from "./interfaces/iproduct-attribute.repository";

export class ProductAttributeRepository implements IProductAttributeRepository {
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
    return prisma.productAttribute.delete({ where: { id } });
  }
}
