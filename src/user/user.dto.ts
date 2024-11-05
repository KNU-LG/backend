import { ApiProperty } from '@nestjs/swagger';
import { $Enums } from '@prisma/client';

export class RegisterRequest {
  @ApiProperty()
  loginId: string;
  @ApiProperty()
  password: string;
  @ApiProperty()
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
  email: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  theme: $Enums.ColorTheme;
  @ApiProperty()
  mode: $Enums.ScreenMode;
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
  theme: $Enums.ColorTheme;
  @ApiProperty()
  mode: $Enums.ScreenMode;
}

export class UpdateUserResponse extends GetUserResponse {}
