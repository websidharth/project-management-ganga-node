import { Status } from '../enum/status.enum';

export interface ProductVariantModel {
  name: string;
  slug: string | null;
  productId: number;
  productAttributeId: number | null;  
  attributeId: number | null;
  cost: number;
  Price: number;
  stock: number;
  lowStockThreshold: number; 
  status: Status;
} 