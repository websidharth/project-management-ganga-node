import { Request, Response } from "express";
import { container } from "../config/ioc.config";
import { TYPES } from "../config/ioc.types";
import IUnitOfService from "../services/interfaces/iunitof.service";
import CustomResponse from "../dtos/custom-response";
import { AttributeDto, CreateAttributeDto, UpdateAttributeDto } from "../dtos/attribute.dto";
import { ListResponseDto } from "../dtos/list-response.dto";

export class AttributeController {
  constructor(
    private unitOfService = container.get<IUnitOfService>(TYPES.IUnitOfService)
  ) {}

  getAll = async (req: Request, res: Response): Promise<Response<CustomResponse<ListResponseDto<AttributeDto>>>> => {
    const attributes = await this.unitOfService.Attribute.getAll();
    return res.status(200).json({ success: true, message: "Attributes fetched successfully", data: { totalRecord: attributes.length, data: attributes } });
  };

  getById = async (req: Request, res: Response): Promise<Response<CustomResponse<AttributeDto>>> => {
    const id = parseInt(req.params["id"] as string);
    if (isNaN(id)) return res.status(400).json({ success: false, message: "Invalid id" });
    const attribute = await this.unitOfService.Attribute.getById(id);
    return res.status(200).json({ success: true, message: "Attribute fetched successfully", data: attribute });
  };

  create = async (req: Request, res: Response): Promise<Response<CustomResponse<AttributeDto>>> => {
    const body = req.body as CreateAttributeDto;
    const attribute = await this.unitOfService.Attribute.create(body);
    return res.status(201).json({ success: true, message: "Attribute created successfully", data: attribute });
  };

  update = async (req: Request, res: Response): Promise<Response<CustomResponse<AttributeDto>>> => {
    const id = parseInt(req.params["id"] as string);
    if (isNaN(id)) return res.status(400).json({ success: false, message: "Invalid id" });
    const body = req.body as UpdateAttributeDto;
    const attribute = await this.unitOfService.Attribute.update(id, body);
    return res.status(200).json({ success: true, message: "Attribute updated successfully", data: attribute });
  };

  delete = async (req: Request, res: Response): Promise<Response<CustomResponse<AttributeDto>>> => {
    const id = parseInt(req.params["id"] as string);
    if (isNaN(id)) return res.status(400).json({ success: false, message: "Invalid id" });
    const attribute = await this.unitOfService.Attribute.delete(id);
    return res.status(200).json({ success: true, message: "Attribute deleted successfully", data: attribute });
  };
}
