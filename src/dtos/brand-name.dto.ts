import { Status } from "@prisma/client";

export interface BrandNameDto {
    id: number;
    brandName: string;
    storeId: number;
    status: Status;
    displayOrder?: number | null;
}

export interface CreateBrandNameDto {
    brandName: string;
    storeId: number;
    status: Status;
    displayOrder?: number | null;
}

