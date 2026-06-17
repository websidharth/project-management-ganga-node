import prisma from "../config/prisma";
import { OrderDto, UpdateOrderDto } from "../dtos/order.dto";
import { CreateOrderModel } from "../models/order.model";
import { IOrderRepository } from "./interfaces/iorder.repository";

export class OrderRepository implements IOrderRepository {
  async findAll(): Promise<OrderDto[]> {
    return prisma.order.findMany();
  }

  async findByCustomerId(customerId: string): Promise<OrderDto[]> {
    return prisma.order.findMany({ where: { customerId } });
  }

  async findById(id: number): Promise<OrderDto | null> {
    return prisma.order.findUnique({ where: { id } });
  }

  async create(data: CreateOrderModel, storeCode: string): Promise<OrderDto> {
    throw new Error("Order creation with items must be done via UnitOfWork transaction in OrderService");
  }


  async update(id: number, data: UpdateOrderDto): Promise<OrderDto> {
    return prisma.order.update({ where: { id }, data });
  }

  async delete(id: number): Promise<OrderDto> {
    return prisma.order.delete({ where: { id } });
  }
}
