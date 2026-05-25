import { Status } from "@prisma/client";

export interface StoreModel {
  name: string;
  code: string;
  address?: string;
  phone?: string;
  email?: string;
  panNumber?: string;
  gstNumber?: string;
  isActive?: boolean;
  status?: Status;
}
 
