import { container } from '../config/ioc.config';
import { TYPES } from '../config/ioc.types';
import IUnitOfService from '../services/interfaces/iunitof.service';
import { Request, Response } from 'express';
import CustomResponse from '../dtos/custom-response';
import { UpdateUserDto, UserDto } from '../dtos/user.dto';
import CustomError from '../exceptions/custom-error'; 
import { ListResponseDto } from '../dtos/list-response.dto';

export class UserController {
  constructor(private unitOfService = container.get<IUnitOfService>(TYPES.IUnitOfService)) {
    this.unitOfService = unitOfService;
  }

  getAllUsers = async (req: Request, res: Response): Promise<Response<CustomResponse<ListResponseDto<UserDto>>>> => {
    let response: CustomResponse<ListResponseDto<UserDto>>;

    const user = await this.unitOfService.User.getAll();
    if (!user) {
      response = { success: false, message: 'User not found' };
      return res.status(404).json(response);
    }
    const totalRecord = user.length;
    response = {
      success: true,
      message: 'User fetched successfully',
      data: { totalRecord, data: user },
    };

    return res.status(200).json(response);
  };

  getUserById = async (req: Request, res: Response): Promise<Response<CustomResponse<UserDto>>> => {
    const { userId } = req.params;
    let response: CustomResponse<UserDto>;

    if (!userId) {
      response = { success: false, message: 'userId is required' };
      return res.status(400).json(response);
    }

    const user = await this.unitOfService.User.getUserById(userId);
    if (!user) {
      response = { success: false, message: 'User not found' };
      return res.status(404).json(response);
    }

    response = {
      success: true,
      message: 'User fetched successfully',
      data: user,
    };

    return res.status(200).json(response);
  };

  getUserByEmail = async (req: Request, res: Response): Promise<Response<CustomResponse<UserDto>>> => {
    const { email } = req.params;

    if (!email) {
      throw new CustomError('Email is required', 400);
    }
    const user = await this.unitOfService.User.getByEmail(email, false);
    if (!user) {
      throw new CustomError('User not found', 404);
    }
    const response: CustomResponse<UserDto> = {
      success: true,
      message: 'User fetched successfully',
      data: user,
    };
    return res.status(200).json(response);
  };

  updateUserById = async (req: Request, res: Response): Promise<Response<CustomResponse<UserDto>>> => {
    const userId = req.params.userId;
    if (!userId) {
      const response: CustomResponse<UserDto> = {
        success: false,
        message: 'userId is required',
      };
      return res.status(400).json(response);
    }
    const updatedData = req.body as UpdateUserDto;
    const user = await this.unitOfService.User.update(userId, updatedData);

    if (!user) {
      throw new CustomError('User not found', 404);
    }

    const response: CustomResponse<UserDto> = {
      success: true,
      data: user,
    };

    return res.status(200).json(response);
  };

  updateStatusById = async (req: Request, res: Response): Promise<Response<CustomResponse<UserDto>>> => {
    const userId = req.params.userId;
    if (!userId) {
      const response: CustomResponse<UserDto> = {
        success: false,
        message: 'userId is required',
      };
      return res.status(400).json(response);
    }
    const updatedData = req.body as UpdateUserDto;
    const user = await this.unitOfService.User.updateStatus(userId, updatedData);

    if (!user) {
      throw new CustomError('User not found', 404);
    }

    const response: CustomResponse<UserDto> = {
      success: true,
      data: user,
    };

    return res.status(200).json(response);
  };

  deleteUserById = async (req: Request, res: Response): Promise<Response<CustomResponse<UserDto>>> => {
    const userId = req.params.userId;
    if (!userId) {
      const response: CustomResponse<UserDto> = {
        success: false,
        message: 'userId is required',
      };
      return res.status(400).json(response);
    }
    const user = await this.unitOfService.User.delete(userId);
    if (!user) {
      throw new CustomError('User not found', 404);
    }

    const response: CustomResponse<UserDto> = {
      success: true,
      message: 'User deleted successfully',
      data: user,
    };

    return res.status(200).json(response);
  };

}
