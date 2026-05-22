import { AttributeDto, CreateAttributeDto, UpdateAttributeDto } from "../../dtos/attribute.dto";
import { ListResponseDto } from "../../dtos/list-response.dto";
import { AttributeFilterParams } from "../../params/attribute.params";

export interface IAttributeService {
  getAll(filters?: AttributeFilterParams): Promise<ListResponseDto<AttributeDto>>;
  getById(id: number): Promise<AttributeDto | null>;
  create(data: CreateAttributeDto): Promise<AttributeDto>;
  update(id: number, data: UpdateAttributeDto): Promise<AttributeDto>;
  delete(id: number): Promise<AttributeDto>;
}
