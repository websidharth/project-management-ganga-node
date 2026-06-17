import { Request, Response } from "express";
import { container } from "../config/ioc.config";
import { TYPES } from "../config/ioc.types";
import CustomResponse from "../dtos/custom-response";
import { ListResponseDto } from "../dtos/list-response.dto";
import { OrderDto, UpdateOrderDto } from "../dtos/order.dto";
import { CreateOrderModel } from "../models/order.model";
import IUnitOfService from "../services/interfaces/iunitof.service";

export class OrderController {
  constructor(
    private unitOfService = container.get<IUnitOfService>(TYPES.IUnitOfService)
  ) { }

  getAll = async (req: Request, res: Response): Promise<Response<CustomResponse<ListResponseDto<OrderDto>>>> => {
    const orders = await this.unitOfService.Order.getAll();
    return res.status(200).json({ success: true, message: "Orders fetched successfully", data: { totalRecord: orders.length, data: orders } });
  };

  getByCustomerId = async (req: Request, res: Response): Promise<Response<CustomResponse<ListResponseDto<OrderDto>>>> => {
    const customerId = req.params["customerId"] as string;
    const orders = await this.unitOfService.Order.getByCustomerId(customerId);
    return res.status(200).json({ success: true, message: "Orders fetched successfully", data: { totalRecord: orders.length, data: orders } });
  };

  getById = async (req: Request, res: Response): Promise<Response<CustomResponse<OrderDto>>> => {
    const id = parseInt(req.params["id"] as string);
    if (isNaN(id)) return res.status(400).json({ success: false, message: "Invalid id" });
    const order = await this.unitOfService.Order.getById(id);
    return res.status(200).json({ success: true, message: "Order fetched successfully", data: order });
  };

  create = async (req: Request, res: Response): Promise<Response<CustomResponse<OrderDto>>> => {
    const body = req.body as CreateOrderModel;

    const storeCode = req.user?.storeCode;
    if (!storeCode) {
      return res.status(400).json({
        success: false,
        message: 'Store code not found. User must be associated with a store.'
      });
    }
    const order = await this.unitOfService.Order.create(body, storeCode);
    return res.status(201).json({ success: true, message: "Order created successfully", data: order });
  };

  update = async (req: Request, res: Response): Promise<Response<CustomResponse<OrderDto>>> => {
    const id = parseInt(req.params["id"] as string);
    if (isNaN(id)) return res.status(400).json({ success: false, message: "Invalid id" });
    const body = req.body as UpdateOrderDto;
    const order = await this.unitOfService.Order.update(id, body);
    return res.status(200).json({ success: true, message: "Order updated successfully", data: order });
  };

  delete = async (req: Request, res: Response): Promise<Response<CustomResponse<OrderDto>>> => {
    const id = parseInt(req.params["id"] as string);
    if (isNaN(id)) return res.status(400).json({ success: false, message: "Invalid id" });
    const order = await this.unitOfService.Order.delete(id);
    return res.status(200).json({ success: true, message: "Order deleted successfully", data: order });
  };
}
