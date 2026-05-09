
import { UserDto } from "../../dtos/user.dto";
import { Role } from "../../enum/user.enum";
import { ResetPasswordModel } from "../../models/forgot-password.model";
import { LoginModel } from "../../models/login.model";
import { CreateUserModel } from "../../models/user.model";

export interface IAccountService {
  login(data: LoginModel, token: string, refreshToken: string): Promise<UserDto | null>;
  logout(userId: string): Promise<UserDto | null>;
  updateToken(userId: string, token: string): Promise<UserDto | null>;


  create(data: CreateUserModel, role: Role): Promise<UserDto>;
  convertToDto(user: UserDto, includePassword: boolean): UserDto;
  updateEmailVerification(userId: string): Promise<UserDto>;
  updateEmailStatus(email: string): Promise<UserDto | null>;
  resetPassword(userId: string, data: ResetPasswordModel): Promise<UserDto | null>;
  forgotPassword(userId: string): Promise<UserDto | null>;
}
