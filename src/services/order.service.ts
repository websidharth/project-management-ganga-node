import { OrderStatus } from "@prisma/client";
import { inject, injectable } from "inversify";
import { TYPES } from "../config/ioc.types";
import { OrderDto, UpdateOrderDto } from "../dtos/order.dto";
import NotFoundError from "../exceptions/not-found-error";
import { CreateOrderModel } from "../models/order.model";
import type IUnitOfWork from "../repository/interfaces/iunitofwork.repository";
import { generateOrderNumber } from "../utils/authHelpers.service";
import { IOrderService } from "./interfaces/Iorder.service";

@injectable()
export class OrderService implements IOrderService {
  constructor(@inject(TYPES.IUnitOfWork) private unitOfWork: IUnitOfWork) { }

  async getAll(): Promise<OrderDto[]> {
    return this.unitOfWork.Order.findAll();
  }

  async getByCustomerId(customerId: string): Promise<OrderDto[]> {
    return this.unitOfWork.Order.findByCustomerId(customerId);
  }

  async getById(id: number): Promise<OrderDto | null> {
    const order = await this.unitOfWork.Order.findById(id);
    if (!order) throw new NotFoundError("Order not found");
    return order;
  }


  async create(data: CreateOrderModel, storeCode: string): Promise<OrderDto> {
    return this.unitOfWork.transaction(async (transactionClient) => {
      const category = await transactionClient.order.create({
        data: {
          storeCode: storeCode,
          orderNumber: generateOrderNumber(),
          customerId: data.customerId,
          orderDate: new Date(),
          totalAmount: data.totalAmount || 0,
          discount: data.discount || 0,
          tax: data.tax || 0,
          shippingCost: data.shippingCost || 0,
          grandTotal: data.grandTotal || 0,
          status: data.status || OrderStatus.PENDING,
          notes: data.notes || null,
        },
      });
      return category;
    });
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
