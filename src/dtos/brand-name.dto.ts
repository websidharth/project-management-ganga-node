import { Status } from "@prisma/client";

export interface BrandNameDto {
    id: number;
    brandName: string;
    storeCode: string
    status: Status;
    displayOrder?: number | null;
}

export interface CreateBrandNameDto {
    brandName: string;
    storeCode: string
    status: Status;
    displayOrder?: number | null;
}

