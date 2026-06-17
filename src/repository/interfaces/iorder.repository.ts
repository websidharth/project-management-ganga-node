import { CreateOrderModel } from "../../models/order.model";
import { OrderDto, UpdateOrderDto } from "../../dtos/order.dto";

export interface IOrderRepository {
  findAll(): Promise<OrderDto[]>;
  findByCustomerId(customerId: string): Promise<OrderDto[]>;
  findById(id: number): Promise<OrderDto | null>;
  create(data: CreateOrderModel, storeCode: string): Promise<OrderDto>;
  update(id: number, data: UpdateOrderDto): Promise<OrderDto>;
  delete(id: number): Promise<OrderDto>;
}
