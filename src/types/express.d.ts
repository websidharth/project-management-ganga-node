import "express";

declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string;
        email: string;
        name?: string;
        role?: string;
        storeId?: number | null;
      };
    }
  }
}

export { };
