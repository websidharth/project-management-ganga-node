import prisma from "../config/prisma";
import { UpdateUserDto, UserDto } from "../dtos/user.dto";
import { IUserRepository } from "./interfaces/iuser.repository";

export class UserRepository implements IUserRepository {
  async findAll(): Promise<UserDto[]> {
    return prisma.users.findMany();
  }

  async findById(userId: string): Promise<UserDto | null> {
    return prisma.users.findUnique({
      where: { userId, status: true },
    });
  }

  async findByEmail(email: string): Promise<UserDto | null> {
    return prisma.users.findUnique({
      where: {
        email:email,
        status: true,
      },
    });
  }

  async update(userId: string, data: UpdateUserDto): Promise<UserDto> {
    return prisma.users.update({
      where: { userId },
      data,
    });
  }

  async updateStatus(
    userId: string,
    updatedData: UpdateUserDto
  ): Promise<UserDto> {
    return prisma.users.update({
      where: { userId },
      data: { status: false },
    });
  }

  // async delete(userId: string): Promise<UserDto> {
  //   return prisma.users.update({
  //     where: { userId },
  //     data: { status: false },
  //   });
  // }

  async delete(userId: string): Promise<UserDto> {
    return prisma.users.delete({
      where: { userId },
    });
  }
}
