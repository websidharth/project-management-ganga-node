import { Prisma, Status } from "@prisma/client";
import prisma from "../config/prisma";
import { StoreDto, CreateStoreDto, UpdateStoreDto } from "../dtos/store.dto";
import { StoreFilterParams } from "../params/store.params";
import NotFoundError from "../exceptions/not-found-error";

export class StoreRepository {
  async create(data: CreateStoreDto): Promise<StoreDto> {
    const store = await prisma.store.create({
      data: {
        name: data.name,
        code: data.code,
        address: data.address ?? null,
        phone: data.phone ?? null,
        email: data.email ?? null,
        isActive: data.isActive ?? true,
        status: data.status ?? "Published",
      },
    });
    return this.mapToDto(store);
  }

  async getAll(
    filters: StoreFilterParams
  ): Promise<{ data: StoreDto[]; total: number; page: number; recordPerPage: number }> {
    const page = filters.page ?? 1;
    const recordPerPage = filters.recordPerPage ?? 10;
    const skip = (page - 1) * recordPerPage;

    const whereClause: any = {};
    if (filters.search) {
      whereClause.OR = [
        { name: { contains: filters.search, mode: "insensitive" } },
        { code: { contains: filters.search, mode: "insensitive" } },
      ];
    }

    const anyFilters: any = filters;
    if (anyFilters.status) whereClause.status = anyFilters.status;
    if (anyFilters.isActive !== undefined) whereClause.isActive = anyFilters.isActive;

    const findManyArgs: any = {
      where: whereClause,
      skip: filters.showAllRecords ? 0 : skip,
      orderBy: { createdAt: "desc" },
    };
    if (!filters.showAllRecords) {
      findManyArgs.take = recordPerPage;
    }

    const [stores, total] = await Promise.all([
      prisma.store.findMany(findManyArgs),
      prisma.store.count({ where: whereClause }),
    ]);

    return {
      data: stores.map(s => this.mapToDto(s)),
      total,
      page,
      recordPerPage,
    };
  }


  async getById(id: number): Promise<StoreDto> {
    const store = await prisma.store.findUnique({
      where: { id },
    });

    if (!store) {
      throw new NotFoundError(`Store with id ${id} not found`);
    }

    return this.mapToDto(store);
  }

  async update(id: number, data: UpdateStoreDto): Promise<StoreDto> {
    const store = await prisma.store.findUnique({
      where: { id },
    });

    if (!store) {
      throw new NotFoundError(`Store with id ${id} not found`);
    }

    // Build partial update payload (only set fields that were provided)
    const updateData: Prisma.StoreUpdateInput = {
      ...(data.name !== undefined ? { name: data.name } : {}),
      ...(data.code !== undefined ? { code: data.code } : {}),
      ...(data.address !== undefined ? { address: data.address } : {}),
      ...(data.phone !== undefined ? { phone: data.phone } : {}),
      ...(data.email !== undefined ? { email: data.email } : {}),
      ...(data.isActive !== undefined ? { isActive: data.isActive } : {}),
      ...(data.status !== undefined ? { status: data.status as Status } : {}),
      updatedAt: new Date(),
    };

    const updated = await prisma.store.update({
      where: { id },
      data: updateData,
    });

    return this.mapToDto(updated);
  }

 async delete(id: number): Promise<StoreDto> {
  const store = await prisma.store.findUnique({
    where: { id },
  });

  if (!store) {
    throw new NotFoundError(`Store with id ${id} not found`);
  }
 
    return prisma.store.update({ 
      where: { id }, 
      data: { status: Status.Trash } 
    });
 
}

  async checkExists(field: "name" | "code", value: string, excludeId?: number): Promise<boolean> {
    const whereClause: any = { [field]: value };
    if (excludeId) {
      whereClause.id = { not: excludeId };
    }

    const count = await prisma.store.count({
      where: whereClause,
    });

    return count > 0;
  }

  private mapToDto(store: any): StoreDto {
    return {
      id: store.id,
      name: store.name,
      code: store.code,
      address: store.address,
      phone: store.phone,
      email: store.email,
      isActive: store.isActive,
      createdAt: store.createdAt,
      updatedAt: store.updatedAt,
      status: store.status,
    };
  }
}

