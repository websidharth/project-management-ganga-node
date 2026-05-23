import { ProductResponseDto } from './product.dto';
import { AttributeDto } from './attribute.dto';
import { ProductVariantDto } from './product-variant.dto';
import { ProductAttributeDto } from './product-attribute.dto';

export interface DashboardSectionDto<T> {
  total: number;
  recent: T[];
}

export interface DashboardSummaryDto {
  products: DashboardSectionDto<ProductResponseDto>;
  attributes: DashboardSectionDto<AttributeDto>;
  productVariants: DashboardSectionDto<ProductVariantDto>;
  productAttributes: DashboardSectionDto<ProductAttributeDto>;
}
