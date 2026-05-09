import prisma from "../config/prisma";
import { CreateOrderDto, OrderDto, UpdateOrderDto } from "../dtos/order.dto";
import { IOrderRepository } from "./interfaces/iorder.repository";

export class OrderRepository implements IOrderRepository {
  async findAll(): Promise<OrderDto[]> {
    return prisma.order.findMany();
  }

  async findByCustomerId(customerId: number): Promise<OrderDto[]> {
    return prisma.order.findMany({ where: { customerId } });
  }

  async findById(id: number): Promise<OrderDto | null> {
    return prisma.order.findUnique({ where: { id } });
  }

  async create(data: CreateOrderDto): Promise<OrderDto> {
    return prisma.order.create({ data });
  }

  async update(id: number, data: UpdateOrderDto): Promise<OrderDto> {
    return prisma.order.update({ where: { id }, data });
  }

  async delete(id: number): Promise<OrderDto> {
    return prisma.order.delete({ where: { id } });
  }
}
