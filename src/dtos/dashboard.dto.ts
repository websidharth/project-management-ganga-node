import { ProductResponseDto } from './product.dto';
import { AttributeDto } from './attribute.dto'; 

export interface DashboardSectionDto<T> {
  total: number;
  recent: T[];
}

export interface DashboardSummaryDto {
  products: DashboardSectionDto<ProductResponseDto>;
  attributes: DashboardSectionDto<AttributeDto>; 
  todaySale: number;
  totalMonthSale: number;
}
