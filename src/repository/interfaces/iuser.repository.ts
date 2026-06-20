import { Role } from "@prisma/client";
import { UpdateUserDto, UserDto } from "../../dtos/user.dto";

export interface IUserRepository {
  findAll(storeCode?: string): Promise<UserDto[]>;
  findById(id: string): Promise<UserDto | null>;
  findByEmail(email: string): Promise<UserDto | null>;
  update(id: string, updatedData: UpdateUserDto): Promise<UserDto>;
  updateStatus(id: string, updatedData: UpdateUserDto): Promise<UserDto>;
  delete(id: string): Promise<UserDto>;
  updateRole(id: string, role: Role): Promise<UserDto>;
}
