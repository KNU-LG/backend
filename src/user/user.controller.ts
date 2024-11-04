import {
  BadRequestException,
  Body,
  Controller,
  ForbiddenException,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import {
  ChangePasswordRequest,
  ChangePasswordResponse,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  UpdateUserRequest,
  UpdateUserResponse,
} from './user.dto';
import { User } from '@prisma/client';
import { AuthGuard } from './auth.guard';
import { ApiSecurity } from '@nestjs/swagger';
import { APIResponse } from 'src/type';

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
    @Body() userRequest: RegisterRequest,
  ): Promise<APIResponse<RegisterResponse>> {
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
      data: {
        token: await this.userService.login(user.loginId, userRequest.password),
      },
    };
  }

  @Post('login')
  async login(
    @Body() loginRequest: LoginRequest,
  ): Promise<APIResponse<LoginResponse>> {
    let token: string;
    try {
      token = await this.userService.login(
        loginRequest.loginId,
        loginRequest.password,
      );
    } catch (error) {
      throw new BadRequestException({
        message: '잘못된 비밀번호',
        error: error.toString(),
        statusCode: 400,
        data: null,
      });
    }

    return {
      message: 'success',
      error: '',
      statusCode: 201,
      data: { token: token },
    };
  }

  validateUserId(requestUserId: number, jwtUserId: number) {
    if (requestUserId != jwtUserId) {
      throw new ForbiddenException({
        message: '잘못된 유저 접근',
        error: '',
        statusCode: 403,
        data: null,
      });
    }
    return true;
  }

  @Patch(':userId/password')
  @ApiSecurity('authorization')
  @UseGuards(AuthGuard)
  async changePassword(
    @Body() changePasswordRequest: ChangePasswordRequest,
    @Request() req,
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<APIResponse<ChangePasswordResponse>> {
    this.validateUserId(userId, req.user.id);
    try {
      await this.userService.login(
        req.user.loginId,
        changePasswordRequest.oldPassword,
      );
    } catch (error) {
      throw new BadRequestException({
        message: '잘못된 현재 비밀번호',
        error: error.toString(),
        statusCode: 400,
        data: null,
      });
    }
    await this.userService.changePassword(
      req.user.id,
      changePasswordRequest.newPassword,
    );
    return {
      message: 'success',
      error: '',
      data: null,
      statusCode: 200,
    };
  }

  @Put(':userId')
  @ApiSecurity('authorization')
  @UseGuards(AuthGuard)
  async updateUser(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() updateUserRequest: UpdateUserRequest,
    @Request() req,
  ): Promise<APIResponse<UpdateUserResponse>> {
    this.validateUserId(userId, req.user.id);
    const updatedUser = await this.userService.updateUser(
      userId,
      updateUserRequest,
    );
    return {
      message: 'success',
      error: '',
      data: updatedUser,
      statusCode: 200,
    };
  }
}
