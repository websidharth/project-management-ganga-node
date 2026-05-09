export interface CreateCategoryModel {
  name: string;
  description?: string;
  parentId?: number;
}

export interface UpdateCategoryModel {
  name?: string;
  description?: string;
  parentId?: number;
}
