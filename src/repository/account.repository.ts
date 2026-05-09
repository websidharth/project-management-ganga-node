import prisma from "../config/prisma";
import { CreateUserDto, UserDto } from "../dtos/user.dto";
import { IAccountRepository } from "./interfaces/iaccount.repository";

export class AccountRepository implements IAccountRepository {



  async login(data: CreateUserDto, token: string, refreshToken: string): Promise<UserDto | null> {
    return prisma.users.update({
      where: { email: data.email },
      data: {
        token: token,
        refreshToken: refreshToken,
      },
    });
  }

  async logout(userId: string): Promise<UserDto | null> {
    return prisma.users.update({
      where: { userId: userId },
      data: {
        token: null,
        refreshToken: null,
      },
    });
  }


  async updateToken(userId: string, token: string): Promise<UserDto | null> {
    return prisma.users.update({
      where: { userId: userId },
      data: {
        token: token,
        tokenUpdated: true,
      },
    });
  }



  async create(data: CreateUserDto): Promise<UserDto | null> {
    return prisma.users.create({
      data,
    });
  }

  async updateEmailVerification(
    data: any,
    userId: string
  ): Promise<UserDto | null> {
    return prisma.users.update({
      where: { userId: userId },
      data: {
        emailVerificationToken: data.emailVerificationToken ?? null,
        emailVerificationExpires: data.emailVerificationExpires ?? null,
      },
    });
  }

  async updateEmailStatus(email: string): Promise<UserDto | null> {
    return prisma.users.update({
      where: { email },
      data: { isEmailVerified: true },
    });
  }


  async resetPassword(userId: string, hashedPassword: string): Promise<UserDto | null> {
    return await prisma.users.update({
      where: { userId: userId },
      data: { password: hashedPassword },
    });
  }

  async forgotPassword(userId: string, otp: string): Promise<UserDto | null> {
    return await prisma.users.update({
      where: { userId: userId },
      data: {
        emailVerificationToken: otp,
        emailVerificationExpires: new Date()
      },
    });
  }

  async clearPasswordResetToken(email: string): Promise<UserDto | null> {
    return await prisma.users.update({
      where: { email },
      data: {
        emailVerificationToken: null,
        emailVerificationExpires: null,
      },
    });
  }


}
