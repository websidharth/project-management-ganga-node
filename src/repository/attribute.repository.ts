import prisma from "../config/prisma";
import { AttributeDto, CreateAttributeDto, UpdateAttributeDto } from "../dtos/attribute.dto";
import { IAttributeRepository } from "./interfaces/iattribute.repository";

export class AttributeRepository implements IAttributeRepository {
  async findAll(): Promise<AttributeDto[]> {
    return prisma.attribute.findMany();
  }

  async findById(id: number): Promise<AttributeDto | null> {
    return prisma.attribute.findUnique({ where: { id } });
  }

  async create(data: CreateAttributeDto): Promise<AttributeDto> {
    return prisma.attribute.create({ data });
  }

  async update(id: number, data: UpdateAttributeDto): Promise<AttributeDto> {
    return prisma.attribute.update({ where: { id }, data });
  }

  async delete(id: number): Promise<AttributeDto> {
    return prisma.attribute.delete({ where: { id } });
  }
}
