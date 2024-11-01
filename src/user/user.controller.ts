import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { APIResponse } from 'src/type';
import { UserRequest } from './user.dto';

export type UserResponse = string;

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUserAll() {
    return this.userService.getUserAll();
  }

  @Post('register')
  async register(
    @Body() userRequest: UserRequest,
  ): Promise<APIResponse<UserResponse>> {
    try {
      await this.userService.register(userRequest);
    } catch (error) {
      throw new BadRequestException({
        message: '중복 아이디',
        error: error.toString(),
        statusCode: 400,
        data: null,
      });
    }

    return {
      message: 'success',
      error: '',
      statusCode: 201,
      data: await this.userService.login(userRequest.loginId),
    };
  }
}
