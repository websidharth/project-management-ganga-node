import { Request, Response } from 'express';
import { container } from '../config/ioc.config';
import { TYPES } from '../config/ioc.types';
import IUnitOfService from '../services/interfaces/iunitof.service';
import CustomResponse from '../dtos/custom-response';
import { ProductAttributeDto } from '../dtos/product-attribute.dto';
import { ListResponseDto } from '../dtos/list-response.dto';
import { ProductAttributeFilterParams } from '../params/product-attribute.params';
import { ProductAttributeModel } from '../models/product-attribute.model';

export class ProductAttributeController {
  constructor(private unitOfService = container.get<IUnitOfService>(TYPES.IUnitOfService)) {}

  getAll = async (req: Request, res: Response): Promise<Response<CustomResponse<ListResponseDto<ProductAttributeDto>>>> => {
    const filters: ProductAttributeFilterParams = Object.fromEntries(
      Object.entries({
        productId: req.query['productId'] ? parseInt(req.query['productId'] as string) : undefined,
        attributeId: req.query['attributeId'] ? parseInt(req.query['attributeId'] as string) : undefined,
        status: req.query['status'] !== undefined ? req.query['status'] === 'true' : undefined,
        page: req.query['page'] ? parseInt(req.query['page'] as string) : undefined,
        recordPerPage: req.query['recordPerPage'] ? parseInt(req.query['recordPerPage'] as string) : undefined,
        showAllRecords: req.query['showAllRecords'] !== undefined ? req.query['showAllRecords'] === 'true' : undefined,
      }).filter(([, v]) => v !== undefined)
    );
    const data = await this.unitOfService.ProductAttribute.getAll(filters);
    return res.status(200).json({ success: true, message: 'Product attributes fetched successfully', data });
  };

  getByProductId = async (req: Request, res: Response): Promise<Response<CustomResponse<ListResponseDto<ProductAttributeDto>>>> => {
    const productId = parseInt(req.params['productId'] as string);
    if (isNaN(productId)) return res.status(400).json({ success: false, message: 'Invalid productId' });
    const attrs = await this.unitOfService.ProductAttribute.getByProductId(productId);
    return res
      .status(200)
      .json({ success: true, message: 'Product attributes fetched successfully', data: { totalRecord: attrs.length, data: attrs } });
  };

  getById = async (req: Request, res: Response): Promise<Response<CustomResponse<ProductAttributeDto>>> => {
    const id = parseInt(req.params['id'] as string);
    if (isNaN(id)) return res.status(400).json({ success: false, message: 'Invalid id' });
    const attr = await this.unitOfService.ProductAttribute.getById(id);
    return res.status(200).json({ success: true, message: 'Product attribute fetched successfully', data: attr });
  };

  create = async (req: Request, res: Response): Promise<Response<CustomResponse<ProductAttributeDto>>> => {
    const body = req.body as ProductAttributeModel;
    const storeCode = req.user?.storeCode; // Get from logged-in user
    if (!storeCode) {
      return res.status(400).json({
        success: false,
        message: 'Store code not found. User must be associated with a store.',
      });
    }
    const product = await this.unitOfService.ProductAttribute.create(body, storeCode);
    return res.status(201).json({ success: true, message: 'Product attribute created successfully', data: product });
  };

  update = async (req: Request, res: Response): Promise<Response<CustomResponse<ProductAttributeDto>>> => {
    const id = parseInt(req.params['id'] as string);
    if (isNaN(id)) return res.status(400).json({ success: false, message: 'Invalid id' });
    const body = req.body as ProductAttributeModel;
    const attr = await this.unitOfService.ProductAttribute.update(id, body);
    return res.status(200).json({ success: true, message: 'Product attribute updated successfully', data: attr });
  };

  delete = async (req: Request, res: Response): Promise<Response<CustomResponse<ProductAttributeDto>>> => {
    const id = parseInt(req.params['id'] as string);
    if (isNaN(id)) return res.status(400).json({ success: false, message: 'Invalid id' });
    const attr = await this.unitOfService.ProductAttribute.delete(id);
    return res.status(200).json({ success: true, message: 'Product attribute deleted successfully', data: attr });
  };
}
