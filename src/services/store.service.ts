import { inject, injectable } from "inversify";
import { TYPES } from "../config/ioc.types";
import { StoreDto, CreateStoreDto, UpdateStoreDto } from "../dtos/store.dto";
import { StoreFilterParams } from "../params/store.params";
import { CreateStoreModel, UpdateStoreModel } from "../models/store.model";
import { IStoreService } from "./interfaces/Istore.service";
import type IUnitOfWork from "../repository/interfaces/iunitofwork.repository";
import CustomError from "../exceptions/custom-error";

@injectable()
export class StoreService implements IStoreService {
  constructor(@inject(TYPES.IUnitOfWork) private unitOfWork: IUnitOfWork) {}

  async create(data: CreateStoreModel): Promise<StoreDto> {
    // Check if store with same name exists
    const nameExists = await this.unitOfWork.Store.checkExists("name", data.name);
    if (nameExists) {
      throw new CustomError("Store with this name already exists", 400);
    }

    // Check if store with same code exists
    const codeExists = await this.unitOfWork.Store.checkExists("code", data.code);
    if (codeExists) {
      throw new CustomError("Store with this code already exists", 400);
    }

    return this.unitOfWork.Store.create(data);
  }

  async getAll(filters: StoreFilterParams): Promise<{ data: StoreDto[]; total: number; page: number; recordPerPage: number }> {
    return this.unitOfWork.Store.getAll(filters);
  }

  async getById(id: number): Promise<StoreDto> {
    return this.unitOfWork.Store.getById(id);
  }

  async update(id: number, data: UpdateStoreModel): Promise<StoreDto> {
    // Check if name is being updated and if it already exists
    if (data.name) {
      const nameExists = await this.unitOfWork.Store.checkExists("name", data.name, id);
      if (nameExists) {
        throw new CustomError("Store with this name already exists", 400);
      }
    }

    // Check if code is being updated and if it already exists
    if (data.code) {
      const codeExists = await this.unitOfWork.Store.checkExists("code", data.code, id);
      if (codeExists) {
        throw new CustomError("Store with this code already exists", 400);
      }
    }

    return this.unitOfWork.Store.update(id, data);
  }

  async delete(id: number): Promise<StoreDto> {
    return this.unitOfWork.Store.delete(id);
  }
}
