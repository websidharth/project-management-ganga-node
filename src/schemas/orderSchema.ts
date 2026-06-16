import { z } from "zod";

const OrderStatusEnum = z.enum(["PENDING", "CONFIRMED", "SHIPPED", "DELIVERED", "CANCELLED", "RETURNED"]);

export const createOrderSchema = z.object({
  body: z.object({
    customerId: z.string().uuid("Customer ID is required"),
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
