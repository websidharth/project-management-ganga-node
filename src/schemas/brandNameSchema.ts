import { z } from "zod";

export const createBrandNameSchema = z.object({
    body: z.object({
        brandName: z.string().min(1, "Brand name is required"),
        status: z.boolean().optional(),
        displayOrder: z.number().int().optional(),
    }),
});

export const updateBrandNameSchema = z.object({
    body: z.object({
        brandName: z.string().min(1).optional(),
        status: z.boolean().optional(),
        displayOrder: z.number().int().optional(),
    }),
});
