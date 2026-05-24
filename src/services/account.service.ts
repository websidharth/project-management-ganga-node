
import type { users } from "@prisma/client";
import { TYPES } from "../config/ioc.types";
import IUnitOfWork from "../repository/interfaces/iunitofwork.repository";
import { IDateTimeService } from "./interfaces/idatetime.service";
import { IAccountService } from "./interfaces/Iaccount.service";
import { inject, injectable } from "inversify";
import { UserDto } from "../dtos/user.dto";
import { Role } from "../enum/user.enum";
import { CreateUserModel } from "../models/user.model";
import { createUserName, generateUserGUID } from "../utils/authHelpers.service";
import { generateOtp } from "../utils/otp.util";
import { ResetPasswordModel } from "../models/forgot-password.model";
import { LoginModel } from "../models/login.model";

import bcrypt from "bcryptjs";

@injectable()
export class AccountService implements IAccountService {
  constructor(
    @inject(TYPES.IUnitOfWork) private unitOfWork: IUnitOfWork,
    @inject(TYPES.IDateTimeService)
    private dateTime: IDateTimeService
  ) { }


  async login(data: LoginModel, token: string, refreshToken: string): Promise<UserDto | null> {
    const user = await this.unitOfWork.Account.login(data, token, refreshToken);
    if (!user) {
      return null;
    }
    return user;
  }


  async logout(userId: string): Promise<UserDto | null> {
    const user = await this.unitOfWork.Account.logout(userId);
    if (!user) {
      return null;
    }
    return user;
  }

  async updateToken(userId: string, token: string): Promise<UserDto | null> {
    const user = await this.unitOfWork.Account.updateToken(userId, token);
    if (!user) {
      return null;
    }
    return user;
  }


  async create(data: CreateUserModel, role: Role) {
    const hashedPassword = await bcrypt.hash(data.password, 10);

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
        },
      });

      return this.convertToDto(user);
    });
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
    };
  }

  async updateEmailVerification(userId: string) {
    const { otp } = generateOtp(); // 1 minutes expiry

    return this.unitOfWork.transaction(async (transactionClient) => {
      const userss = await transactionClient.users.update({
        where: { userId: userId },
        data: {
          emailVerificationToken: otp,
          emailVerificationExpires: new Date(),
        },
      });

      return this.convertToDto(userss);
    });
  }

  async updateEmailStatus(email: string): Promise<UserDto | null> {
    const user = await this.unitOfWork.Account.updateEmailStatus(email);
    if (!user) {
      return null;
    }
    return user;
  }

  async getUserById(userId: string): Promise<UserDto | null> {
    const user = await this.unitOfWork.User.findById(userId);
    if (!user) {
      return null;
    }
    return user;
  }

  async resetPassword(userId: string, data: ResetPasswordModel): Promise<UserDto | null> {

    if (data.newPassword !== data.confirmPassword) {
      throw new Error("PASSWORD_MISMATCH");
    }

    const user = await this.unitOfWork.User.findById(userId);
    if (!user) throw new Error("USER_NOT_FOUND");

    if (!user.emailVerificationToken || !user.emailVerificationExpires) {
      throw new Error("RESET_NOT_REQUESTED");
    }

    if (Date.now() > user.emailVerificationExpires.getTime()) {
      throw new Error("OTP_EXPIRED");
    }

    // ✅ verify OTP
    if (user.emailVerificationToken !== data.otp) {
      throw new Error("OTP_INVALID");
    }

    const hashedPassword = await bcrypt.hash(data.newPassword, 10);

    const users = await this.unitOfWork.Account.resetPassword(userId, hashedPassword);

    if (!users) {
      return null;
    }
    return users;


  }

  async forgotPassword(userId: string) {
    const { otp } = generateOtp();

    const user = await this.unitOfWork.Account.forgotPassword(userId, otp);
    if (!user) {
      return null;
    }
    return user;
  }
}

export default AccountService;
