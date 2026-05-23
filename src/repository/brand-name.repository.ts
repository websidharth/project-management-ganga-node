import { Prisma, Status } from "@prisma/client";
import prisma from "../config/prisma";
import { BrandNameDto, CreateBrandNameDto } from "../dtos/brand-name.dto";
import { ListResponseDto } from "../dtos/list-response.dto";
import { BrandNameFilterParams } from "../params/brand-name.params";
import { IBrandNameRepository } from "./interfaces/ibrand-name.repository";

type BrandNameWithCategories = Prisma.BrandNameGetPayload<{
    include: { categories: { select: { id: true } } };
}>;

function toDto(b: BrandNameWithCategories): BrandNameDto {
    return {
        id: b.id,
        brandName: b.brandName,
        status: b.status,
        displayOrder: b.displayOrder,
        categoryIds: b.categories.map(c => c.id),
    };
}

export class BrandNameRepository implements IBrandNameRepository {
    async findAll(
        filters?: BrandNameFilterParams,
        page = 1,
        limit = 10,
        sortBy = 'displayOrder',
        sortOrder: 'asc' | 'desc' = 'asc'
    ): Promise<ListResponseDto<BrandNameDto>> {
        const where: Prisma.BrandNameWhereInput = { NOT: { status: Status.Trash } };

        if (filters) {
            page = filters.page ?? page;
            limit = filters.recordPerPage ?? limit;

            if (filters.search) {
                where.OR = [{ brandName: { contains: filters.search, mode: 'insensitive' } }];
            }

            if (filters.categoryIds && filters.categoryIds.length > 0) {
                where.categories = { some: { id: { in: filters.categoryIds } } };
            }

            if (filters.status !== undefined) {
                where.status = filters.status;
            } else {
                where.NOT = { status: Status.Trash };
            }
        }

        const showAll = filters?.showAllRecords === true;
        const skip = showAll ? undefined : (page - 1) * limit;
        const take = showAll ? undefined : limit;

        const include = { categories: { select: { id: true as const } } };

        const [data, total] = await Promise.all([
            prisma.brandName.findMany({
                where,
                include,
                orderBy: { [sortBy]: sortOrder },
                ...(skip !== undefined && { skip }),
                ...(take !== undefined && { take }),
            }),
            prisma.brandName.count({ where }),
        ]);

        return { totalRecord: total, data: data.map(toDto) };
    }

    async findById(id: number): Promise<BrandNameDto | null> {
        const result = await prisma.brandName.findUnique({
            where: { id },
            include: { categories: { select: { id: true } } },
        });
        return result ? toDto(result) : null;
    }

    async create(data: CreateBrandNameDto): Promise<BrandNameDto> {
        const { categoryIds, ...rest } = data;
        const result = await prisma.brandName.create({
            data: {
                ...rest,
                categories: { connect: categoryIds.map(id => ({ id })) },
            },
            include: { categories: { select: { id: true } } },
        });
        return toDto(result);
    }

    async update(id: number, data: CreateBrandNameDto): Promise<BrandNameDto> {
        const { categoryIds, ...rest } = data;
        const result = await prisma.brandName.update({
            where: { id },
            data: {
                ...rest,
                categories: { set: categoryIds.map(id => ({ id })) },
            },
            include: { categories: { select: { id: true } } },
        });
        return toDto(result);
    }

    async delete(id: number): Promise<BrandNameDto> {
        const result = await prisma.brandName.update({
            where: { id },
            data: { status: Status.Trash },
            include: { categories: { select: { id: true } } },
        });
        return toDto(result);
    }
}