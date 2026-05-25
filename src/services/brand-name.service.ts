import { inject, injectable } from "inversify";
import { TYPES } from "../config/ioc.types";
import { BrandNameDto, CreateBrandNameDto } from "../dtos/brand-name.dto";
import { ListResponseDto } from "../dtos/list-response.dto";
import { BrandNameFilterParams } from "../params/brand-name.params";
import { IBrandNameService } from "./interfaces/Ibrand-name.service";
import type IUnitOfWork from "../repository/interfaces/iunitofwork.repository";
import NotFoundError from "../exceptions/not-found-error";

@injectable()
export class BrandNameService implements IBrandNameService {
    constructor(
        @inject(TYPES.IUnitOfWork) private unitOfWork: IUnitOfWork
    ) { }

    async getAll(filters?: BrandNameFilterParams): Promise<ListResponseDto<BrandNameDto>> {
        return this.unitOfWork.BrandName.findAll(filters);
    }

    async getById(id: number): Promise<BrandNameDto | null> {
        const brandName = await this.unitOfWork.BrandName.findById(id);
        if (!brandName) throw new NotFoundError("BrandName not found");
        return brandName;
    }


    async create(data: CreateBrandNameDto): Promise<BrandNameDto> {
        return this.unitOfWork.transaction(async (transactionClient) => {
            const storeData = await transactionClient.brandName.create({
                data: {
                    brandName: data.brandName,
                    storeId: data.storeId,
                    status: data.status,
                    displayOrder: data.displayOrder || null,
                },
            });
            return storeData;
        });
    }



    async update(id: number, data: CreateBrandNameDto): Promise<BrandNameDto> {
        const existing = await this.unitOfWork.BrandName.findById(id);
        if (!existing) throw new NotFoundError("BrandName not found");


        return this.unitOfWork.transaction(async (transactionClient) => {

            const storeData = await transactionClient.brandName.update({
                where: { id },
                data: {
                    brandName: data.brandName,
                    storeId: data.storeId,
                    status: data.status,
                    displayOrder: data.displayOrder || null,
                },
            });
            return storeData;
        });
    }


    async delete(id: number): Promise<BrandNameDto> {
        const existing = await this.unitOfWork.BrandName.findById(id);
        if (!existing) throw new NotFoundError("BrandName not found");
        return this.unitOfWork.BrandName.delete(id);
    }
}
