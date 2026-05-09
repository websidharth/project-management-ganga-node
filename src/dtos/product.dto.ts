export interface ProductDto {
  id: number;
  name: string;
  slug: string;
  description?: string | null;
  sku: string;
  price: number;
  cost?: number | null;
  stock: number;
  lowStockThreshold?: number | null;
  categoryId: number;
  images: string[];
  status: boolean;
  createdById: number;
  updatedById?: number | null;
  createdAt: Date;
  updatedAt: Date | null;
}

export interface CreateProductDto {
  name: string;
  slug: string;
  description?: string | null;
  sku: string;
  price: number;
  cost?: number | null;
  stock?: number;
  lowStockThreshold?: number | null;
  categoryId: number;
  images?: string[];
  status?: boolean;
  createdById: number;
}

export interface UpdateProductDto {
  name?: string;
  slug?: string;
  description?: string | null;
  sku?: string;
  price?: number;
  cost?: number | null;
  stock?: number;
  lowStockThreshold?: number | null;
  categoryId?: number;
  images?: string[];
  status?: boolean;
  updatedById?: number | null;
  updatedAt?: Date;
}
