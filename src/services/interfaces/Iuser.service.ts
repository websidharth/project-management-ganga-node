import { UpdateUserDto, UserDto } from "../../dtos/user.dto";

export interface IUserService {
  getAll(): Promise<UserDto[] | null>;
  getUserById(userId: string): Promise<UserDto | null>;
  getByEmail(email: string, includePassword?: boolean): Promise<UserDto | null>;
  update(userId: string, updatedData: UpdateUserDto): Promise<UserDto | null>;
  updateStatus(userId: string,updatedData: UpdateUserDto): Promise<UserDto | null>;
  delete(userId: string): Promise<UserDto | null>;
}
