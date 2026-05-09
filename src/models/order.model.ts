export interface CreateOrderModel {
  orderNumber: string;
  customerId: number;
  orderDate?: string;
  totalAmount?: number;
  discount?: number;
  tax?: number;
  shippingCost?: number;
  grandTotal?: number;
  status?: string;
  notes?: string;
}

export interface UpdateOrderModel {
  totalAmount?: number;
  discount?: number;
  tax?: number;
  shippingCost?: number;
  grandTotal?: number;
  status?: string;
  notes?: string;
}
