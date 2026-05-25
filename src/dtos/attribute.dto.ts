import { Status } from "@prisma/client";

export interface AttributeDto {
  id: number;
  name: string;
  unit?: string | null;
  storeId: number;
  status: Status;
  displayOrder?: number | null;
  createdAt: Date;
  updatedAt: Date | null;
}

export interface CreateAttributeDto {
  name: string;
  unit?: string | null;
  storeId: number;
  status?: Status;
  displayOrder?: number | null;
}

export interface UpdateAttributeDto {
  name?: string;
  unit?: string | null;
  status?: Status;
  displayOrder?: number | null;
}
