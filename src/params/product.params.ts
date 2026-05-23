import { PageFilterParams } from "./page.params";
import { Status } from "@prisma/client";

export interface ProductFilterParams extends PageFilterParams {
  categoryId?: number;
  brandNameId?: number;
  storeId?: number;
  status?: Status;
}
