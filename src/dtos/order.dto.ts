import { OrderStatus } from "@prisma/client";

export interface OrderDto {
  id: number;
  orderNumber: string;
  customerId: number;
  storeCode: string
  orderDate: Date;
  totalAmount: number;
  discount: number;
  tax: number;
  shippingCost: number;
  grandTotal: number;
  status: OrderStatus;
  notes?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateOrderDto {
  orderNumber: string;
  customerId: number;
  storeCode: string
  orderDate?: Date;
  totalAmount?: number;
  discount?: number;
  tax?: number;
  shippingCost?: number;
  grandTotal?: number;
  status?: OrderStatus;
  notes?: string | null;
}

export interface UpdateOrderDto {
  totalAmount?: number;
  discount?: number;
  tax?: number;
  shippingCost?: number;
  grandTotal?: number;
  status?: OrderStatus;
  notes?: string | null;
}
