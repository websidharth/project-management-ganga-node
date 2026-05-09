import { CreateOrderDto, OrderDto, UpdateOrderDto } from "../../dtos/order.dto";

export interface IOrderService {
  getAll(): Promise<OrderDto[]>;
  getByCustomerId(customerId: number): Promise<OrderDto[]>;
  getById(id: number): Promise<OrderDto | null>;
  create(data: CreateOrderDto): Promise<OrderDto>;
  update(id: number, data: UpdateOrderDto): Promise<OrderDto>;
  delete(id: number): Promise<OrderDto>;
}
