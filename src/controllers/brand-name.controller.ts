import { Request, Response } from 'express';
import { container } from '../config/ioc.config';
import { TYPES } from '../config/ioc.types';
import IUnitOfService from '../services/interfaces/iunitof.service';
import CustomResponse from '../dtos/custom-response';
import { BrandNameDto, CreateBrandNameDto } from '../dtos/brand-name.dto';

export class BrandNameController {
    constructor(private unitOfService = container.get<IUnitOfService>(TYPES.IUnitOfService)) { }

    getAll = async (req: Request, res: Response): Promise<Response<CustomResponse<BrandNameDto[]>>> => {
        const data = await this.unitOfService.BrandName.getAll();
        return res.status(200).json({ success: true, message: 'Brand names fetched successfully', data });
    };

    getById = async (req: Request, res: Response): Promise<Response<CustomResponse<BrandNameDto>>> => {
        const id = parseInt(req.params['id'] as string);
        if (isNaN(id)) return res.status(400).json({ success: false, message: 'Invalid id' });
        const data = await this.unitOfService.BrandName.getById(id);
        return res.status(200).json({ success: true, message: 'Brand name fetched successfully', data });
    };

    create = async (req: Request, res: Response): Promise<Response<CustomResponse<BrandNameDto>>> => {
        const body = req.body as CreateBrandNameDto;
        const data = await this.unitOfService.BrandName.create(body);
        return res.status(201).json({ success: true, message: 'Brand name created successfully', data });
    };

    update = async (req: Request, res: Response): Promise<Response<CustomResponse<BrandNameDto>>> => {
        const id = parseInt(req.params['id'] as string);
        if (isNaN(id)) return res.status(400).json({ success: false, message: 'Invalid id' });
        const body = req.body as CreateBrandNameDto;
        const data = await this.unitOfService.BrandName.update(id, body);
        return res.status(200).json({ success: true, message: 'Brand name updated successfully', data });
    };

    delete = async (req: Request, res: Response): Promise<Response<CustomResponse<BrandNameDto>>> => {
        const id = parseInt(req.params['id'] as string);
        if (isNaN(id)) return res.status(400).json({ success: false, message: 'Invalid id' });
        const data = await this.unitOfService.BrandName.delete(id);
        return res.status(200).json({ success: true, message: 'Brand name deleted successfully', data });
    };
}
