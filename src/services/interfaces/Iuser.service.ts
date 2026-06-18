import { Role } from "@prisma/client";
import { UpdateUserDto, UserDto } from "../../dtos/user.dto";
import { CreateUserModel } from "../../models/user.model";

export interface IUserService {
  create(data: CreateUserModel, storeCode: string): Promise<UserDto>;
  getAll(): Promise<UserDto[] | null>;
  getUserById(userId: string): Promise<UserDto | null>;
  getByEmail(email: string, includePassword?: boolean): Promise<UserDto | null>;
  update(userId: string, updatedData: UpdateUserDto): Promise<UserDto | null>;
  updateStatus(userId: string, updatedData: UpdateUserDto): Promise<UserDto | null>;
  delete(userId: string): Promise<UserDto | null>;
  updateRole(userId: string, role: Role): Promise<UserDto | null>;
}
