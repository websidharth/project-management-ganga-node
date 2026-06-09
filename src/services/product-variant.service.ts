import { inject, injectable } from 'inversify';
import { TYPES } from '../config/ioc.types';
import {  ProductVariantDto } from '../dtos/product-variant.dto';
import { ListResponseDto } from '../dtos/list-response.dto';
import { ProductVariantFilterParams } from '../params/product-variant.params';
import { IProductVariantService } from './interfaces/Iproduct-variant.service';
import type IUnitOfWork from '../repository/interfaces/iunitofwork.repository';
import NotFoundError from '../exceptions/not-found-error';
import { ProductVariantModel } from '../models/product-variant.model';
import { Status } from '../enum/status.enum';

@injectable()
export class ProductVariantService implements IProductVariantService {
  constructor(@inject(TYPES.IUnitOfWork) private unitOfWork: IUnitOfWork) {}

  async getAll(filters?: ProductVariantFilterParams): Promise<ListResponseDto<ProductVariantDto>> {
    return this.unitOfWork.ProductVariant.findAll(filters);
  }

  async getByProductId(productId: number): Promise<ProductVariantDto[]> {
    return this.unitOfWork.ProductVariant.findByProductId(productId);
  }

  async getById(id: number): Promise<ProductVariantDto | null> {
    const variant = await this.unitOfWork.ProductVariant.findById(id);
    if (!variant) throw new NotFoundError('Product variant not found');
    return variant;
  }

  async create(data: ProductVariantModel, storeCode: string): Promise<ProductVariantDto> {
    return this.unitOfWork.transaction(async (transactionClient) => {
      const productAttribute = await transactionClient.productVariant.create({
        data: {
          storeCode: storeCode,
          name: data.name,
          slug: data.slug || null,
          productId: data.productId, 
          attributeId: data.attributeId || null,
          productAttributeId: data.productAttributeId || null,
          cost: data.cost || 0,
          Price: data.Price || 0,
          stock: data.stock || 0,
          lowStockThreshold: data.lowStockThreshold || 0,
          status: data.status ?? Status.Draft,
        },
      });

      return productAttribute;
    });
  }


  async update(id: number, data: ProductVariantModel): Promise<ProductVariantDto> {
           const existing = await this.unitOfWork.ProductVariant.findById(id);
      if (!existing) throw new NotFoundError('Product variant not found');
      return this.unitOfWork.transaction(async (transactionClient) => {
        const productVariant = await transactionClient.productVariant.update({
          where: { id },
          data: { 
          name: data.name,
          slug: data.slug || null,
          productId: data.productId, 
          attributeId: data.attributeId || null,
          productAttributeId: data.productAttributeId || null,
          cost: data.cost || 0,
          Price: data.Price || 0,
          stock: data.stock || 0,
          lowStockThreshold: data.lowStockThreshold || 0,
          status: data.status ?? Status.Draft, 
          },
        });
  
        return productVariant;
      });
    }

 

  async delete(id: number): Promise<ProductVariantDto> {
    const existing = await this.unitOfWork.ProductVariant.findById(id);
    if (!existing) throw new NotFoundError('Product variant not found');
    return this.unitOfWork.ProductVariant.delete(id);
  }
}
