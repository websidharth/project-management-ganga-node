import { Status } from "@prisma/client";
import prisma from "../config/prisma";
import { UpdateUserDto, UserDto } from "../dtos/user.dto";
import { IUserRepository } from "./interfaces/iuser.repository";

export class UserRepository implements IUserRepository {
  async findAll(): Promise<UserDto[]> {
    return prisma.users.findMany({ where: { NOT: { status: Status.Trash } } });
  }

  async findById(userId: string): Promise<UserDto | null> {
    return prisma.users.findUnique({
      where: { userId, status: Status.Published },
    });
  }

  async findByEmail(email: string): Promise<UserDto | null> {
    return prisma.users.findUnique({
      where: {
        email: email,
        status: Status.Published,
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
      data: { status: Status.Trash },
    });
  }

  async delete(userId: string): Promise<UserDto> {
    return prisma.users.update({
      where: { userId },
      data: { status: Status.Trash },
    });
  }
}
