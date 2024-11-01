import { ApiProperty } from '@nestjs/swagger';

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

export class ChangePasswordRequest {
  @ApiProperty()
  newPassword: string;
  @ApiProperty()
  oldPassword: string;
}

export type ChangePasswordResponse = null;
