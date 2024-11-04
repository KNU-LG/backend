import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class UserRequest {
  @ApiProperty()
  loginId: string;
  @ApiProperty()
  passWord: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  name: string;
}

export class LoginRequest {
  @ApiProperty()
  loginId: string;
  @ApiProperty()
  passWord: string;
}

export type LoginResponse = string;

export class FindPasswordRequest {
  @IsEmail()
  email: string;
}

export class ChangePasswordRequest {
  @ApiProperty()
  newPassword: string;
  @ApiProperty()
  oldPassword: string;
}

export class UpdateUserRequest {
  @ApiProperty()
  newEmail: string;
  @ApiProperty()
  newName: string;
}

export type ChangePasswordResponse = null;
