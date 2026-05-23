import { Status } from "@prisma/client";

export interface BrandNameDto {
    id: number;
    brandName: string;
    status: Status;
    categoryIds: number[];
    displayOrder?: number | null;
}

export interface CreateBrandNameDto {
    categoryIds: number[];
    brandName: string;
    status: Status;
    displayOrder?: number | null;
}

