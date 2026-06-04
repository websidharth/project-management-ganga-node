import { Request, Response } from 'express';
import { container } from '../config/ioc.config';
import { TYPES } from '../config/ioc.types';
import IUnitOfService from '../services/interfaces/iunitof.service';
import CustomResponse from '../dtos/custom-response';
import { ProductVariantDto } from '../dtos/product-variant.dto';
import { ListResponseDto } from '../dtos/list-response.dto';
import { ProductVariantFilterParams } from '../params/product-variant.params';
import { Status } from '@prisma/client';
import { ProductVariantModel, UpdateProductVariantModel } from '../models/product-variant.model';

export class ProductVariantController {
  constructor(private unitOfService = container.get<IUnitOfService>(TYPES.IUnitOfService)) {}

  getAll = async (req: Request, res: Response): Promise<Response<CustomResponse<ListResponseDto<ProductVariantDto>>>> => {
    const filters: ProductVariantFilterParams = Object.fromEntries(
      Object.entries({
        page: req.query['page'] ? parseInt(req.query['page'] as string) : undefined,
        recordPerPage: req.query['recordPerPage'] ? parseInt(req.query['recordPerPage'] as string) : undefined,
        productId: req.query['productId'] ? parseInt(req.query['productId'] as string) : undefined,
        status: req.query['status'] ? (req.query['status'] as Status) : undefined,
        showAllRecords: req.query['showAllRecords'] !== undefined ? req.query['showAllRecords'] === 'true' : undefined,
      }).filter(([, v]) => v !== undefined)
    );
    const variants = await this.unitOfService.ProductVariant.getAll(filters);
    return res.status(200).json({ success: true, message: 'Product variants fetched successfully', data: variants });
  };

  getByProductId = async (req: Request, res: Response): Promise<Response<CustomResponse<ListResponseDto<ProductVariantDto>>>> => {
    const productId = parseInt(req.params['productId'] as string);
    if (isNaN(productId)) return res.status(400).json({ success: false, message: 'Invalid productId' });
    const variants = await this.unitOfService.ProductVariant.getByProductId(productId);
    return res
      .status(200)
      .json({ success: true, message: 'Product variants fetched successfully', data: { totalRecord: variants.length, data: variants } });
  };

  getById = async (req: Request, res: Response): Promise<Response<CustomResponse<ProductVariantDto>>> => {
    const id = parseInt(req.params['id'] as string);
    if (isNaN(id)) return res.status(400).json({ success: false, message: 'Invalid id' });
    const variant = await this.unitOfService.ProductVariant.getById(id);
    return res.status(200).json({ success: true, message: 'Product variant fetched successfully', data: variant });
  };

  create = async (req: Request, res: Response): Promise<Response<CustomResponse<ProductVariantDto>>> => {
    const body = req.body as ProductVariantModel;
    const storeCode = req.user?.storeCode; // Get from logged-in user
        
        if (!storeCode) {
            return res.status(400).json({
                success: false,
                message: 'Store code not found. User must be associated with a store.'
            });
        }
  

    const product = await this.unitOfService.ProductVariant.create(body, storeCode);
    return res.status(201).json({ success: true, message: 'Product variant created successfully', data: product });
  };

  update = async (req: Request, res: Response): Promise<Response<CustomResponse<ProductVariantDto>>> => {
    const id = parseInt(req.params['id'] as string);
    if (isNaN(id)) return res.status(400).json({ success: false, message: 'Invalid id' });
    const body = req.body as UpdateProductVariantModel;
    const variant = await this.unitOfService.ProductVariant.update(id, body);
    return res.status(200).json({ success: true, message: 'Product variant updated successfully', data: variant });
  };

  delete = async (req: Request, res: Response): Promise<Response<CustomResponse<ProductVariantDto>>> => {
    const id = parseInt(req.params['id'] as string);
    if (isNaN(id)) return res.status(400).json({ success: false, message: 'Invalid id' });
    const variant = await this.unitOfService.ProductVariant.delete(id);
    return res.status(200).json({ success: true, message: 'Product variant deleted successfully', data: variant });
  };
}
