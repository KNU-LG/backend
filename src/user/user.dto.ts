import { ApiProperty } from '@nestjs/swagger';
import { $Enums } from '@prisma/client';
import { IsEmail } from 'class-validator';

export class RegisterRequest {
  @ApiProperty()
  loginId: string;
  @ApiProperty()
  password: string;
  @ApiProperty()
  @IsEmail()
  email: string;
  @ApiProperty()
  name: string;
}

export class RegisterResponse {
  @ApiProperty()
  token: string;
}

export class LoginRequest {
  @ApiProperty()
  loginId: string;
  @ApiProperty()
  password: string;
}

export class LoginResponse {
  @ApiProperty()
  token: string;
}

export class ChangePasswordRequest {
  @ApiProperty()
  newPassword: string;
  @ApiProperty()
  oldPassword: string;
}

export class UpdateUserRequest {
  @ApiProperty()
  @IsEmail()
  email: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  mode: $Enums.ScreenMode;
  @ApiProperty()
  theme: $Enums.ColorTheme;
}

export class ChangePasswordResponse {}

export class GetUserResponse {
  @ApiProperty()
  id: number;
  @ApiProperty()
  loginId: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  mode: $Enums.ScreenMode;
  @ApiProperty()
  theme: $Enums.ColorTheme;
}

export class UpdateUserResponse extends GetUserResponse {}

export class FindPasswordRequest {
  @ApiProperty()
  loginId: string;
  @ApiProperty()
  @IsEmail()
  email: string;
}

export class FindPasswordResponse {}
