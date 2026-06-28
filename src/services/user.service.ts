import { Role as PrismaRole, users } from "@prisma/client";
import bcrypt from "bcryptjs";
import { inject, injectable } from "inversify";
import { TYPES } from "../config/ioc.types";
import {
  UpdateUserDto,
  UserDto
} from "../dtos/user.dto";
import { Role } from "../enum/user.enum";
import { CreateUserModel } from "../models/user.model";
import type IUnitOfWork from "../repository/interfaces/iunitofwork.repository";
import {
  createUserName,
  generateUserGUID
} from "../utils/authHelpers.service";
import { generateOtp } from "../utils/otp.util";
import type { IDateTimeService } from "./interfaces/idatetime.service";
import type { IUserService } from "./interfaces/Iuser.service";

@injectable()
export class UserService implements IUserService {
  constructor(
    @inject(TYPES.IUnitOfWork) private unitOfWork: IUnitOfWork,
    @inject(TYPES.IDateTimeService)
    private dateTime: IDateTimeService
  ) { }

  async create(data: CreateUserModel, storeCode: string) {
    const hashedPassword = await bcrypt.hash(`${data.password}`, 10);
    const { otp } = generateOtp();

    return this.unitOfWork.transaction(async (transactionClient) => {

      const user = await transactionClient.users.create({
        data: {
          userId: generateUserGUID().toString(),
          name: `${data.firstName} ${data.lastName}`,
          userName: createUserName(`${data.firstName}`, `${data.lastName}`),
          phone: data.phone || null,
          email: data.email,
          password: hashedPassword,
          emailVerificationToken: otp,
          emailVerificationExpires: this.dateTime.now(),
          isActive: false,
          isEmailVerified: false,
          isPhoneVerified: false,
          role: (data.role || Role.USER) as PrismaRole,
          storeCode: storeCode,
        },
      });

      if (user.role === PrismaRole.STAFF) {
        await transactionClient.staff.create({
          data: {
            userId: user.id,
            storeCode: storeCode,
          }
        });
      }

      return this.convertToDto(user);
    });
  }

  async getAll(storeCode?: string, storeId?: number, role?: PrismaRole | string): Promise<UserDto[] | null> {
    const userList = await this.unitOfWork.User.findAll(storeCode, storeId, role);
    if (!userList || userList.length === 0) {
      throw new Error("No user found");
    }
    return userList;
  }

  async getUserById(userId: string): Promise<UserDto | null> {
    const user = await this.unitOfWork.User.findById(userId);
    if (!user) {
      return null;
    }
    return user;
  }

  async getByEmail(email: string): Promise<UserDto | null> {
    const user = await this.unitOfWork.User.findByEmail(email);

    if (!user) {
      return null;
    }
    return user;
  }

  async update(
    userId: string,
    updatedData: UpdateUserDto
  ): Promise<UserDto | null> {
    const user = await this.unitOfWork.User.update(userId, {
      ...updatedData,
    });
    if (!user) {
      return null;
    }
    return user;
  }

  async updateStatus(
    userId: string,
    updatedData: UpdateUserDto
  ): Promise<UserDto | null> {
    const user = await this.unitOfWork.User.updateStatus(userId, {
      ...updatedData,
    });
    if (!user) {
      return null;
    }
    return user;
  }

  async delete(userId: string): Promise<UserDto | null> {
    const user = await this.unitOfWork.User.delete(userId);
    return user;
  }

  async updateRole(userId: string, role: PrismaRole): Promise<UserDto | null> {
    const user = await this.unitOfWork.User.updateRole(userId, role);
    if (!user) {
      return null;
    }
    return user;
  }

  convertToDto(user: users, includePassword: boolean = false, token: boolean = false, refreshToken: boolean = false,): UserDto {
    return {
      id: user.id,
      userId: user.userId,
      name: user.name,
      userName: user.userName,
      email: user.email,
      phone: user.phone,
      password: includePassword ? user.password : '',
      role: user.role,
      isActive: user.isActive,
      isEmailVerified: user.isEmailVerified,
      isPhoneVerified: user.isPhoneVerified,
      loginAttempts: user.loginAttempts,
      lastLoginAt: user.lastLoginAt,
      lastLoginIP: user.lastLoginIP,
      emailVerificationToken: user.emailVerificationToken,
      emailVerificationExpires: user.emailVerificationExpires,
      profileImageUrl: user.profileImageUrl,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      status: user.status,
      token: token ? user.token : null,
      tokenUpdated: user.tokenUpdated,
      refreshToken: token ? user.refreshToken : null,
      storeCode: user.storeCode || null,
      dateOfBirth: user.dateOfBirth || null,
      address: user.address || null,
      city: user.city || null,
      state: user.state || null,
      country: user.country || null,
      pincode: user.pincode || null,
      bio: user.bio || null,
    };
  }
}

export default UserService;
