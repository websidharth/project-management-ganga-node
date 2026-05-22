import { Status } from "@prisma/client";

export interface CreateAttributeModel {
  name: string;
  unit?: string;
  status?: Status;
  displayOrder?: number;
}

export interface UpdateAttributeModel {
  name?: string;
  unit?: string;
  status?: Status;
  displayOrder?: number;
}
