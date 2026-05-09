import { UpdateUserDto, UserDto } from "../../dtos/user.dto";

export interface IUserRepository {
  findAll(): Promise<UserDto[]>;
  findById(id: string): Promise<UserDto | null>;
  findByEmail(email: string): Promise<UserDto | null>;
  update(id: string, updatedData: UpdateUserDto): Promise<UserDto>;
  updateStatus(id: string, updatedData: UpdateUserDto): Promise<UserDto>;
  delete(id: string): Promise<UserDto>;
}
