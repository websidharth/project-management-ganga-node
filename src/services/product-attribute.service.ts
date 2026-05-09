import { inject, injectable } from "inversify";
import { TYPES } from "../config/ioc.types";
import { CreateProductAttributeDto, ProductAttributeDto, UpdateProductAttributeDto } from "../dtos/product-attribute.dto";
import { IProductAttributeService } from "./interfaces/Iproduct-attribute.service";
import type IUnitOfWork from "../repository/interfaces/iunitofwork.repository";
import NotFoundError from "../exceptions/not-found-error";

@injectable()
export class ProductAttributeService implements IProductAttributeService {
  constructor(@inject(TYPES.IUnitOfWork) private unitOfWork: IUnitOfWork) {}

  async getByProductId(productId: number): Promise<ProductAttributeDto[]> {
    return this.unitOfWork.ProductAttribute.findByProductId(productId);
  }

  async getById(id: number): Promise<ProductAttributeDto | null> {
    const pa = await this.unitOfWork.ProductAttribute.findById(id);
    if (!pa) throw new NotFoundError("Product attribute not found");
    return pa;
  }

  async create(data: CreateProductAttributeDto): Promise<ProductAttributeDto> {
    return this.unitOfWork.ProductAttribute.create(data);
  }

  async update(id: number, data: UpdateProductAttributeDto): Promise<ProductAttributeDto> {
    const existing = await this.unitOfWork.ProductAttribute.findById(id);
    if (!existing) throw new NotFoundError("Product attribute not found");
    return this.unitOfWork.ProductAttribute.update(id, data);
  }

  async delete(id: number): Promise<ProductAttributeDto> {
    const existing = await this.unitOfWork.ProductAttribute.findById(id);
    if (!existing) throw new NotFoundError("Product attribute not found");
    return this.unitOfWork.ProductAttribute.delete(id);
  }
}
