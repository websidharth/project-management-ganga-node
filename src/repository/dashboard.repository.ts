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
      variantTotal,
      variantRecent,
      productAttributeTotal,
      productAttributeRecent,
    ] = await Promise.all([
      prisma.product.count(),
      prisma.product.findMany({ orderBy: { createdAt: 'desc' }, take: RECENT_LIMIT }),
      prisma.attribute.count(),
      prisma.attribute.findMany({ orderBy: { createdAt: 'desc' }, take: RECENT_LIMIT }),
      prisma.productVariant.count(),
      prisma.productVariant.findMany({
        select: { name: true, cost: true, Price: true, storeCode: true, images: true, createdAt: true, id: true, productId: true, status: true, stock: true,  lowStockThreshold: true },
        orderBy: { id: 'desc' },
        take: RECENT_LIMIT
      }),
      prisma.productAttribute.count(),
      prisma.productAttribute.findMany({ orderBy: { id: 'desc' }, take: RECENT_LIMIT }),
    ]);

    return {
      products: { total: productTotal, recent: productRecent },
      attributes: { total: attributeTotal, recent: attributeRecent },
      productVariants: { total: variantTotal, recent: variantRecent },
      productAttributes: { total: productAttributeTotal, recent: productAttributeRecent },
    };
  }
}
