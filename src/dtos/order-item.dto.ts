export interface OrderItemDto {
  id: number;
  orderId: number;
  productId: number;
  variantId?: number | null;
  storeCode: string
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  createdAt: Date;
}

export interface CreateOrderItemDto {
  orderId: number;
  productId: number;
  variantId?: number | null;
  storeCode: string
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface UpdateOrderItemDto {
  quantity?: number;
  unitPrice?: number;
  totalPrice?: number;
}
