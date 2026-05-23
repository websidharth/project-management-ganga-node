import { inject, injectable } from "inversify";
import { TYPES } from "../config/ioc.types";
import { CreateProductVariantDto, ProductVariantDto, UpdateProductVariantDto } from "../dtos/product-variant.dto";
import { ListResponseDto } from "../dtos/list-response.dto";
import { ProductVariantFilterParams } from "../params/product-variant.params";
import { IProductVariantService } from "./interfaces/Iproduct-variant.service";
import type IUnitOfWork from "../repository/interfaces/iunitofwork.repository";
import NotFoundError from "../exceptions/not-found-error";

@injectable()
export class ProductVariantService implements IProductVariantService {
  constructor(@inject(TYPES.IUnitOfWork) private unitOfWork: IUnitOfWork) { }

  async getAll(filters?: ProductVariantFilterParams): Promise<ListResponseDto<ProductVariantDto>> {
    return this.unitOfWork.ProductVariant.findAll(filters);
  }

  async getByProductId(productId: number): Promise<ProductVariantDto[]> {
    return this.unitOfWork.ProductVariant.findByProductId(productId);
  }

  async getById(id: number): Promise<ProductVariantDto | null> {
    const variant = await this.unitOfWork.ProductVariant.findById(id);
    if (!variant) throw new NotFoundError("Product variant not found");
    return variant;
  }

  async create(data: CreateProductVariantDto): Promise<ProductVariantDto> {
    return this.unitOfWork.ProductVariant.create(data);
  }

  async update(id: number, data: UpdateProductVariantDto): Promise<ProductVariantDto> {
    const existing = await this.unitOfWork.ProductVariant.findById(id);
    if (!existing) throw new NotFoundError("Product variant not found");
    return this.unitOfWork.ProductVariant.update(id, data);
  }

  async delete(id: number): Promise<ProductVariantDto> {
    const existing = await this.unitOfWork.ProductVariant.findById(id);
    if (!existing) throw new NotFoundError("Product variant not found");
    return this.unitOfWork.ProductVariant.delete(id);
  }
}
