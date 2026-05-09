export interface CategoryDto {
  id: number;
  name: string;
  description?: string | null;
  parentId?: number | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateCategoryDto {
  name: string;
  description?: string | null;
  parentId?: number | null;
  createdAt: Date;
}

export interface UpdateCategoryDto {
  name?: string;
  description?: string | null;
  parentId?: number | null;
  updatedAt?: Date;
}
