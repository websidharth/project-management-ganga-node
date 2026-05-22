import prisma from "../config/prisma";
import { BrandNameDto, CreateBrandNameDto } from "../dtos/brand-name.dto";
import { IBrandNameRepository } from "./interfaces/ibrand-name.repository";

export class BrandNameRepository implements IBrandNameRepository {
    async findAll(): Promise<BrandNameDto[]> {
        return prisma.brandName.findMany();
    }

    async findById(id: number): Promise<BrandNameDto | null> {
        return prisma.brandName.findUnique({ where: { id } });
    }

    async create(data: CreateBrandNameDto): Promise<BrandNameDto> {
        return prisma.brandName.create({ data });
    }

    async update(id: number, data: CreateBrandNameDto): Promise<BrandNameDto> {
        return prisma.brandName.update({ where: { id }, data });
    }

    async delete(id: number): Promise<BrandNameDto> {
        return prisma.brandName.update({ where: { id }, data: { status: false } });
    }
}
