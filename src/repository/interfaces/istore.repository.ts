import { StoreDto, CreateStoreDto, UpdateStoreDto } from "../../dtos/store.dto";
import { StoreFilterParams } from "../../params/store.params";

export interface IStoreRepository {
  create(data: CreateStoreDto): Promise<StoreDto>;
  getAll(filters: StoreFilterParams): Promise<{ data: StoreDto[]; total: number; page: number; recordPerPage: number }>;
  getById(id: number): Promise<StoreDto>;
  update(id: number, data: UpdateStoreDto): Promise<StoreDto>;
  delete(id: number): Promise<StoreDto>;
  checkExists(field: "name" | "code", value: string, excludeId?: number): Promise<boolean>;
}

