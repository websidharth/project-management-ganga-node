import prisma from "../config/prisma";
import { CreateProductVariantDto, ProductVariantDto, UpdateProductVariantDto } from "../dtos/product-variant.dto";
import { IProductVariantRepository } from "./interfaces/iproduct-variant.repository";

export class ProductVariantRepository implements IProductVariantRepository {
  async findAll(): Promise<ProductVariantDto[]> {
    return prisma.productVariant.findMany();
  }

  async findByProductId(productId: number): Promise<ProductVariantDto[]> {
    return prisma.productVariant.findMany({ where: { productId } });
  }

  async findById(id: number): Promise<ProductVariantDto | null> {
    return prisma.productVariant.findUnique({ where: { id } });
  }

  async create(data: CreateProductVariantDto): Promise<ProductVariantDto> {
    return prisma.productVariant.create({ data });
  }

  async update(id: number, data: UpdateProductVariantDto): Promise<ProductVariantDto> {
    return prisma.productVariant.update({ where: { id }, data });
  }

  async delete(id: number): Promise<ProductVariantDto> {
    return prisma.productVariant.delete({ where: { id } });
  }
}
