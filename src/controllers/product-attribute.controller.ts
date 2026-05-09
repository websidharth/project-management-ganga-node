import { Request, Response } from "express";
import { container } from "../config/ioc.config";
import { TYPES } from "../config/ioc.types";
import IUnitOfService from "../services/interfaces/iunitof.service";
import CustomResponse from "../dtos/custom-response";
import { CreateProductAttributeDto, ProductAttributeDto, UpdateProductAttributeDto } from "../dtos/product-attribute.dto";
import { ListResponseDto } from "../dtos/list-response.dto";

export class ProductAttributeController {
  constructor(
    private unitOfService = container.get<IUnitOfService>(TYPES.IUnitOfService)
  ) {}

  getByProductId = async (req: Request, res: Response): Promise<Response<CustomResponse<ListResponseDto<ProductAttributeDto>>>> => {
    const productId = parseInt(req.params["productId"] as string);
    if (isNaN(productId)) return res.status(400).json({ success: false, message: "Invalid productId" });
    const attrs = await this.unitOfService.ProductAttribute.getByProductId(productId);
    return res.status(200).json({ success: true, message: "Product attributes fetched successfully", data: { totalRecord: attrs.length, data: attrs } });
  };

  getById = async (req: Request, res: Response): Promise<Response<CustomResponse<ProductAttributeDto>>> => {
    const id = parseInt(req.params["id"] as string);
    if (isNaN(id)) return res.status(400).json({ success: false, message: "Invalid id" });
    const attr = await this.unitOfService.ProductAttribute.getById(id);
    return res.status(200).json({ success: true, message: "Product attribute fetched successfully", data: attr });
  };

  create = async (req: Request, res: Response): Promise<Response<CustomResponse<ProductAttributeDto>>> => {
    const body = req.body as CreateProductAttributeDto;
    const attr = await this.unitOfService.ProductAttribute.create(body);
    return res.status(201).json({ success: true, message: "Product attribute created successfully", data: attr });
  };

  update = async (req: Request, res: Response): Promise<Response<CustomResponse<ProductAttributeDto>>> => {
    const id = parseInt(req.params["id"] as string);
    if (isNaN(id)) return res.status(400).json({ success: false, message: "Invalid id" });
    const body = req.body as UpdateProductAttributeDto;
    const attr = await this.unitOfService.ProductAttribute.update(id, body);
    return res.status(200).json({ success: true, message: "Product attribute updated successfully", data: attr });
  };

  delete = async (req: Request, res: Response): Promise<Response<CustomResponse<ProductAttributeDto>>> => {
    const id = parseInt(req.params["id"] as string);
    if (isNaN(id)) return res.status(400).json({ success: false, message: "Invalid id" });
    const attr = await this.unitOfService.ProductAttribute.delete(id);
    return res.status(200).json({ success: true, message: "Product attribute deleted successfully", data: attr });
  };
}
