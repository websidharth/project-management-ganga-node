import { Request, Response } from 'express';
import { container } from '../config/ioc.config';
import { TYPES } from '../config/ioc.types';
import IUnitOfService from '../services/interfaces/iunitof.service';
import CustomResponse from '../dtos/custom-response';
import { CategoryDto, CreateCategoryDto, UpdateCategoryDto } from '../dtos/category.dto';
import { ListResponseDto } from '../dtos/list-response.dto';

export class CategoryController {
  constructor(private unitOfService = container.get<IUnitOfService>(TYPES.IUnitOfService)) { }

  getAll = async (req: Request, res: Response): Promise<Response<CustomResponse<ListResponseDto<CategoryDto>>>> => {
    const categories = await this.unitOfService.Category.getAll();
    return res.status(200).json({
      success: true,
      message: 'Categories fetched successfully',
      data: { totalRecord: categories.length, data: categories },
    });
  };

  getById = async (req: Request, res: Response): Promise<Response<CustomResponse<CategoryDto>>> => {
    const id = parseInt(req.params['id'] as string);
    if (isNaN(id)) return res.status(400).json({ success: false, message: 'Invalid id' });
    const category = await this.unitOfService.Category.getById(id);
    return res.status(200).json({ success: true, message: 'Category fetched successfully', data: category });
  };

  create = async (req: Request, res: Response): Promise<Response<CustomResponse<CategoryDto>>> => {
    const body = req.body as CreateCategoryDto;
    const category = await this.unitOfService.Category.create({
      ...body,
      createdAt: new Date(),
    });
    return res.status(201).json({ success: true, message: 'Category created successfully', data: category });
  };

  update = async (req: Request, res: Response): Promise<Response<CustomResponse<CategoryDto>>> => {
    const id = parseInt(req.params['id'] as string);
    if (isNaN(id)) return res.status(400).json({ success: false, message: 'Invalid id' });
    const body = req.body as UpdateCategoryDto;
    const category = await this.unitOfService.Category.update(id, body);
    return res.status(200).json({ success: true, message: 'Category updated successfully', data: category });
  };

  delete = async (req: Request, res: Response): Promise<Response<CustomResponse<CategoryDto>>> => {
    const id = parseInt(req.params['id'] as string);
    if (isNaN(id)) return res.status(400).json({ success: false, message: 'Invalid id' });
    const category = await this.unitOfService.Category.delete(id);
    return res.status(200).json({ success: true, message: 'Category deleted successfully', data: category });
  };
}
