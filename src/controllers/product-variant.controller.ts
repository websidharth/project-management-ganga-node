import { Request, Response } from 'express';
import { container } from '../config/ioc.config';
import { TYPES } from '../config/ioc.types';
import IUnitOfService from '../services/interfaces/iunitof.service';
import CustomResponse from '../dtos/custom-response';
import { CreateProductVariantDto, ProductVariantDto, UpdateProductVariantDto } from '../dtos/product-variant.dto';
import { ListResponseDto } from '../dtos/list-response.dto';

export class ProductVariantController {
  constructor(private unitOfService = container.get<IUnitOfService>(TYPES.IUnitOfService)) { }

  getAll = async (req: Request, res: Response): Promise<Response<CustomResponse<ListResponseDto<ProductVariantDto>>>> => {
    const variants = await this.unitOfService.ProductVariant.getAll();
    return res
      .status(200)
      .json({ success: true, message: 'Product variants fetched successfully', data: { totalRecord: variants.length, data: variants } });
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
    const body = req.body as CreateProductVariantDto;
    const variant = await this.unitOfService.ProductVariant.create(body);
    return res.status(201).json({ success: true, message: 'Product variant created successfully', data: variant });
  };

  update = async (req: Request, res: Response): Promise<Response<CustomResponse<ProductVariantDto>>> => {
    const id = parseInt(req.params['id'] as string);
    if (isNaN(id)) return res.status(400).json({ success: false, message: 'Invalid id' });
    const body = req.body as UpdateProductVariantDto;
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
