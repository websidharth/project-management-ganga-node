import prisma from '../config/prisma';
import { DashboardSummaryDto } from '../dtos/dashboard.dto';
import { IDashboardRepository } from './interfaces/idashboard.repository';

const RECENT_LIMIT = 5;

export class DashboardRepository implements IDashboardRepository {
  async getSummary(): Promise<DashboardSummaryDto> {
    const [
      productTotal,
      productRecent,
      attributeTotal,
      attributeRecent,
     
    ] = await Promise.all([
      prisma.product.count(),
      prisma.product.findMany({ orderBy: { createdAt: 'desc' }, take: RECENT_LIMIT }),
      prisma.attribute.count(),
      prisma.attribute.findMany({ orderBy: { createdAt: 'desc' }, take: RECENT_LIMIT }),
     
    ]);

    return {
      products: { total: productTotal, recent: productRecent },
      attributes: { total: attributeTotal, recent: attributeRecent }, 
    };
  }
}
