import { Request, Response } from 'express';
import { container } from '../config/ioc.config';
import { TYPES } from '../config/ioc.types';
import IUnitOfService from '../services/interfaces/iunitof.service';

export class DashboardController {
  constructor(
    private unitOfService = container.get<IUnitOfService>(TYPES.IUnitOfService)
  ) {}

  getSummary = async (_req: Request, res: Response): Promise<Response> => {
    const data = await this.unitOfService.Dashboard.getSummary();
    return res.status(200).json({
      success: true,
      message: 'Dashboard summary fetched successfully',
      data,
    });
  };
}
