import { StoreDto, CreateStoreDto, UpdateStoreDto } from "../../dtos/store.dto";
import { StoreFilterParams } from "../../params/store.params";
import {  StoreModel } from "../../models/store.model";

export interface IStoreService {
  create(data: StoreModel): Promise<StoreDto>;
  getAll(filters: StoreFilterParams): Promise<{ data: StoreDto[]; total: number; page: number; recordPerPage: number }>;
  getById(id: number): Promise<StoreDto>;
  update(id: number, data: StoreModel): Promise<StoreDto>;
  delete(id: number): Promise<StoreDto>;
}
