import { inject, injectable } from "inversify";
import { TYPES } from "../config/ioc.types";
import { CreateOrderItemDto, OrderItemDto, UpdateOrderItemDto } from "../dtos/order-item.dto";
import { IOrderItemService } from "./interfaces/Iorder-item.service";
import type IUnitOfWork from "../repository/interfaces/iunitofwork.repository";
import NotFoundError from "../exceptions/not-found-error";

@injectable()
export class OrderItemService implements IOrderItemService {
  constructor(@inject(TYPES.IUnitOfWork) private unitOfWork: IUnitOfWork) {}

  async getByOrderId(orderId: number): Promise<OrderItemDto[]> {
    return this.unitOfWork.OrderItem.findByOrderId(orderId);
  }

  async getById(id: number): Promise<OrderItemDto | null> {
    const item = await this.unitOfWork.OrderItem.findById(id);
    if (!item) throw new NotFoundError("Order item not found");
    return item;
  }

  async create(data: CreateOrderItemDto): Promise<OrderItemDto> {
    return this.unitOfWork.OrderItem.create(data);
  }

  async update(id: number, data: UpdateOrderItemDto): Promise<OrderItemDto> {
    const existing = await this.unitOfWork.OrderItem.findById(id);
    if (!existing) throw new NotFoundError("Order item not found");
    return this.unitOfWork.OrderItem.update(id, data);
  }

  async delete(id: number): Promise<OrderItemDto> {
    const existing = await this.unitOfWork.OrderItem.findById(id);
    if (!existing) throw new NotFoundError("Order item not found");
    return this.unitOfWork.OrderItem.delete(id);
  }
}
