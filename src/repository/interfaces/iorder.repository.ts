import { CreateOrderDto, OrderDto, UpdateOrderDto } from "../../dtos/order.dto";

export interface IOrderRepository {
  findAll(): Promise<OrderDto[]>;
  findByCustomerId(customerId: number): Promise<OrderDto[]>;
  findById(id: number): Promise<OrderDto | null>;
  create(data: CreateOrderDto): Promise<OrderDto>;
  update(id: number, data: UpdateOrderDto): Promise<OrderDto>;
  delete(id: number): Promise<OrderDto>;
}
