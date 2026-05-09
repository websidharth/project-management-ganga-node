import prisma from "../config/prisma";
import { CreateOrderItemDto, OrderItemDto, UpdateOrderItemDto } from "../dtos/order-item.dto";
import { IOrderItemRepository } from "./interfaces/iorder-item.repository";

export class OrderItemRepository implements IOrderItemRepository {
  async findByOrderId(orderId: number): Promise<OrderItemDto[]> {
    return prisma.orderItem.findMany({ where: { orderId } });
  }

  async findById(id: number): Promise<OrderItemDto | null> {
    return prisma.orderItem.findUnique({ where: { id } });
  }

  async create(data: CreateOrderItemDto): Promise<OrderItemDto> {
    return prisma.orderItem.create({ data });
  }

  async update(id: number, data: UpdateOrderItemDto): Promise<OrderItemDto> {
    return prisma.orderItem.update({ where: { id }, data });
  }

  async delete(id: number): Promise<OrderItemDto> {
    return prisma.orderItem.delete({ where: { id } });
  }
}
