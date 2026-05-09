export interface CreateOrderItemModel {
  orderId: number;
  productId: number;
  variantId?: number;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface UpdateOrderItemModel {
  quantity?: number;
  unitPrice?: number;
  totalPrice?: number;
}
