import { CreateOrderItemDto, OrderItemDto, UpdateOrderItemDto } from "../../dtos/order-item.dto";

export interface IOrderItemService {
  getByOrderId(orderId: number): Promise<OrderItemDto[]>;
  getById(id: number): Promise<OrderItemDto | null>;
  create(data: CreateOrderItemDto): Promise<OrderItemDto>;
  update(id: number, data: UpdateOrderItemDto): Promise<OrderItemDto>;
  delete(id: number): Promise<OrderItemDto>;
}
