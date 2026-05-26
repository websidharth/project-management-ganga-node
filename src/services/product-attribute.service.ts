import { inject, injectable } from 'inversify';
import { TYPES } from '../config/ioc.types';
import { CreateProductAttributeDto, ProductAttributeDto, UpdateProductAttributeDto } from '../dtos/product-attribute.dto';
import { ListResponseDto } from '../dtos/list-response.dto';
import { ProductAttributeFilterParams } from '../params/product-attribute.params';
import { IProductAttributeService } from './interfaces/Iproduct-attribute.service';
import type IUnitOfWork from '../repository/interfaces/iunitofwork.repository';
import NotFoundError from '../exceptions/not-found-error';
import { Status } from '../enum/status.enum';
import { ProductAttributeModel } from '../models/product-attribute.model';

@injectable()
export class ProductAttributeService implements IProductAttributeService {
  constructor(@inject(TYPES.IUnitOfWork) private unitOfWork: IUnitOfWork) {}

  async getAll(filters?: ProductAttributeFilterParams): Promise<ListResponseDto<ProductAttributeDto>> {
    return this.unitOfWork.ProductAttribute.findAll(filters);
  }

  async getByProductId(productId: number): Promise<ProductAttributeDto[]> {
    return this.unitOfWork.ProductAttribute.findByProductId(productId);
  }

  async getById(id: number): Promise<ProductAttributeDto | null> {
    const pa = await this.unitOfWork.ProductAttribute.findById(id);
    if (!pa) throw new NotFoundError('Product attribute not found');
    return pa;
  }

  async create(data: ProductAttributeModel, storeCode: string): Promise<ProductAttributeDto> {
    return this.unitOfWork.transaction(async (transactionClient) => {
      const productAttribute = await transactionClient.productAttribute.create({
        data: {
          storeCode: storeCode,
          productId: data.productId,
          attributeId: data.attributeId,
          value: data.value,
          status: data.status ?? Status.Draft,
          displayOrder: data.displayOrder ?? null,
        },
      });

      return productAttribute;
    });
  }

    async update(id: number, data: ProductAttributeModel): Promise<ProductAttributeDto> {
         const existing = await this.unitOfWork.ProductAttribute.findById(id);
    if (!existing) throw new NotFoundError('Product attribute not found');
    return this.unitOfWork.transaction(async (transactionClient) => {
      const productAttribute = await transactionClient.productAttribute.update({
        where: { id },
        data: { 
          productId: data.productId,
          attributeId: data.attributeId,
          value: data.value,
          status: data.status ?? Status.Draft,
          displayOrder: data.displayOrder ?? null,
        },
      });

      return productAttribute;
    });
  }
 

  async delete(id: number): Promise<ProductAttributeDto> {
    const existing = await this.unitOfWork.ProductAttribute.findById(id);
    if (!existing) throw new NotFoundError('Product attribute not found');
    return this.unitOfWork.ProductAttribute.delete(id);
  }
}
