import { PageFilterParams } from "./page.params";

export interface ProductFilterParams extends PageFilterParams {
  categoryId?: number;
  status?: boolean;
}
