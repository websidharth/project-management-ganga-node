import { Request, Response } from "express";
import { container } from "../config/ioc.config";
import { TYPES } from "../config/ioc.types";
import IUnitOfService from "../services/interfaces/iunitof.service";
import CustomResponse from "../dtos/custom-response";
import { CreateOrderItemDto, OrderItemDto, UpdateOrderItemDto } from "../dtos/order-item.dto";
import { ListResponseDto } from "../dtos/list-response.dto";

export class OrderItemController {
  constructor(
    private unitOfService = container.get<IUnitOfService>(TYPES.IUnitOfService)
  ) {}

  getByOrderId = async (req: Request, res: Response): Promise<Response<CustomResponse<ListResponseDto<OrderItemDto>>>> => {
    const orderId = parseInt(req.params["orderId"] as string);
    if (isNaN(orderId)) return res.status(400).json({ success: false, message: "Invalid orderId" });
    const items = await this.unitOfService.OrderItem.getByOrderId(orderId);
    return res.status(200).json({ success: true, message: "Order items fetched successfully", data: { totalRecord: items.length, data: items } });
  };

  getById = async (req: Request, res: Response): Promise<Response<CustomResponse<OrderItemDto>>> => {
    const id = parseInt(req.params["id"] as string);
    if (isNaN(id)) return res.status(400).json({ success: false, message: "Invalid id" });
    const item = await this.unitOfService.OrderItem.getById(id);
    return res.status(200).json({ success: true, message: "Order item fetched successfully", data: item });
  };

  create = async (req: Request, res: Response): Promise<Response<CustomResponse<OrderItemDto>>> => {
    const body = req.body as CreateOrderItemDto;
    const item = await this.unitOfService.OrderItem.create(body);
    return res.status(201).json({ success: true, message: "Order item created successfully", data: item });
  };

  update = async (req: Request, res: Response): Promise<Response<CustomResponse<OrderItemDto>>> => {
    const id = parseInt(req.params["id"] as string);
    if (isNaN(id)) return res.status(400).json({ success: false, message: "Invalid id" });
    const body = req.body as UpdateOrderItemDto;
    const item = await this.unitOfService.OrderItem.update(id, body);
    return res.status(200).json({ success: true, message: "Order item updated successfully", data: item });
  };

  delete = async (req: Request, res: Response): Promise<Response<CustomResponse<OrderItemDto>>> => {
    const id = parseInt(req.params["id"] as string);
    if (isNaN(id)) return res.status(400).json({ success: false, message: "Invalid id" });
    const item = await this.unitOfService.OrderItem.delete(id);
    return res.status(200).json({ success: true, message: "Order item deleted successfully", data: item });
  };
}
