import prisma from '../config/prisma';
import { DashboardSummaryDto } from '../dtos/dashboard.dto';
import { IDashboardRepository } from './interfaces/idashboard.repository';

const RECENT_LIMIT = 5;

export class DashboardRepository implements IDashboardRepository {
  async getSummary(storeCode?: string): Promise<DashboardSummaryDto> {
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);
    const todayEnd = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1, 0, 0, 0, 0);

    const productWhere = storeCode ? { storeCode } : {};
    const attributeWhere = storeCode ? { storeCode } : {};
    
    const todayOrderWhere: any = {
      orderDate: { gte: todayStart, lte: todayEnd },
      status: { not: 'CANCELLED' },
    };
    const monthOrderWhere: any = {
      orderDate: { gte: monthStart, lte: todayEnd },
      status: { not: 'CANCELLED' },
    };

    if (storeCode) {
      todayOrderWhere.storeCode = storeCode;
      monthOrderWhere.storeCode = storeCode;
    }

    const [
      productTotal,
      productRecent,
      attributeTotal,
      attributeRecent,
      todaySaleResult,
      monthSaleResult,
      categoriesWithProductCount,
    ] = await Promise.all([
      prisma.product.count({ where: productWhere }),
      prisma.product.findMany({ where: productWhere, orderBy: { createdAt: 'desc' }, take: RECENT_LIMIT }),
      prisma.attribute.count({ where: attributeWhere }),
      prisma.attribute.findMany({ where: attributeWhere, orderBy: { createdAt: 'desc' }, take: RECENT_LIMIT }),
      prisma.order.aggregate({
        _sum: { grandTotal: true },
        where: todayOrderWhere,
      }),
      prisma.order.aggregate({
        _sum: { grandTotal: true },
        where: monthOrderWhere,
      }),
      prisma.category.findMany({
        where: storeCode ? { storeCode } : {},
        select: {
          name: true,
          products: {
            where: storeCode ? { storeCode } : {},
            select: { id: true }
          }
        }
      })
    ]);

    const categoryDistribution = categoriesWithProductCount.map(c => {
      const count = c.products.length;
      const percentage = productTotal > 0 ? Math.round((count / productTotal) * 100) : 0;
      return {
        name: c.name,
        count,
        percentage
      };
    }).sort((a, b) => b.count - a.count);

    return {
      products: { total: productTotal, recent: productRecent },
      attributes: { total: attributeTotal, recent: attributeRecent }, 
      todaySale: todaySaleResult._sum.grandTotal || 0,
      totalMonthSale: monthSaleResult._sum.grandTotal || 0,
      categoryDistribution,
    };
  }
}
