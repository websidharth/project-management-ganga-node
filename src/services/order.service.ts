import { inject, injectable } from "inversify";
import { TYPES } from "../config/ioc.types";
import { CreateOrderDto, OrderDto, UpdateOrderDto } from "../dtos/order.dto";
import { IOrderService } from "./interfaces/Iorder.service";
import type IUnitOfWork from "../repository/interfaces/iunitofwork.repository";
import NotFoundError from "../exceptions/not-found-error";

@injectable()
export class OrderService implements IOrderService {
  constructor(@inject(TYPES.IUnitOfWork) private unitOfWork: IUnitOfWork) {}

  async getAll(): Promise<OrderDto[]> {
    return this.unitOfWork.Order.findAll();
  }

  async getByCustomerId(customerId: number): Promise<OrderDto[]> {
    return this.unitOfWork.Order.findByCustomerId(customerId);
  }

  async getById(id: number): Promise<OrderDto | null> {
    const order = await this.unitOfWork.Order.findById(id);
    if (!order) throw new NotFoundError("Order not found");
    return order;
  }

  async create(data: CreateOrderDto): Promise<OrderDto> {
    return this.unitOfWork.Order.create(data);
  }

  async update(id: number, data: UpdateOrderDto): Promise<OrderDto> {
    const existing = await this.unitOfWork.Order.findById(id);
    if (!existing) throw new NotFoundError("Order not found");
    return this.unitOfWork.Order.update(id, data);
  }

  async delete(id: number): Promise<OrderDto> {
    const existing = await this.unitOfWork.Order.findById(id);
    if (!existing) throw new NotFoundError("Order not found");
    return this.unitOfWork.Order.delete(id);
  }
}
