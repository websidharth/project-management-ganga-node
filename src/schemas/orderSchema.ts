import { z } from "zod";

const OrderStatusEnum = z.enum(["PENDING", "CONFIRMED", "SHIPPED", "DELIVERED", "CANCELLED", "RETURNED"]);

export const createOrderSchema = z.object({
  body: z.object({
    orderNumber: z.string().min(1, "Order number is required"),
    customerId: z.number().int().positive("Customer ID is required"),
    orderDate: z.string().optional(),
    totalAmount: z.number().nonnegative().optional(),
    discount: z.number().nonnegative().optional(),
    tax: z.number().nonnegative().optional(),
    shippingCost: z.number().nonnegative().optional(),
    grandTotal: z.number().nonnegative().optional(),
    status: OrderStatusEnum.optional(),
    notes: z.string().optional(),
  }),
});

export const updateOrderSchema = z.object({
  body: z.object({
    totalAmount: z.number().nonnegative().optional(),
    discount: z.number().nonnegative().optional(),
    tax: z.number().nonnegative().optional(),
    shippingCost: z.number().nonnegative().optional(),
    grandTotal: z.number().nonnegative().optional(),
    status: OrderStatusEnum.optional(),
    notes: z.string().optional(),
  }),
});
