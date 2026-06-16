import { OrderDto, UpdateOrderDto } from "../../dtos/order.dto";
import { CreateOrderModel } from "../../models/order.model";

export interface IOrderService {
  getAll(): Promise<OrderDto[]>;
  getByCustomerId(customerId: string): Promise<OrderDto[]>;
  getById(id: number): Promise<OrderDto | null>;
  create(data: CreateOrderModel, storeCode: string): Promise<OrderDto>;
  update(id: number, data: UpdateOrderDto): Promise<OrderDto>;
  delete(id: number): Promise<OrderDto>;
}
