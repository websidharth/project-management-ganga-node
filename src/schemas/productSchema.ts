import { z } from "zod";
import { Status } from "@prisma/client";

export const createProductSchema = z.object({
  body: z.object({
    name: z.string().min(1, "Name is required"),
    slug: z.string().min(1, "Slug is required"),
    description: z.string().optional(),
    sku: z.string().min(1, "SKU is required"),
    price: z.number().nonnegative("Price must be >= 0"),
    cost: z.number().nonnegative().optional(),
    stock: z.number().int().nonnegative().optional(),
    lowStockThreshold: z.number().int().nonnegative().optional(),
    categoryId: z.number().int().positive("Category is required"),
    images: z.array(z.string()).optional(),
    status: z.nativeEnum(Status).optional(),
  }),
});

export const updateProductSchema = z.object({
  body: z.object({
    name: z.string().min(1).optional(),
    slug: z.string().min(1).optional(),
    description: z.string().optional(),
    sku: z.string().min(1).optional(),
    price: z.number().nonnegative().optional(),
    cost: z.number().nonnegative().optional(),
    stock: z.number().int().nonnegative().optional(),
    lowStockThreshold: z.number().int().nonnegative().optional(),
    categoryId: z.number().int().positive().optional(),
    images: z.array(z.string()).optional(),
    status: z.nativeEnum(Status).optional(),
  }),
});
