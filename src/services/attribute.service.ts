import { inject, injectable } from "inversify";
import { TYPES } from "../config/ioc.types";
import { AttributeDto, CreateAttributeDto, UpdateAttributeDto } from "../dtos/attribute.dto";
import { IAttributeService } from "./interfaces/Iattribute.service";
import type IUnitOfWork from "../repository/interfaces/iunitofwork.repository";
import NotFoundError from "../exceptions/not-found-error";

@injectable()
export class AttributeService implements IAttributeService {
  constructor(@inject(TYPES.IUnitOfWork) private unitOfWork: IUnitOfWork) {}

  async getAll(): Promise<AttributeDto[]> {
    return this.unitOfWork.Attribute.findAll();
  }

  async getById(id: number): Promise<AttributeDto | null> {
    const attr = await this.unitOfWork.Attribute.findById(id);
    if (!attr) throw new NotFoundError("Attribute not found");
    return attr;
  }

  async create(data: CreateAttributeDto): Promise<AttributeDto> {
    return this.unitOfWork.Attribute.create(data);
  }

  async update(id: number, data: UpdateAttributeDto): Promise<AttributeDto> {
    const existing = await this.unitOfWork.Attribute.findById(id);
    if (!existing) throw new NotFoundError("Attribute not found");
    return this.unitOfWork.Attribute.update(id, data);
  }

  async delete(id: number): Promise<AttributeDto> {
    const existing = await this.unitOfWork.Attribute.findById(id);
    if (!existing) throw new NotFoundError("Attribute not found");
    return this.unitOfWork.Attribute.delete(id);
  }
}
