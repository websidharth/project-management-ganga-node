import { Role, Status } from "@prisma/client";

export interface UserDto {
  id: number;
  userId: string;
  name: string;
  userName: string;
  phone?: string | null;
  email: string;
  password?: string | null;
  googleId?: string | null;
  role: Role;
  isActive: boolean;
  isEmailVerified: boolean;
  emailVerificationToken?: string | null;
  emailVerificationExpires?: Date | null;
  isPhoneVerified: boolean;
  profileImageUrl?: string | null;
  loginAttempts: number;
  lastLoginAt?: Date | null;
  lastLoginIP?: string | null;
  createdAt: Date;
  updatedAt?: Date | null;
  status: Status;
  token?: string | null;
  tokenUpdated: boolean;
  refreshToken?: string | null;
}
export interface CreateUserDto {
  userId: string;
  name: string;
  userName: string;
  phone?: string | null;
  email: string;
  password: string;
  role: Role;
  isActive: boolean;
  createdAt: Date;
  googleId?: string | null;
  profileImageUrl?: string | null;
}
export interface UpdateUserDto {
  name: string;
  userName?: string;
  phone?: string | null;
  updatedAt?: Date | null;
  profileImageUrl?: string | null;
  status?: Status;
}

export interface UpdateOtpDto {
  emailVerificationToken?: string | null;
  emailVerificationExpires?: Date | null;
}

// export interface UpdateUserDto extends Partial<CreateUserDto> {}
