import { z } from "zod";

// Rule for Signup
export const signupSchema = z.object({
  body: z.object({
    firstName: z.string().min(3, "Name must be at least 3 characters"),
    lastName: z.string().min(3, "Name must be at least 3 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    phone: z
      .string()
      .min(10, "Phone number must be at least 10 digits")
      .optional(),
  }),
});

// Rule for Login
export const loginSchema = z.object({
  body: z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(1, "Password is required"),
  }),
});

// // Rule for Update
export const updateSchema = z.object({
  body: z.object({
    firstName: z.string().min(3, "Name must be at least 3 characters"),
    lastName: z.string().min(3, "Name must be at least 3 characters"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(10).optional(),
  }),
});
