import { Request, Response } from "express";
import { container } from "../config/ioc.config";
import { TYPES } from "../config/ioc.types";
import IUnitOfService from "../services/interfaces/iunitof.service";
import CustomResponse from "../dtos/custom-response";
import { CreateProductDto, ProductDto, UpdateProductDto } from "../dtos/product.dto";
import { ListResponseDto } from "../dtos/list-response.dto";
import { ProductFilterParams } from "../params/product.params";

export class ProductController {
  constructor(
    private unitOfService = container.get<IUnitOfService>(TYPES.IUnitOfService)
  ) { }

  getAll = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    const filters: ProductFilterParams = Object.fromEntries(
      Object.entries({
        page: req.query['page'] ? parseInt(req.query['page'] as string) : undefined,
        recordPerPage: req.query['recordPerPage'] ? parseInt(req.query['recordPerPage'] as string) : undefined,
        search: req.query['search'] as string | undefined,
        categoryId: req.query['categoryId'] ? parseInt(req.query['categoryId'] as string) : undefined,
        status: req.query['status'] !== undefined ? req.query['status'] === 'true' : undefined,
        showAllRecords: req.query['showAllRecords'] !== undefined ? req.query['showAllRecords'] === 'true' : undefined,
        startDate: req.query['startDate'] ? new Date(req.query['startDate'] as string) : undefined,
        endDate: req.query['endDate'] ? new Date(req.query['endDate'] as string) : undefined,
      }).filter(([, v]) => v !== undefined)
    );
    const result = await this.unitOfService.Product.getAll(filters);
    return res.status(200).json({
      success: true,
      message: "Products fetched successfully",
      data: { totalRecord: result.totalRecord, data: result.data },
    });
  };

  getById = async (
    req: Request,
    res: Response
  ): Promise<Response<CustomResponse<ProductDto>>> => {
    const id = parseInt(req.params["id"] as string);
    if (isNaN(id)) return res.status(400).json({ success: false, message: "Invalid id" });
    const product = await this.unitOfService.Product.getById(id);
    return res.status(200).json({ success: true, message: "Product fetched successfully", data: product });
  };

  getBySlug = async (
    req: Request,
    res: Response
  ): Promise<Response<CustomResponse<ProductDto>>> => {
    const { slug } = req.params;
    if (!slug) return res.status(400).json({ success: false, message: "Slug is required" });
    const product = await this.unitOfService.Product.getBySlug(slug as string);
    return res.status(200).json({ success: true, message: "Product fetched successfully", data: product });
  };

  create = async (
    req: Request,
    res: Response
  ): Promise<Response<CustomResponse<ProductDto>>> => {
    const userId = req.user?.userId as string;
    const body = req.body as CreateProductDto;
    const product = await this.unitOfService.Product.create(body, userId);
    return res.status(201).json({ success: true, message: "Product created successfully", data: product });
  };

  update = async (
    req: Request,
    res: Response
  ): Promise<Response<CustomResponse<ProductDto>>> => {
    const id = parseInt(req.params["id"] as string);
    if (isNaN(id)) return res.status(400).json({ success: false, message: "Invalid id" });
    const userId = req.user?.userId as string;
    const body = req.body as UpdateProductDto;
    const product = await this.unitOfService.Product.update(id, body, userId);
    return res.status(200).json({ success: true, message: "Product updated successfully", data: product });
  };

  delete = async (
    req: Request,
    res: Response
  ): Promise<Response<CustomResponse<ProductDto>>> => {
    const id = parseInt(req.params["id"] as string);
    if (isNaN(id)) return res.status(400).json({ success: false, message: "Invalid id" });
    const product = await this.unitOfService.Product.delete(id);
    return res.status(200).json({ success: true, message: "Product deleted successfully", data: product });
  };
}
