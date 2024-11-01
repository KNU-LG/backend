import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { APIResponse } from 'src/type';
import { UserRequest } from './user.dto';
import { User } from '@prisma/client';
import { AuthGuard } from './auth.guard';
import { ApiSecurity } from '@nestjs/swagger';

export type UserResponse = string;

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiSecurity('authorization')
  @UseGuards(AuthGuard)
  async getUser(@Request() req) {
    return req.user;
  }

  @Post('register')
  async register(
    @Body() userRequest: UserRequest,
  ): Promise<APIResponse<UserResponse>> {
    let user: User;
    try {
      user = await this.userService.register(userRequest);
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
      data: await this.userService.login(
        user.id,
        user.login_id,
        userRequest.passWord,
      ),
    };
  }
}
