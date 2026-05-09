import "express";

declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string;
        email: string;
        name?: string;
        role?: string;
        schoolId?: number;
        classId?: number;
        sectionId?: number;
      };
    }
  }
}

export { };
