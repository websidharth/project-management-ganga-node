import { AttributeDto, CreateAttributeDto, UpdateAttributeDto } from "../../dtos/attribute.dto";

export interface IAttributeService {
  getAll(): Promise<AttributeDto[]>;
  getById(id: number): Promise<AttributeDto | null>;
  create(data: CreateAttributeDto): Promise<AttributeDto>;
  update(id: number, data: UpdateAttributeDto): Promise<AttributeDto>;
  delete(id: number): Promise<AttributeDto>;
}
