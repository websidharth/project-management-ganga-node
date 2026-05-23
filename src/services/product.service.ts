import { inject, injectable } from "inversify";
import { TYPES } from "../config/ioc.types";
import { CreateProductDto, ProductResponseDto } from "../dtos/product.dto";
import { IProductService } from "./interfaces/Iproduct.service";
import type IUnitOfWork from "../repository/interfaces/iunitofwork.repository";
import NotFoundError from "../exceptions/not-found-error";
import { ProductFilterParams } from "../params/product.params";

@injectable()
export class ProductService implements IProductService {
  constructor(
    @inject(TYPES.IUnitOfWork) private unitOfWork: IUnitOfWork
  ) { }

  async getAll(filters?: ProductFilterParams) {
    return this.unitOfWork.Product.findAll(filters, filters?.page, filters?.recordPerPage);
  }

  async getById(id: number): Promise<ProductResponseDto | null> {
    const product = await this.unitOfWork.Product.findById(id);
    if (!product) throw new NotFoundError("Product not found");
    return product;
  }

  async getBySlug(slug: string): Promise<ProductResponseDto | null> {
    const product = await this.unitOfWork.Product.findBySlug(slug);
    if (!product) throw new NotFoundError("Product not found");
    return product;
  }

  async getBySku(sku: string): Promise<ProductResponseDto | null> {
    const product = await this.unitOfWork.Product.findBySku(sku);
    if (!product) throw new NotFoundError("Product not found");
    return product;
  }

  async create(data: CreateProductDto, createdByUserId: string): Promise<ProductResponseDto> {
    const user = await this.unitOfWork.User.findById(createdByUserId);
    if (!user) throw new NotFoundError("Authenticated user not found");
    return this.unitOfWork.Product.create({ ...data, createdById: user.id });
  }

  async update(id: number, data: CreateProductDto, updatedByUserId: string): Promise<ProductResponseDto> {
    const existing = await this.unitOfWork.Product.findById(id);
    if (!existing) throw new NotFoundError("Product not found");
    const user = await this.unitOfWork.User.findById(updatedByUserId);
    if (!user) throw new NotFoundError("Authenticated user not found");
    return this.unitOfWork.Product.update(id, {
      ...data,
      updatedById: user.id,
      updatedAt: new Date(),
    });
  }

  async delete(id: number): Promise<ProductResponseDto> {
    const existing = await this.unitOfWork.Product.findById(id);
    if (!existing) throw new NotFoundError("Product not found");
    return this.unitOfWork.Product.delete(id);
  }
}
