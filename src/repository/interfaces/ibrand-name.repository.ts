import { BrandNameDto, CreateBrandNameDto } from "../../dtos/brand-name.dto";

export interface IBrandNameRepository {
    findAll(): Promise<BrandNameDto[]>;
    findById(id: number): Promise<BrandNameDto | null>;
    create(data: CreateBrandNameDto): Promise<BrandNameDto>;
    update(id: number, data: CreateBrandNameDto): Promise<BrandNameDto>;
    delete(id: number): Promise<BrandNameDto>;
}
