export interface BrandNameDto {
    id: number;
    brandName?: string | null;
    status: boolean;
    displayOrder?: number | null;
}

export interface CreateBrandNameDto {
    brandName?: string | null;
    status?: boolean;
    displayOrder?: number | null;
}

