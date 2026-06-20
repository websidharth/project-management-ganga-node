import prisma from '../config/prisma';
import { DashboardSummaryDto } from '../dtos/dashboard.dto';
import { IDashboardRepository } from './interfaces/idashboard.repository';

const RECENT_LIMIT = 5;

export class DashboardRepository implements IDashboardRepository {
  async getSummary(): Promise<DashboardSummaryDto> {
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);
    const todayEnd = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1, 0, 0, 0, 0);

    const [
      productTotal,
      productRecent,
      attributeTotal,
      attributeRecent,
      todaySaleResult,
      monthSaleResult,
    ] = await Promise.all([
      prisma.product.count(),
      prisma.product.findMany({ orderBy: { createdAt: 'desc' }, take: RECENT_LIMIT }),
      prisma.attribute.count(),
      prisma.attribute.findMany({ orderBy: { createdAt: 'desc' }, take: RECENT_LIMIT }),
      prisma.order.aggregate({
        _sum: { grandTotal: true },
        where: {
          orderDate: { gte: todayStart, lte: todayEnd },
          status: { not: 'CANCELLED' },
        },
      }),
      prisma.order.aggregate({
        _sum: { grandTotal: true },
        where: {
          orderDate: { gte: monthStart, lte: todayEnd },
          status: { not: 'CANCELLED' },
        },
      }),
    ]);

    return {
      products: { total: productTotal, recent: productRecent },
      attributes: { total: attributeTotal, recent: attributeRecent }, 
      todaySale: todaySaleResult._sum.grandTotal || 0,
      totalMonthSale: monthSaleResult._sum.grandTotal || 0,
    };
  }
}
