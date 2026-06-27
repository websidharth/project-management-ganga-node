import { z } from "zod";

// Rule for Signup
export const signupSchema = z.object({
  body: z.object({
    firstName: z.string().min(3, "Name must be at least 3 characters"),
    lastName: z.string().min(3, "Name must be at least 3 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    isRegisterbyShop: z.boolean().optional(),
    phone: z
      .string()
      .min(10, "Phone number must be at least 10 digits")
      .optional(),
  }),
});

// Rule for User Creation by Admin
export const createUserByAdminSchema = z.object({
  body: z.object({
    firstName: z.string().min(3, "Name must be at least 3 characters"),
    lastName: z.string().min(3, "Name must be at least 3 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    isRegisterbyShop: z.boolean().optional(),
    phone: z
      .string()
      .min(10, "Phone number must be at least 10 digits")
      .or(z.literal(""))
      .optional(),
    role: z.enum(["SUPER_ADMIN", "ADMIN", "USER", "STAFF"]).or(z.literal("")).optional(),
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
    isRegisterbyShop: z.boolean().optional(),
  }),
});

// Rule for Role Update
export const updateRoleSchema = z.object({
  body: z.object({
    role: z.enum(["SUPER_ADMIN", "ADMIN", "USER", "STAFF"], {
      error: "Role must be one of: SUPER_ADMIN, ADMIN, USER, STAFF",
    }),
  }),
});

// Rule for Profile Update
export const updateProfileSchema = z.object({
  body: z.object({
    name: z.string().min(3, "Name must be at least 3 characters").optional(),
    phone: z.string().min(10, "Phone number must be at least 10 digits").or(z.literal("")).optional(),
    userName: z.string().optional(),
    profileImageUrl: z.string().url("Invalid URL").or(z.literal("")).optional(),
    dateOfBirth: z.string().or(z.date()).optional(),
    address: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    country: z.string().optional(),
    pincode: z.string().optional(),
    bio: z.string().optional(),
  }),
});
