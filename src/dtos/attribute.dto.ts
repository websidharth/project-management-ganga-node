export interface AttributeDto {
  id: number;
  name: string;
  unit?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateAttributeDto {
  name: string;
  unit?: string | null;
}

export interface UpdateAttributeDto {
  name?: string;
  unit?: string | null;
}
